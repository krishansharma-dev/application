"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { use } from "react" // Import React.use

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Building2, CalendarDays, Mail, ExternalLink, Edit, Trash2, AlertCircle } from "lucide-react"
import { ApplicationForm } from "../_components/ApplicationForm"

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

export default function ApplicationDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise) // Unwrap the params Promise
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchApplication()
  }, [params.id]) // Now params.id is safe to use

  const fetchApplication = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/application/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch application")
      }

      setApplication(data.application)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (applicationData: Omit<Application, "id" | "user_id" | "created_at" | "updated_at">) => {
    try {
      setSubmitting(true)
      setError(null)

      const response = await fetch("/api/application", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id, ...applicationData }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update application")
      }

      setApplication(data.application)
      setEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      setError(null)

      const response = await fetch(`/api/application?id=${params.id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete application")
      }

      router.push("/applications")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    )
  }

  if (error && !application) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Link href="/applications">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!application) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/applications">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(!editing)}>
              <Edit className="h-4 w-4 mr-2" />
              {editing ? "Cancel" : "Edit"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={deleting}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Application</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this application? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Edit Form */}
        {editing ? (
          <ApplicationForm
            initialData={application}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            loading={submitting}
          />
        ) : (
          /* Application Details */
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                    {application.company_name}
                  </CardTitle>
                  <p className="text-lg text-muted-foreground font-medium">{application.job_title}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(application.priority)}>{application.priority}</Badge>
                  <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Applied:</span>
                  <span>{new Date(application.application_date).toLocaleDateString()}</span>
                </div>
                {application.follow_up_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Follow-up:</span>
                    <span>{new Date(application.follow_up_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              {(application.contact_email || application.portal_link) && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="flex gap-2">
                    {application.contact_email && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${application.contact_email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          {application.contact_email}
                        </a>
                      </Button>
                    )}
                    {application.portal_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={application.portal_link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Job Portal
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Job Description */}
              {application.job_description && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Job Description</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{application.job_description}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {application.notes && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Notes</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{application.notes}</p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="pt-4 border-t text-xs text-muted-foreground">
                <p>Created: {new Date(application.created_at).toLocaleString()}</p>
                <p>Last updated: {new Date(application.updated_at).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}