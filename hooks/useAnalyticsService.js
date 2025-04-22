import { useState, useCallback } from 'react';
import { analyticsService } from '../services/index';

/**
 * Hook for managing analytics data and operations
 */
export const useAnalyticsService = () => {
  const [analytics, setAnalytics] = useState({
    messageStats: { total: 0, userMessages: 0, aiMessages: 0 },
    topSources: [],
    dailyActivity: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches analytics data for a specific time range
   * @param {string} timeRange - The time range for analytics (day, week, month, year)
   */
  const fetchAnalytics = useCallback(async (timeRange = 'week') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyticsService.getAnalytics(timeRange);
      setAnalytics(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      setError(err.message || 'אירעה שגיאה בטעינת נתוני האנליזה');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Exports analytics data in a specified format
   * @param {string} format - The export format (csv, pdf, excel)
   */
  const exportAnalytics = useCallback(async (format = 'csv') => {
    setLoading(true);
    setError(null);
    
    try {
      // Normally this would call an API endpoint to generate and download the export
      // For now, we'll just simulate a delay and return a success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, this would trigger a file download
      const result = {
        success: true,
        message: `נתוני האנליזה יוצאו בהצלחה בפורמט ${format.toUpperCase()}`,
        format
      };
      
      return result;
    } catch (err) {
      console.error('Failed to export analytics:', err);
      setError(err.message || 'אירעה שגיאה בייצוא נתוני האנליזה');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
    exportAnalytics
  };
};