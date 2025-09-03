'use client';

import { ApplicationStatus } from '@/types/application';
import { BarChart3, TrendingUp, Calendar, Clock } from 'lucide-react';


export interface DashboardStats {
    totalApplications: number;
    responseRate: number;
    interviewsScheduled: number;
    pendingFollowUps: number;
    applicationsByStatus: Record<ApplicationStatus, number>;
    applicationsByMonth: { month: string; count: number }[];
  }  
interface DashboardStatsProps {
  stats: DashboardStats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications.toString(),
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Response Rate',
      value: `${stats.responseRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      bgColor: 'bg-green-500',
    },
    {
      title: 'Interviews',
      value: stats.interviewsScheduled.toString(),
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600',
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Follow-ups Due',
      value: stats.pendingFollowUps.toString(),
      icon: Clock,
      color: 'bg-orange-50 text-orange-600',
      bgColor: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}