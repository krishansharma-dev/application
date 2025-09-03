import React, { useState, useEffect } from 'react';
import { X, Send, BookTemplate as Template } from 'lucide-react';
import { EmailTemplate, Application } from '@/types/application';

interface BulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApplications: Application[];
  emailTemplates: EmailTemplate[];
  onSendEmails: (templateId: string, customSubject?: string, customBody?: string) => Promise<void>;
}

export default function BulkEmailModal({ 
  isOpen, 
  onClose, 
  selectedApplications, 
  emailTemplates,
  onSendEmails 
}: BulkEmailModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedTemplate('');
      setCustomSubject('');
      setCustomBody('');
      setUseCustom(false);
    }
  }, [isOpen]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setCustomSubject(template.subject);
      setCustomBody(template.body);
    }
  };

  const handleSend = async () => {
    if (!selectedTemplate && (!customSubject || !customBody)) return;
    
    setIsLoading(true);
    try {
      await onSendEmails(selectedTemplate, customSubject, customBody);
      onClose();
    } catch (error) {
      console.error('Error sending emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const replacePlaceholders = (text: string, application: Application) => {
    return text
      .replace(/{{company_name}}/g, application.company_name)
      .replace(/{{job_title}}/g, application.job_title)
      .replace(/{{recruiter_name}}/g, application.contact_email?.split('@')[0] || 'Hiring Manager');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Send Bulk Follow-up Emails</h2>
            <p className="text-sm text-gray-500 mt-1">
              Sending to {selectedApplications.length} application{selectedApplications.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Template
              </label>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a template</option>
                  {emailTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setUseCustom(!useCustom)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    useCustom 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Template className="w-4 h-4 inline mr-1" />
                  Custom
                </button>
              </div>
            </div>

            {(selectedTemplate || useCustom) && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Follow-up on {{job_title}} application"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Body
                  </label>
                  <textarea
                    rows={8}
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Hi {{recruiter_name}},&#10;&#10;I hope this email finds you well. I wanted to follow up on my application for the {{job_title}} position at {{company_name}}..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Available Variables:</h4>
                  <div className="text-xs text-blue-700 space-x-4">
                  
                  </div>
                </div>
              </div>
            )}

            {selectedApplications.length > 0 && customBody && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview (First Application):</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="text-sm">
                    <div className="font-medium mb-1">
                      Subject: {replacePlaceholders(customSubject, selectedApplications[0])}
                    </div>
                    <div className="text-gray-600 whitespace-pre-line">
                      {replacePlaceholders(customBody, selectedApplications[0])}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading || (!selectedTemplate && (!customSubject || !customBody))}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isLoading ? 'Sending...' : `Send to ${selectedApplications.length} contact${selectedApplications.length !== 1 ? 's' : ''}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}