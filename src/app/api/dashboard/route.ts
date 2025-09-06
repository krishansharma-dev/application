import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

// Define types for the activity log and application data
interface Application {
  company_name: string // Changed from string | null to string (NOT NULL in DB)
  job_title: string    // Changed from string | null to string (NOT NULL in DB)
}

interface ActivityLog {
  id: string
  user_id: string
  application_id: string | null
  action: string
  timestamp: string
  applications: Application | null
}

interface FormattedLog {
  id: string
  user_id: string
  application_id: string | null
  action: string
  timestamp: string
  application: Application | null
}

// Interface for status count results
interface StatusCount {
  status: string
  count: number
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    // Log the type parameter for debugging
    console.log("Received type parameter:", type);

    if (!type) {
      return NextResponse.json(
        { error: "Missing 'type' query parameter. Expected 'activity' or 'stats'." },
        { status: 400 }
      )
    }

    if (type === "activity") {
      // Fetch recent activity logs with related application data
      const { data: activityLogs, error: logsError } = await supabase
        .from("activity_logs")
        .select(`
          id,
          user_id,
          application_id,
          action,
          timestamp,
          applications:application_id (company_name, job_title)
        `)
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false })
        .limit(10) as { data: ActivityLog[] | null, error: any }

      if (logsError) {
        console.error("Database error (activity logs):", logsError)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
      }

      // Transform data to include application details directly
      const formattedLogs: FormattedLog[] = activityLogs?.map(log => ({
        id: log.id,
        user_id: log.user_id,
        application_id: log.application_id,
        action: log.action,
        timestamp: log.timestamp,
        application: log.applications ? {
          company_name: log.applications.company_name,
          job_title: log.applications.job_title
        } : null
      })) || []

      return NextResponse.json({ activityLogs: formattedLogs })
    }

    if (type === "stats") {
      // Fetch application status counts using the correct approach for Supabase aggregation
      const { data: applications, error: statsError } = await supabase
        .from("applications")
        .select("status")
        .eq("user_id", user.id)

      if (statsError) {
        console.error("Database error (status counts):", statsError)
        return NextResponse.json({ error: "Database error" }, { status: 500 })
      }

      // Count statuses manually since Supabase doesn't support count(*) with grouping in this way
      const statusCounts = applications?.reduce((acc: Record<string, number>, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1
        return acc
      }, {})

      // Convert to array format if needed for frontend compatibility
      const formattedStatusCounts: StatusCount[] = Object.entries(statusCounts || {}).map(([status, count]) => ({
        status,
        count
      }))

      return NextResponse.json({ statusCounts: formattedStatusCounts })
    }

    return NextResponse.json(
      { error: `Invalid 'type' parameter: ${type}. Expected 'activity' or 'stats'.` },
      { status: 400 }
    )
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}