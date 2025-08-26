'use client';

import { UserConnection } from './connections';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { logger } from './logger';

export class TokenRefreshService {
  
  async refreshAccessToken(connection: UserConnection): Promise<UserConnection> {
    try {
      logger.info('🔄 Refreshing access token', {
        connectionId: connection.id,
        expiresAt: new Date(connection.expiresAt).toISOString(),
        timeUntilExpiry: connection.expiresAt - Date.now(),
        hasRefreshToken: !!connection.refreshToken
      });

      // Check if we have a proper refresh token
      if (!connection.refreshToken || connection.refreshToken === connection.accessToken) {
        logger.warn('⚠️ No proper refresh token available, user needs to reconnect', {
          connectionId: connection.id
        });
        throw new Error('RECONNECT_REQUIRED: No refresh token available. Please reconnect your Gmail account.');
      }

      // Use Google's token refresh endpoint
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_FIREBASE_WEB_CLIENT_ID || '781087431577-e2599e6b193f888739d108.apps.googleusercontent.com',
          refresh_token: connection.refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Token refresh failed', { 
          status: response.status, 
          error,
          connectionId: connection.id 
        });
        throw new Error(`Token refresh failed: ${error}`);
      }

      const tokens = await response.json();
      logger.debug('New tokens received', {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in
      });

      // Update connection with new tokens
      const updatedConnection: UserConnection = {
        ...connection,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || connection.refreshToken, // Keep old refresh token if new one not provided
        expiresAt: Date.now() + ((tokens.expires_in || 3600) * 1000),
        updatedAt: Date.now()
      };

      // Save updated connection to Firestore
      await updateDoc(doc(db, 'connections', connection.id), {
        accessToken: updatedConnection.accessToken,
        refreshToken: updatedConnection.refreshToken,
        expiresAt: updatedConnection.expiresAt,
        updatedAt: updatedConnection.updatedAt
      });

      logger.info('✅ Access token refreshed successfully', {
        connectionId: connection.id,
        newExpiresAt: new Date(updatedConnection.expiresAt).toISOString()
      });

      return updatedConnection;

    } catch (error) {
      logger.error('❌ Failed to refresh access token', {
        error,
        connectionId: connection.id
      });
      throw error;
    }
  }

  async ensureValidToken(connection: UserConnection): Promise<UserConnection> {
    // Check if token expires in the next 5 minutes (300 seconds buffer)
    const expiryBuffer = 5 * 60 * 1000; // 5 minutes in milliseconds
    const isExpiringSoon = (connection.expiresAt - Date.now()) < expiryBuffer;

    if (isExpiringSoon) {
      logger.info('🔄 Token expiring soon, refreshing proactively', {
        connectionId: connection.id,
        timeUntilExpiry: connection.expiresAt - Date.now(),
        expiresAt: new Date(connection.expiresAt).toISOString()
      });

      return await this.refreshAccessToken(connection);
    }

    return connection;
  }

  isTokenExpired(connection: UserConnection): boolean {
    return Date.now() > connection.expiresAt;
  }
}

export const tokenRefreshService = new TokenRefreshService();
