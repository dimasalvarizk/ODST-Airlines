import axios from 'axios';

// Base API URL configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : '');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT Token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('odst_admin_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        typeof window !== 'undefined' &&
        (window.location.pathname.startsWith('/internal-odst-gate') ||
          window.location.pathname.startsWith('/admin'))
      ) {
        localStorage.removeItem('odst_admin_token');
        localStorage.removeItem('odst_admin_user');
        // Do not auto-redirect if already on login
        if (
          window.location.pathname !== '/internal-odst-gate' &&
          window.location.pathname !== '/internal-odst-gate/'
        ) {
          window.location.href = '/internal-odst-gate';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Types
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface CountdownData {
  id: number;
  target_date: string;
  is_active: boolean;
  label_id: string;
  label_en: string;
  label_ar: string;
  title_id: string;
  title_en: string;
  title_ar: string;
  description_id: string;
  description_en: string;
  description_ar: string;
  updated_by?: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'replied' | 'resolved' | 'archived';
  admin_notes?: string;
  ip_address?: string;
  created_at: string;
  updated_at?: string;
}

export interface ContactInfoData {
  id: number;
  company_name: string;
  division: string;
  phone: string;
  phone_tel: string;
  email: string;
  address: string;
  map_embed_url: string;
  map_direct_url: string;
}

export interface AuditLogItem {
  id: number;
  admin_id?: number;
  admin_email?: string;
  action: string;
  module: 'auth' | 'countdown' | 'contact' | 'contact_info' | 'system';
  record_id?: string;
  details?: any;
  ip_address?: string;
  created_at: string;
}

export interface DashboardStats {
  inquiries: {
    total: number;
    new: number;
    inProgress: number;
    replied: number;
    resolved: number;
    archived: number;
    today: number;
  };
  countdown: {
    isActive: boolean;
    targetDate: string | null;
    isExpired: boolean;
    daysLeft: number;
    hoursLeft: number;
    title_id?: string;
    updated_at?: string;
    updated_by?: string;
  };
  audits: {
    total: number;
  };
  recentInquiries: ContactInquiry[];
  recentAudits: AuditLogItem[];
}

// ==========================================
// AUTH SERVICES
// ==========================================
export const authService = {
  async login(emailOrUsername: string, password: string) {
    const res = await apiClient.post('/api/auth/login', { emailOrUsername, password });
    if (res.data.success && res.data.data.token) {
      localStorage.setItem('odst_admin_token', res.data.data.token);
      localStorage.setItem('odst_admin_user', JSON.stringify(res.data.data.admin));
    }
    return res.data;
  },

  async getMe() {
    const res = await apiClient.get('/api/auth/me');
    return res.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await apiClient.post('/api/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return res.data;
  },

  logout() {
    localStorage.removeItem('odst_admin_token');
    localStorage.removeItem('odst_admin_user');
  },

  getCurrentUser(): AdminUser | null {
    try {
      const user = localStorage.getItem('odst_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('odst_admin_token'));
  },
};

// ==========================================
// COUNTDOWN SERVICES (Audit & Configuration)
// ==========================================
export const countdownService = {
  async getPublic() {
    const res = await apiClient.get('/api/countdown');
    return res.data;
  },

  async getAdmin() {
    const res = await apiClient.get('/api/countdown/admin');
    return res.data;
  },

  async update(data: Partial<CountdownData>) {
    const res = await apiClient.put('/api/countdown/admin', data);
    return res.data;
  },
};

// ==========================================
// CONTACT & INQUIRIES SERVICES (Audit & Management)
// ==========================================
export const contactService = {
  async submitPublic(data: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }) {
    const res = await apiClient.post('/api/contact', data);
    return res.data;
  },

  async getPublicInfo() {
    const res = await apiClient.get('/api/contact/info');
    return res.data;
  },

  async getAdminInquiries(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const res = await apiClient.get('/api/contact/admin', { params });
    return res.data;
  },

  async getAdminInquiryById(id: number) {
    const res = await apiClient.get(`/api/contact/admin/${id}`);
    return res.data;
  },

  async updateStatus(id: number, data: { status?: string; admin_notes?: string }) {
    const res = await apiClient.patch(`/api/contact/admin/${id}`, data);
    return res.data;
  },

  async deleteInquiry(id: number) {
    const res = await apiClient.delete(`/api/contact/admin/${id}`);
    return res.data;
  },

  async getAdminContactInfo() {
    const res = await apiClient.get('/api/contact/admin/info');
    return res.data;
  },

  async updateContactInfo(data: Partial<ContactInfoData>) {
    const res = await apiClient.put('/api/contact/admin/info', data);
    return res.data;
  },
};

// ==========================================
// AUDIT LOGS SERVICES
// ==========================================
export const auditService = {
  async getLogs(params?: { page?: number; limit?: number; module?: string; search?: string }) {
    const res = await apiClient.get('/api/admin/audit', { params });
    return res.data;
  },
};

// ==========================================
// DASHBOARD SERVICES
// ==========================================
export const dashboardService = {
  async getStats() {
    const res = await apiClient.get('/api/admin/dashboard/stats');
    return res.data;
  },
};
