import React from 'react';
import { Edit3, ExternalLink } from 'lucide-react';
import { Application } from '@/types/application';
import { format } from 'date-fns';

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onSelect: (id: string, selected: boolean) => void;
  selectedApplications: Set<string>;
}

export default function ApplicationTable({ 
  applications, 
  onEdit, 
  onSelect, 
  selectedApplications 
}: ApplicationTableProps) {
  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interview Scheduled': 'bg-purple-100 text-purple-800',
    'Offer': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Follow-Up Due': 'bg-orange-100 text-orange-800',
  };

  const priorityDots = {
    'High': 'bg-red-500',
    'Medium': 'bg-yellow-500',
    'Low': 'bg-green-500',
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={(e) => {
                  applications.forEach(app => 
                    onSelect(app.id, e.target.checked)
                  );
                }}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company & Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Follow-up
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedApplications.has(application.id)}
                  onChange={(e) => onSelect(application.id, e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">{application.job_title}</div>
                  <div className="text-sm text-gray-500">{application.company_name}</div>
                  {application.contact_email && (
                    <div className="text-xs text-gray-400">{application.contact_email}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                  {application.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {format(new Date(application.application_date), 'MMM dd')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {application.follow_up_date 
                  ? format(new Date(application.follow_up_date), 'MMM dd')
                  : '-'
                }
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${priorityDots[application.priority]}`} />
                  <span className="text-sm text-gray-700">{application.priority}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(application)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {application.portal_link && (
                    <a
                      href={application.portal_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}