'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const applicationStats = [
  { label: 'Applied', count: 24, color: 'bg-blue-500' },
  { label: 'Interviewing', count: 8, color: 'bg-yellow-500' },
  { label: 'Offers', count: 3, color: 'bg-green-500' },
];

const recentApplications = [
  {
    id: 1,
    company: 'TechFlow Inc.',
    position: 'Senior Frontend Developer',
    status: 'Interview Scheduled',
    statusType: 'interviewing',
    appliedDate: 'Feb 15, 2025',
    nextStep: 'Technical Interview - Feb 20'
  },
  {
    id: 2,
    company: 'StartupXyz',
    position: 'Product Manager',
    status: 'Application Sent',
    statusType: 'applied',
    appliedDate: 'Feb 12, 2025',
    nextStep: 'Follow up in 3 days'
  },
  {
    id: 3,
    company: 'Design Studio',
    position: 'UX Designer',
    status: 'Offer Received',
    statusType: 'offer',
    appliedDate: 'Feb 8, 2025',
    nextStep: 'Respond by Feb 22'
  }
];

export function ApplicationTracker() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Never Lose Track of Your Applications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your job search with our intelligent application tracker and automated follow-up reminders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Application Overview
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {applicationStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${stat.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg`}>
                      {stat.count}
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Application Success Rate</span>
                  <span className="font-medium">12.5%</span>
                </div>
                <Progress value={12.5} className="h-2" />
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Recent Applications
              </h3>
              
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{app.position}</p>
                      <p className="text-sm text-gray-600">{app.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{app.nextStep}</p>
                    </div>
                    <Badge 
                      variant={app.statusType === 'offer' ? 'default' : 'secondary'}
                      className={
                        app.statusType === 'offer' 
                          ? 'bg-green-100 text-green-800' 
                          : app.statusType === 'interviewing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Features */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Status Tracking
                </h3>
                <p className="text-gray-600">
                  Automatically categorize and track your applications through every stage of the hiring process.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Follow-up Reminders
                </h3>
                <p className="text-gray-600">
                  Get intelligent reminders for when to follow up on applications and interviews.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interview Scheduling
                </h3>
                <p className="text-gray-600">
                  Seamlessly manage interview schedules and preparation notes in one place.
                </p>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
            >
              Track My Applications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}