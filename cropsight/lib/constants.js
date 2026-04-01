// App-wide constants
export const APP_NAME = 'CROPSIGHT';
export const APP_TAGLINE = 'Snap. Diagnose. Protect.';
export const APP_DESCRIPTION = 'AI-powered crop disease detection for modern agriculture.';

// API endpoints (for future backend integration)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY_OTP: '/auth/verify-otp',
    SEND_OTP: '/auth/send-otp',
  },
  SCAN: {
    UPLOAD: '/scan/upload',
    HISTORY: '/scan/history',
    DETAIL: '/scan/:id',
  },
  MSP: {
    LIST: '/msp/list',
    SEARCH: '/msp/search',
  },
  CROP: {
    MANAGEMENT: '/crop/management',
    WEATHER: '/crop/weather',
  },
};

// UI Constants
export const COLORS = {
  PRIMARY: '#2e7d32',
  PRIMARY_DARK: '#1b5e20',
  PRIMARY_LIGHT: '#4caf50',
};

export const STATS = {
  ACTIVE_FARMERS: '10K+',
  SCANS_COMPLETED: '50K+',
  ACCURACY_RATE: '95%',
  SUPPORT: '24/7',
};
