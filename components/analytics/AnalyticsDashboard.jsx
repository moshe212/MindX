import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = ({ data, timeRange }) => {
  const { messageStats, topSources, dailyActivity } = data;
  
  // Colors for charts
  const COLORS = ['#00C4FF', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Data for message stats pie chart
  const messageData = [
    { name: 'הודעות משתמש', value: messageStats.userMessages },
    { name: 'הודעות AI', value: messageStats.aiMessages },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Summary Cards */}
      <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="text-gray-400 text-sm mb-1">סה"כ הודעות</h3>
          <p className="text-3xl font-bold text-cyan-400">{messageStats.total}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="text-gray-400 text-sm mb-1">הודעות משתמש</h3>
          <p className="text-3xl font-bold text-cyan-400">{messageStats.userMessages}</p>
          <p className="text-xs text-gray-400">
            {Math.round((messageStats.userMessages / messageStats.total) * 100)}% מסך ההודעות
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="text-gray-400 text-sm mb-1">הודעות AI</h3>
          <p className="text-3xl font-bold text-cyan-400">{messageStats.aiMessages}</p>
          <p className="text-xs text-gray-400">
            {Math.round((messageStats.aiMessages / messageStats.total) * 100)}% מסך ההודעות
          </p>
        </div>
      </div>
      
      {/* Message Type Distribution */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-medium text-gray-200 mb-4">התפלגות סוגי הודעות</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={messageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {messageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Sources */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-medium text-gray-200 mb-4">מקורות מידע נפוצים</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topSources}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="count" fill="#00C4FF" name="מספר שימושים" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Daily Activity - Spans full width */}
      <div className="col-span-full bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
        <h3 className="text-lg font-medium text-gray-200 mb-4">פעילות לאורך זמן</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyActivity}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#00C4FF" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="messages"
                stroke="#00C4FF"
                name="הודעות"
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversations"
                stroke="#82ca9d"
                name="שיחות"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Export Options */}
      <div className="col-span-full flex justify-end mt-4">
        <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded mr-2 hover:bg-gray-600">
          ייצוא לאקסל
        </button>
        <button className="bg-gray-700 text-gray-200 px-4 py-2 rounded mr-2 hover:bg-gray-600">
          ייצוא ל-PDF
        </button>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">
          הדפסה
        </button>
      </div>
    </div>
  );
};

export default React.memo(AnalyticsDashboard);