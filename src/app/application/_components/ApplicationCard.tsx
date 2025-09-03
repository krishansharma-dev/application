import React from 'react';
import { Calendar, Building, Mail, ExternalLink, Edit3 } from 'lucide-react';
import { Application } from '@/types/application';
import { format } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onSelect: (id: string, selected: boolean) => void;
  isSelected: boolean;
}

export default function ApplicationCard({ 
  application, 
  onEdit, 
  onSelect, 
  isSelected 
}: ApplicationCardProps) {
  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interview Scheduled': 'bg-purple-100 text-purple-800',
    'Offer': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Follow-Up Due': 'bg-orange-100 text-orange-800',
  };

  const priorityColors = {
    'High': 'border-l-red-500',
    'Medium': 'border-l-yellow-500',
    'Low': 'border-l-green-500',
  };

  return (
    <div className={`
      bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow
      ${isSelected ? 'ring-2 ring-blue-500 border-blue-300' : ''}
      border-l-4 ${priorityColors[application.priority]}
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(application.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{application.job_title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{application.company_name}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
            {application.status}
          </span>
          <button
            onClick={() => onEdit(application)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Applied: {format(new Date(application.application_date), 'MMM dd, yyyy')}</span>
        </div>
        
        {application.contact_email && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{application.contact_email}</span>
          </div>
        )}
        
        {application.portal_link && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ExternalLink className="w-4 h-4" />
            <a 
              href={application.portal_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              View Job Posting
            </a>
          </div>
        )}
        
        {application.follow_up_date && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Follow-up: {format(new Date(application.follow_up_date), 'MMM dd, yyyy')}</span>
          </div>
        )}
      </div>

      {application.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{application.notes}</p>
        </div>
      )}
    </div>
  );
}