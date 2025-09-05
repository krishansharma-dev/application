import { createClient } from "@/lib/server"
import { type NextRequest, NextResponse } from "next/server"

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

    // Get query parameters for filtering and sorting
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const sortBy = searchParams.get("sortBy") || "application_date"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const search = searchParams.get("search")

    // Build query
    let query = supabase.from("applications").select("*").eq("user_id", user.id)

    // Apply filters
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (priority && priority !== "all") {
      query = query.eq("priority", priority)
    }

    // Apply search
    if (search) {
      query = query.or(`company_name.ilike.%${search}%,job_title.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" })

    const { data: applications, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()

    // Validate required fields
    if (!body.company_name || !body.job_title || !body.application_date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const applicationData = {
      ...body,
      user_id: user.id,
      contact_email: body.contact_email || null,
      portal_link: body.portal_link || null,
      job_description: body.job_description || "",
      notes: body.notes || "",
      follow_up_date: body.follow_up_date || null,
    }

    const { data: application, error } = await supabase.from("applications").insert([applicationData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    return NextResponse.json({ application }, { status: 201 })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
