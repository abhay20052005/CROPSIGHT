// API utility functions for backend integration
import { API_BASE_URL } from './constants';

class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new APIClient();

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  signup: (userData) => apiClient.post('/auth/signup', userData),
  sendOTP: (phone) => apiClient.post('/auth/send-otp', { phone }),
  verifyOTP: (phone, otp) => apiClient.post('/auth/verify-otp', { phone, otp }),
};

// Scan API
export const scanAPI = {
  upload: (formData) => apiClient.post('/scan/upload', formData),
  getHistory: () => apiClient.get('/scan/history'),
  getDetail: (id) => apiClient.get(`/scan/${id}`),
};

// MSP API
export const mspAPI = {
  getList: () => apiClient.get('/msp/list'),
  search: (query) => apiClient.get(`/msp/search?q=${query}`),
};

// Crop API
export const cropAPI = {
  getManagement: () => apiClient.get('/crop/management'),
  getWeather: () => apiClient.get('/crop/weather'),
};
