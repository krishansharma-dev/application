'use client';

import { useApplications } from '@/hooks/useApplications';
import DashboardStats from './_components/DashboardStats';
import ApplicationChart from './_components/ApplicationChart';
import { Application } from '@/types/application';


export default function DashboardPage() {
  const { applications, loading, getDashboardStats } = useApplications();

  if (loading) {
    return (
    <div className="flex items-center justify-center h-64"> null </div>
    );
  }

  const stats = getDashboardStats();

  return (
  <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your job search progress</p>
        </div>

        <DashboardStats stats={stats} />
        <ApplicationChart stats={stats} />

        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {applications.slice(0, 5).map((app: Application) => (
              <div key={app.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  Applied to <span className="font-medium">{app.job_title}</span> at{' '}
                  <span className="font-medium">{app.company_name}</span>
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {new Date(app.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  );
}