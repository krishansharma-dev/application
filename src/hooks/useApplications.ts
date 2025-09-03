import { useState, useEffect } from 'react';

import { Application, EmailTemplate, DashboardStats } from '@/types/application';
import { supabase } from '@/lib/supabase';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        await Promise.all([
          fetchApplications(),
          fetchEmailTemplates(),
        ]);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
    } else {
      setApplications(data || []);
    }
  };

  const fetchEmailTemplates = async () => {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching templates:', error);
    } else {
      setEmailTemplates(data || []);
    }
  };

  const createApplication = async (applicationData: Partial<Application>) => {
    const { data, error } = await supabase
      .from('applications')
      .insert([{ ...applicationData, user_id: user?.id }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    await logActivity('Created application', data.id);
    await fetchApplications();
    return data;
  };

  const updateApplication = async (id: string, updates: Partial<Application>) => {
    const { error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id);

    if (error) {
      throw error;
    }

    await logActivity('Updated application', id);
    await fetchApplications();
  };

  const deleteApplication = async (id: string) => {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    await logActivity('Deleted application', id);
    await fetchApplications();
  };

  const logActivity = async (action: string, applicationId?: string) => {
    await supabase
      .from('activity_logs')
      .insert([{
        user_id: user?.id,
        application_id: applicationId,
        action,
      }]);
  };

  const getDashboardStats = (): DashboardStats => {
    const totalApplications = applications.length;
    const responseCount = applications.filter(app => 
      app.status === 'Interview Scheduled' || app.status === 'Offer'
    ).length;
    const responseRate = totalApplications > 0 ? (responseCount / totalApplications) * 100 : 0;
    const interviewsScheduled = applications.filter(app => app.status === 'Interview Scheduled').length;
    const pendingFollowUps = applications.filter(app => 
      app.follow_up_date && new Date(app.follow_up_date) <= new Date()
    ).length;

    const applicationsByStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const applicationsByMonth = applications.reduce((acc, app) => {
      const month = new Date(app.application_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ month, count: 1 });
      }
      return acc;
    }, [] as { month: string; count: number }[]);

    return {
      totalApplications,
      responseRate,
      interviewsScheduled,
      pendingFollowUps,
      applicationsByStatus: applicationsByStatus as any,
      applicationsByMonth: applicationsByMonth.sort((a, b) => 
        new Date(a.month).getTime() - new Date(b.month).getTime()
      ),
    };
  };

  return {
    applications,
    emailTemplates,
    loading,
    user,
    fetchApplications,
    fetchEmailTemplates,
    createApplication,
    updateApplication,
    deleteApplication,
    getDashboardStats,
  };
}