"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { createClient } from "@/lib/client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Briefcase } from "lucide-react"
import { ApplicationFilters } from "./_components/ApplicationFilters"
import { ApplicationForm } from "./_components/ApplicationForm"
import { ApplicationCard } from "./_components/ApplicationCard"

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

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
    sortBy: "application_date",
    sortOrder: "desc",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchApplications()
  }, [filters])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const query = new URLSearchParams({
        ...filters,
        status: filters.status !== "all" ? filters.status : "",
        priority: filters.priority !== "all" ? filters.priority : "",
      }).toString()

      const response = await fetch(`/api/application?${query}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch applications")
      }

      setApplications(data.applications || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleAddApplication = async (
    applicationData: Omit<Application, "id" | "user_id" | "created_at" | "updated_at">,
  ) => {
    try {
      setSubmitting(true)
      setError(null)

      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add application")
      }

      setApplications([data.application, ...applications])
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateApplication = (updatedApplication: Application) => {
    setApplications(applications.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
  }

  const handleDeleteApplication = (deletedId: string) => {
    setApplications(applications.filter((app) => app.id !== deletedId))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-balance">Job Application Tracker</h1>
          </div>
          <p className="text-muted-foreground text-pretty">
            Keep track of your job applications, interviews, and follow-ups in one place.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ApplicationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onAddClick={() => setShowForm(!showForm)}
            showForm={showForm}
          />
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Add Application Form */}
        {showForm && (
          <div className="mb-6">
            <ApplicationForm onSubmit={handleAddApplication} onCancel={() => setShowForm(false)} loading={submitting} />
          </div>
        )}

        {/* Applications List */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground mb-4">
              {filters.search || filters.status !== "all" || filters.priority !== "all"
                ? "Try adjusting your filters or search terms."
                : "Get started by adding your first job application."}
            </p>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="text-primary hover:underline">
                Add your first application
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                // onUpdate={handleUpdateApplication}
                // onDelete={handleDeleteApplication}
              />
            ))}
          </div>
        )}

        {/* Results Summary */}
        {!loading && applications.length > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {applications.length} application{applications.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  )
}
