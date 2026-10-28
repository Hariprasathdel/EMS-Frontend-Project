import apiClient from './api';

const settingsService = {
  // General Settings
  getGeneralSettings: async () => {
    const response = await apiClient.get('/settings/general');
    return response.data;
  },

  updateGeneralSettings: async (settingsData) => {
    const response = await apiClient.put('/settings/general', settingsData);
    return response.data;
  },

  // User Roles & Permissions
  getUserRoles: async () => {
    const response = await apiClient.get('/settings/roles');
    return response.data;
  },

  createUserRole: async (roleData) => {
    const response = await apiClient.post('/settings/roles', roleData);
    return response.data;
  },

  updateUserRole: async (id, roleData) => {
    const response = await apiClient.put(`/settings/roles/${id}`, roleData);
    return response.data;
  },

  deleteUserRole: async (id) => {
    const response = await apiClient.delete(`/settings/roles/${id}`);
    return response.data;
  }
};

export default settingsService;