import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, ExternalLink, Mail, Building2 } from "lucide-react"

interface Application {
  id: string
  user_id: string
  company_name: string
  job_title: string
  contact_email: string | null
  portal_link: string | null
  job_description: string
  notes: string
  application_date: string
  status: "Applied" | "Interview Scheduled" | "Offer" | "Rejected" | "Follow-Up Due"
  follow_up_date: string | null
  priority: "High" | "Medium" | "Low"
  created_at: string
  updated_at: string
}

interface ApplicationCardProps {
  application: Application
}

const getStatusColor = (status: Application["status"]) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Interview Scheduled":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Offer":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "Follow-Up Due":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: Application["priority"]) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              {application.company_name}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">{application.job_title}</p>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(application.priority)}>{application.priority}</Badge>
            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            Applied: {new Date(application.application_date).toLocaleDateString()}
          </div>
          {application.follow_up_date && (
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              Follow-up: {new Date(application.follow_up_date).toLocaleDateString()}
            </div>
          )}
        </div>

        {application.job_description && (
          <div>
            <p className="text-sm text-muted-foreground">
              {application.job_description.length > 150
                ? `${application.job_description.slice(0, 150)}...`
                : application.job_description}
            </p>
          </div>
        )}

        {application.notes && (
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Notes: </span>
              {application.notes.length > 100 ? `${application.notes.slice(0, 100)}...` : application.notes}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {application.contact_email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${application.contact_email}`}>
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </a>
            </Button>
          )}
          {application.portal_link && (
            <Button variant="outline" size="sm" asChild>
              <a href={application.portal_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Portal
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
