'use client';

import { useState, useMemo } from 'react';
import { Plus, Grid, List, Mail, Briefcase } from 'lucide-react';
import { Application, ApplicationStatus, Priority } from '@/types/application';
import ApplicationCard from './_components/ApplicationCard';
import ApplicationTable from './_components/ApplicationTable';
import ApplicationModal from './_components/ApplicationModal';
import ApplicationFilters from './_components/ApplicationFilters';
import BulkEmailModal from './_components/BulkEmailModal';
import { useApplications } from '@/hooks/useApplications';


interface FilterState {
  search: string;
  status: ApplicationStatus | 'All';
  priority: Priority | 'All';
  followUpDue: boolean;
}

export default function ApplicationsPage() {
  const { 
    applications, 
    emailTemplates,
    loading, 
    createApplication, 
    updateApplication, 
    deleteApplication 
  } = useApplications();

  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkEmailOpen, setIsBulkEmailOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'All',
    priority: 'All',
    followUpDue: false,
  });

  const filteredApplications = useMemo(() => {
    return applications.filter((app: Application) => {
      const matchesSearch = 
        app.company_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.job_title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (app.contact_email && app.contact_email.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesStatus = filters.status === 'All' || app.status === filters.status;
      const matchesPriority = filters.priority === 'All' || app.priority === filters.priority;
      
      const matchesFollowUp = !filters.followUpDue || 
        (app.follow_up_date && new Date(app.follow_up_date) <= new Date());

      return matchesSearch && matchesStatus && matchesPriority && matchesFollowUp;
    });
  }, [applications, filters]);

  const handleSaveApplication = async (applicationData: Partial<Application>) => {
    if (editingApplication) {
      await updateApplication(editingApplication.id, applicationData);
    } else {
      await createApplication(applicationData);
    }
    setEditingApplication(null);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleSelectApplication = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedApplications);
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedApplications(newSelected);
  };

  const handleBulkEmail = async (templateId: string, customSubject?: string, customBody?: string) => {
    const selectedApps = applications.filter((app: Application) => selectedApplications.has(app.id));
    
    console.log('Sending bulk emails to:', selectedApps.length, 'applications');
    console.log('Template ID:', templateId);
    console.log('Custom subject:', customSubject);
    console.log('Custom body:', customBody);
    
    setSelectedApplications(new Set());
  };

  if (loading) {
    return (
    
   <div className="flex items-center justify-center h-screen">nulll</div>
 ) }

  return (
   <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
            <p className="text-gray-600 mt-1">
              {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedApplications.size > 0 && (
              <button
                onClick={() => setIsBulkEmailOpen(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Emails ({selectedApplications.size})
              </button>
            )}
            
            <div className="flex items-center bg-white border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 ${viewMode === 'card' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => {
                setEditingApplication(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </button>
          </div>
        </div>

        <div className="mb-6">
          <ApplicationFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((application: Application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onEdit={handleEditApplication}
                onSelect={handleSelectApplication}
                isSelected={selectedApplications.has(application.id)}
              />
            ))}
          </div>
        ) : (
          <ApplicationTable
            applications={filteredApplications}
            onEdit={handleEditApplication}
            onSelect={handleSelectApplication}
            selectedApplications={selectedApplications}
          />
        )}

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No applications found</h3>
            <p className="text-gray-500 mt-1">
              {filters.search || filters.status !== 'All' || filters.priority !== 'All' || filters.followUpDue
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by adding your first job application.'
              }
            </p>
          </div>
        )}
      </div>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        onSave={handleSaveApplication}
        application={editingApplication}
      />

      <BulkEmailModal
        isOpen={isBulkEmailOpen}
        onClose={() => setIsBulkEmailOpen(false)}
        selectedApplications={applications.filter((app: Application) => selectedApplications.has(app.id))}
        emailTemplates={emailTemplates}
        onSendEmails={handleBulkEmail}
      />
 </>
  );
}