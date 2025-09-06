"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { createClient } from "@/lib/client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Activity, BarChart2 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Application {
  company_name: string
  job_title: string
}

interface ActivityLog {
  id: string
  user_id: string
  application_id: string | null
  action: string
  timestamp: string
  application: Application | null
}

interface StatusCount {
  status: string
  count: number
}

export default function DashboardPage() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch recent activity logs with type parameter
      const logsResponse = await fetch("/api/dashboard?type=activity")
      const logsData = await logsResponse.json()

      if (!logsResponse.ok) {
        throw new Error(logsData.error || "Failed to fetch activity logs")
      }

      // Fetch application status counts with type parameter
      const statsResponse = await fetch("/api/dashboard?type=stats")
      const statsData = await statsResponse.json()

      if (!statsResponse.ok) {
        throw new Error(statsData.error || "Failed to fetch application stats")
      }

      setActivityLogs(logsData.activityLogs || [])
      setStatusCounts(statsData.statusCounts || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 border-blue-200"
      case "Interview Scheduled":
        return "bg-yellow-50 border-yellow-200"
      case "Offer":
        return "bg-green-50 border-green-200"
      case "Rejected":
        return "bg-red-50 border-red-200"
      case "Follow-Up Due":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "text-blue-700"
      case "Interview Scheduled":
        return "text-yellow-700"
      case "Offer":
        return "text-green-700"
      case "Rejected":
        return "text-red-700"
      case "Follow-Up Due":
        return "text-orange-700"
      default:
        return "text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-balance">Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-pretty">
            Overview of your job application progress and recent activities.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Status Summary */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Application Status Overview</CardTitle>
              <CardDescription>
                Breakdown of your applications by status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                  ))}
                </div>
              ) : statusCounts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="mb-2 text-lg">No applications found</div>
                  <div className="text-sm">Start by adding your first job application</div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {statusCounts.map((status) => (
                    <Card 
                      key={status.status} 
                      className={`p-4 border-2 ${getStatusColor(status.status)}`}
                    >
                      <div className={`text-sm font-medium ${getStatusTextColor(status.status)}`}>
                        {status.status}
                      </div>
                      <div className={`text-2xl font-bold ${getStatusTextColor(status.status)}`}>
                        {status.count}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions on job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : activityLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="mb-2 text-lg">No recent activity</div>
                  <div className="text-sm">Activity will appear here when you interact with your applications</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {log.application
                            ? `${log.action} - ${log.application.company_name} (${log.application.job_title})`
                            : log.action}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(log.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}