"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/client';
import { useRouter } from 'next/navigation';

interface Application {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  contact_email: string | null;
  portal_link: string | null;
  job_description: string;
  notes: string;
  application_date: string;
  status: 'Applied' | 'Interview Scheduled' | 'Offer' | 'Rejected' | 'Follow-Up Due';
  follow_up_date: string | null;
  priority: 'High' | 'Medium' | 'Low';
  created_at: string;
  updated_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    sortBy: 'application_date',
    sortOrder: 'desc',
  });
  const [newApplication, setNewApplication] = useState({
    company_name: '',
    job_title: '',
    contact_email: '',
    portal_link: '',
    job_description: '',
    notes: '',
    application_date: new Date().toISOString().split('T')[0],
    status: 'Applied' as Application['status'],
    follow_up_date: '',
    priority: 'Medium' as Application['priority'],
  });
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        ...filters,
        status: filters.status !== 'all' ? filters.status : '',
        priority: filters.priority !== 'all' ? filters.priority : '',
      }).toString();
      
      const response = await fetch(`/api/application?${query}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch applications');
      }
      
      setApplications(data.applications || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newApplication,
          contact_email: newApplication.contact_email || null,
          portal_link: newApplication.portal_link || null,
          follow_up_date: newApplication.follow_up_date || null,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add application');
      }

      setApplications([...applications, data.application]);
      setNewApplication({
        company_name: '',
        job_title: '',
        contact_email: '',
        portal_link: '',
        job_description: '',
        notes: '',
        application_date: new Date().toISOString().split('T')[0],
        status: 'Applied',
        follow_up_date: '',
        priority: 'Medium',
      });
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Follow-Up Due">Follow-Up Due</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by company or job title"
          className="p-2 border rounded"
        />

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="application_date">Application Date</option>
          <option value="company_name">Company Name</option>
          <option value="job_title">Job Title</option>
        </select>

        <select
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'Add Application'}
        </button>
      </div>

      {/* Add Application Form */}
      {showForm && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Add New Application</h2>
          <form onSubmit={handleAddApplication} className="grid gap-4">
            <input
              type="text"
              value={newApplication.company_name}
              onChange={(e) =>
                setNewApplication({ ...newApplication, company_name: e.target.value })
              }
              placeholder="Company Name"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newApplication.job_title}
              onChange={(e) =>
                setNewApplication({ ...newApplication, job_title: e.target.value })
              }
              placeholder="Job Title"
              required
              className="p-2 border rounded"
            />
            <input
              type="email"
              value={newApplication.contact_email}
              onChange={(e) =>
                setNewApplication({ ...newApplication, contact_email: e.target.value })
              }
              placeholder="Contact Email (optional)"
              className="p-2 border rounded"
            />
            <input
              type="url"
              value={newApplication.portal_link}
              onChange={(e) =>
                setNewApplication({ ...newApplication, portal_link: e.target.value })
              }
              placeholder="Portal Link (optional)"
              className="p-2 border rounded"
            />
            <textarea
              value={newApplication.job_description}
              onChange={(e) =>
                setNewApplication({ ...newApplication, job_description: e.target.value })
              }
              placeholder="Job Description (optional)"
              className="p-2 border rounded"
            />
            <textarea
              value={newApplication.notes}
              onChange={(e) =>
                setNewApplication({ ...newApplication, notes: e.target.value })
              }
              placeholder="Notes (optional)"
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={newApplication.application_date}
              onChange={(e) =>
                setNewApplication({ ...newApplication, application_date: e.target.value })
              }
              required
              className="p-2 border rounded"
            />
            <select
              value={newApplication.status}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  status: e.target.value as Application['status'],
                })
              }
              className="p-2 border rounded"
            >
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Follow-Up Due">Follow-Up Due</option>
            </select>
            <input
              type="date"
              value={newApplication.follow_up_date}
              onChange={(e) =>
                setNewApplication({ ...newApplication, follow_up_date: e.target.value })
              }
              placeholder="Follow-up Date (optional)"
              className="p-2 border rounded"
            />
            <select
              value={newApplication.priority}
              onChange={(e) =>
                setNewApplication({
                  ...newApplication,
                  priority: e.target.value as Application['priority'],
                })
              }
              className="p-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Applications List */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && applications.length === 0 && (
        <p>No applications found.</p>
      )}
      {!loading && !error && applications.length > 0 && (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app.id} className="p-4 border rounded">
              <h3 className="text-lg font-semibold">{app.company_name}</h3>
              <p>Job Title: {app.job_title}</p>
              <p>Status: {app.status}</p>
              <p>Priority: {app.priority}</p>
              <p>Application Date: {new Date(app.application_date).toLocaleDateString()}</p>
              {app.follow_up_date && (
                <p>
                  Follow-up Date: {new Date(app.follow_up_date).toLocaleDateString()}
                </p>
              )}
              {app.contact_email && <p>Contact Email: {app.contact_email}</p>}
              {app.portal_link && (
                <p>
                  Portal:{' '}
                  <a
                    href={app.portal_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Link
                  </a>
                </p>
              )}
              {app.job_description && (
                <p>
                  Description:{' '}
                  {app.job_description.length > 100
                    ? app.job_description.slice(0, 100) + '...'
                    : app.job_description}
                </p>
              )}
              {app.notes && (
                <p>
                  Notes:{' '}
                  {app.notes.length > 100 ? app.notes.slice(0, 100) + '...' : app.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}