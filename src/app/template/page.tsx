'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, FileText } from 'lucide-react';
import { useApplications } from '@/hooks/useApplications';
import { EmailTemplate } from '@/types/application';

export default function TemplatesPage() {
  const { emailTemplates, loading } = useApplications();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);

  if (loading) {
    return (
 <div className="flex items-center justify-center h-64"> null </div>
    );
  }

  return (
 <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-600 mt-1">Manage your follow-up email templates</p>
          </div>

          <button
            onClick={() => {
              setEditingTemplate(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emailTemplates.map((template: EmailTemplate) => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setEditingTemplate(template);
                      setIsModalOpen(true);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Subject:</div>
                  <div className="text-sm text-gray-600">{template.subject}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700">Preview:</div>
                  <div className="text-sm text-gray-600 line-clamp-3">
                    {template.body.substring(0, 150)}...
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {emailTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No templates yet</h3>
            <p className="text-gray-500 mt-1">Create your first email template for follow-ups.</p>
          </div>
        )}
      </div>
    </>
  );
}