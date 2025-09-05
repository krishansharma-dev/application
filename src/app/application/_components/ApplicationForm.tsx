"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

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

interface ApplicationFormProps {
  onSubmit: (application: Omit<Application, "id" | "user_id" | "created_at" | "updated_at">) => void
  onCancel: () => void
  loading?: boolean
}

export function ApplicationForm({ onSubmit, onCancel, loading = false }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    company_name: "",
    job_title: "",
    contact_email: "",
    portal_link: "",
    job_description: "",
    notes: "",
    application_date: new Date().toISOString().split("T")[0],
    status: "Applied" as Application["status"],
    follow_up_date: "",
    priority: "Medium" as Application["priority"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      contact_email: formData.contact_email || null,
      portal_link: formData.portal_link || null,
      follow_up_date: formData.follow_up_date || null,
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Add New Application</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_title">Job Title *</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => handleChange("job_title", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleChange("contact_email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portal_link">Portal Link</Label>
              <Input
                id="portal_link"
                type="url"
                value={formData.portal_link}
                onChange={(e) => handleChange("portal_link", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_description">Job Description</Label>
            <Textarea
              id="job_description"
              value={formData.job_description}
              onChange={(e) => handleChange("job_description", e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="application_date">Application Date *</Label>
              <Input
                id="application_date"
                type="date"
                value={formData.application_date}
                onChange={(e) => handleChange("application_date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Follow-Up Due">Follow-Up Due</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="follow_up_date">Follow-up Date</Label>
            <Input
              id="follow_up_date"
              type="date"
              value={formData.follow_up_date}
              onChange={(e) => handleChange("follow_up_date", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Application"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
