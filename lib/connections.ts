'use client';

import { doc, setDoc, getDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithPopup, User } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { db, auth } from './firebase';
import { logger } from './logger';

export interface UserConnection {
  id: string;
  userId: string;
  service: 'gmail' | 'sheets' | 'calendar';
  displayName: string;
  email: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  createdAt: number;
  updatedAt: number;
}

// Connect Gmail account
export async function connectGmail(user: User): Promise<UserConnection> {
  try {
    logger.info('Starting Gmail OAuth connection', { userId: user.uid });
    
    // Create Gmail-specific provider with required scopes
    const gmailProvider = new GoogleAuthProvider();
    gmailProvider.addScope('https://www.googleapis.com/auth/gmail.readonly');
    gmailProvider.addScope('https://www.googleapis.com/auth/gmail.send');
    gmailProvider.addScope('https://www.googleapis.com/auth/gmail.compose');
    gmailProvider.addScope('https://www.googleapis.com/auth/gmail.modify');
    
    // Configure for offline access to get refresh token
    gmailProvider.setCustomParameters({
      prompt: 'consent', // Force consent screen to ensure refresh token
      access_type: 'offline', // Critical for refresh token
      include_granted_scopes: 'true'
    });

    logger.debug('Initiating Gmail OAuth popup', { 
      scopes: ['gmail.readonly', 'gmail.send', 'gmail.compose', 'gmail.modify'] 
    });

    // Trigger OAuth popup for Gmail-specific permissions
    const result = await signInWithPopup(auth, gmailProvider);
    
    logger.debug('OAuth popup completed', { 
      email: result.user.email,
      hasUser: !!result.user
    });

    // Extract OAuth credential with access token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential || !credential.accessToken) {
      logger.error('No OAuth credential or access token received', { 
        hasCredential: !!credential,
        credentialKeys: credential ? Object.keys(credential) : []
      });
      throw new Error('Failed to obtain Gmail access token from OAuth');
    }

    const accessToken = credential.accessToken;
    
    logger.info('Gmail OAuth tokens obtained successfully', {
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken.length,
      tokenPrefix: accessToken.substring(0, 10) + '...'
    });

    // Create connection record
    const connection: UserConnection = {
      id: `gmail_${user.uid}`,
      userId: user.uid,
      service: 'gmail',
      displayName: result.user.displayName || 'Gmail Account',
      email: result.user.email || '',
      accessToken: accessToken,
      refreshToken: credential.idToken || accessToken, // Use access token as fallback for now
      expiresAt: Date.now() + (3600 * 1000), // 1 hour default
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    logger.debug('Storing Gmail connection in Firestore', { 
      connectionId: connection.id, 
      email: connection.email,
      hasAccessToken: !!connection.accessToken
    });

    // Store connection in Firestore
    await setDoc(doc(db, 'connections', connection.id), connection);
    
    logger.info('Gmail connected successfully with real OAuth tokens', { 
      connectionId: connection.id,
      email: connection.email 
    });
    
    return connection;
  } catch (error) {
    logger.error('Failed to connect Gmail via OAuth', error);
    throw error;
  }
}



// Get user connections
export async function getUserConnections(userId: string): Promise<UserConnection[]> {
  try {
    const q = query(collection(db, 'connections'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as UserConnection));
  } catch (error) {
    console.error('Error getting user connections:', error);
    return [];
  }
}

// Get specific connection
export async function getConnection(connectionId: string): Promise<UserConnection | null> {
  try {
    const docRef = doc(db, 'connections', connectionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as UserConnection;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting connection:', error);
    return null;
  }
}

// Disconnect service
export async function disconnectService(connectionId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'connections', connectionId));
  } catch (error) {
    console.error('Error disconnecting service:', error);
    throw error;
  }
}

// Check if user has Gmail connected
export async function hasGmailConnected(userId: string): Promise<boolean> {
  try {
    const connections = await getUserConnections(userId);
    return connections.some(conn => conn.service === 'gmail');
  } catch (error) {
    console.error('Error checking Gmail connection:', error);
    return false;
  }
}

// Get Gmail connection for user
export async function getGmailConnection(userId: string): Promise<UserConnection | null> {
  try {
    const connections = await getUserConnections(userId);
    return connections.find(conn => conn.service === 'gmail') || null;
  } catch (error) {
    console.error('Error getting Gmail connection:', error);
    return null;
  }
}
