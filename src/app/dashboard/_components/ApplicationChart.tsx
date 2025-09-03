'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DashboardStats } from '@/types/application';

interface ApplicationChartProps {
  stats: DashboardStats;
}

export default function ApplicationChart({ stats }: ApplicationChartProps) {
  const statusData = Object.entries(stats.applicationsByStatus).map(([status, count]) => ({
    status,
    count,
  }));

  const COLORS = {
    Applied: '#3B82F6',
    'Interview Scheduled': '#8B5CF6',
    Offer: '#10B981',
    Rejected: '#EF4444',
    'Follow-Up Due': '#F59E0B',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ status, count }) => `${status}: ${count}`}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status as keyof typeof COLORS] || '#000000'}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.applicationsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}