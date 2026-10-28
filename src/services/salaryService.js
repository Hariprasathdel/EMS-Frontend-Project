import apiClient from './api';

const salaryService = {
  // Get salary slips (can filter by month/year/employee)
  getSalarySlips: async (filters = {}) => {
    const response = await apiClient.get('/salary-slips', { params: filters });
    return response.data;
  },

  // Generate a new salary slip
  generateSalarySlip: async (slipData) => {
    const response = await apiClient.post('/salary-slips/generate', slipData);
    return response.data;
  },

  // Update salary slip details
  updateSalarySlip: async (id, slipData) => {
    const response = await apiClient.put(`/salary-slips/${id}`, slipData);
    return response.data;
  },

  // Download/Export salary slip as PDF (Returns Blob)
  downloadSalarySlip: async (id) => {
    const response = await apiClient.get(`/salary-slips/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }
};

export default salaryService;