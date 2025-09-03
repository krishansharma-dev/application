export type Priority = 'High' | 'Medium' | 'Low';

export type ApplicationStatus = 
  | 'Applied' 
  | 'Interview Scheduled' 
  | 'Offer' 
  | 'Rejected' 
  | 'Follow-Up Due';

export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  contact_email?: string | null;
  portal_link?: string | null;
  job_description: string;
  notes: string;
  application_date: string;
  status: ApplicationStatus;
  follow_up_date?: string | null;
  priority: Priority;
  created_at: string;
  updated_at: string;
}

export interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  application_id?: string | null;
  action: string;
  timestamp: string;
}

export interface DashboardStats {
  totalApplications: number;
  responseRate: number;
  interviewsScheduled: number;
  pendingFollowUps: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsByMonth: { month: string; count: number }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'follow-up' | 'interview' | 'deadline';
  application?: Application;
}

export interface BulkEmailRequest {
  applicationIds: string[];
  templateId: string;
  customSubject?: string;
  customBody?: string;
}