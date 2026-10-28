import apiClient from './api';

const departmentService = {
  getAllDepartments: async () => {
    const response = await apiClient.get('/departments');
    return response.data;
  },

  getDepartmentById: async (id) => {
    const response = await apiClient.get(`/departments/${id}`);
    return response.data;
  },

  createDepartment: async (deptData) => {
    const response = await apiClient.post('/departments', deptData);
    return response.data;
  },

  updateDepartment: async (id, deptData) => {
    const response = await apiClient.put(`/departments/${id}`, deptData);
    return response.data;
  },

  deleteDepartment: async (id) => {
    const response = await apiClient.delete(`/departments/${id}`);
    return response.data;
  }
};

export default departmentService;