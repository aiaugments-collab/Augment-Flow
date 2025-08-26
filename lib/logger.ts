const timestamp = () => new Date().toISOString().split('T')[1].split('.')[0];

export const logger = {
  debug: (message: string, data?: any) => {
    console.log(`🔍 [${timestamp()}] ${message}`, data || '');
  },

  info: (message: string, data?: any) => {
    console.log(`ℹ️ [${timestamp()}] ${message}`, data || '');
  },

  warn: (message: string, data?: any) => {
    console.warn(`⚠️ [${timestamp()}] ${message}`, data || '');
  },

  error: (message: string, error?: any, data?: any) => {
    console.error(`❌ [${timestamp()}] ${message}`, error || '', data || '');
  }
};
