import React, { useState, useEffect } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import { useAnalyticsService } from '../../hooks/useAnalyticsService';

const AnalyticsTab = () => {
  const [timeRange, setTimeRange] = useState('week');
  const { analytics, loading, error, fetchAnalytics } = useAnalyticsService();

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [fetchAnalytics, timeRange]);

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-900 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">אנליזות</h2>
        
        <div className="flex rounded-md overflow-hidden">
          <button 
            className={`px-4 py-2 ${timeRange === 'day' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setTimeRange('day')}
          >
            יום
          </button>
          <button 
            className={`px-4 py-2 ${timeRange === 'week' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setTimeRange('week')}
          >
            שבוע
          </button>
          <button 
            className={`px-4 py-2 ${timeRange === 'month' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setTimeRange('month')}
          >
            חודש
          </button>
          <button 
            className={`px-4 py-2 ${timeRange === 'year' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setTimeRange('year')}
          >
            שנה
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnalyticsDashboard data={analytics} timeRange={timeRange} />
      )}
    </div>
  );
};

export default AnalyticsTab;