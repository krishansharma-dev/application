"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus, SlidersHorizontal } from "lucide-react"

interface FiltersProps {
  filters: {
    status: string
    priority: string
    search: string
    sortBy: string
    sortOrder: string
  }
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onAddClick: () => void
  showForm: boolean
}

export function ApplicationFilters({ filters, onFilterChange, onAddClick, showForm }: FiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              name="search"
              value={filters.search}
              onChange={onFilterChange}
              placeholder="Search companies or job titles..."
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>

            <Select
              value={filters.status}
              onValueChange={(value) => onFilterChange({ target: { name: "status", value } } as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Follow-Up Due">Follow-Up Due</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.priority}
              onValueChange={(value) => onFilterChange({ target: { name: "priority", value } } as any)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) => onFilterChange({ target: { name: "sortBy", value } } as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application_date">Application Date</SelectItem>
                <SelectItem value="company_name">Company Name</SelectItem>
                <SelectItem value="job_title">Job Title</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sortOrder}
              onValueChange={(value) => onFilterChange({ target: { name: "sortOrder", value } } as any)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onAddClick} className="shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Application"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
