import { useState, useEffect, useCallback } from 'react';
import attendanceService from '../services/attendanceService';

/**
 * Custom hook for Attendance Module.
 * Handles fetching data, stats, and punch in/out actions.
 */
const useAttendance = (initialFilters = {}) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Fetch Attendance Table Data
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAttendance(filters);
      setAttendanceData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch Summary Stats (The 3 big cards & summary row)
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await attendanceService.getStats();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch attendance stats', err);
    }
  }, []);

  // Action: Punch In
  const punchIn = async () => {
    setLoading(true);
    try {
      await attendanceService.punchIn({ timestamp: new Date().toISOString() });
      // Refresh data after successful action
      await fetchAttendance();
      await fetchStats();
    } catch (err) {
      setError(err.message || 'Punch In failed');
    } finally {
      setLoading(false);
    }
  };

  // Action: Punch Out
  const punchOut = async () => {
    setLoading(true);
    try {
      await attendanceService.punchOut({ timestamp: new Date().toISOString() });
      await fetchAttendance();
      await fetchStats();
    } catch (err) {
      setError(err.message || 'Punch Out failed');
    } finally {
      setLoading(false);
    }
  };

  // Initial Data Load
  useEffect(() => {
    fetchAttendance();
    fetchStats();
  }, [fetchAttendance, fetchStats]);

  return {
    attendanceData,
    stats,
    loading,
    error,
    filters,
    setFilters,
    punchIn,
    punchOut
  };
};

export default useAttendance;