import apiClient from './api';

const attendanceService = {
  // Get attendance records with filters
  getAttendance: async (filters = {}) => {
    const response = await apiClient.get('/attendance', { params: filters });
    return response.data;
  },

  // Punch In
  punchIn: async (data) => {
    const response = await apiClient.post('/attendance/punch-in', data);
    return response.data;
  },

  // Punch Out
  punchOut: async (data) => {
    const response = await apiClient.post('/attendance/punch-out', data);
    return response.data;
  },

  // Get Attendance Stats (Daily, Monthly, Target)
  getStats: async () => {
    const response = await apiClient.get('/attendance/stats');
    return response.data;
  },

  // Update a specific attendance record (Admin)
  updateAttendance: async (id, data) => {
    const response = await apiClient.put(`/attendance/${id}`, data);
    return response.data;
  }
};

export default attendanceService;