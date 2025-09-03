"use client";

import { useState, useMemo } from "react";
import { format, isSameDay, isSameMonth, isToday } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/types/application";
import { Calendar } from "@/components/ui/calendar";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "follow-up";
  application: Application;
}

export default function CalendarPage() {
  const { applications, loading } = useApplications();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    return applications
      .filter((app: Application) => app.follow_up_date)
      .map((app: Application) => ({
        id: app.id,
        title: `Follow-up: ${app.company_name}`,
        date: app.follow_up_date!,
        type: "follow-up" as const,
        application: app,
      }));
  }, [applications]);

  const eventsForDate = useMemo(() => {
    return calendarEvents.filter((event: CalendarEvent) =>
      isSameDay(new Date(event.date), selectedDate)
    );
  }, [calendarEvents, selectedDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">
          Track follow-ups and important dates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Calendar />
            
                
     
          </div>
        </div>

        {/* Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                {format(selectedDate, "MMMM dd, yyyy")}
              </h3>
            </div>

            {eventsForDate.length > 0 ? (
              <div className="space-y-3">
                {eventsForDate.map((event: CalendarEvent) => (
                  <div
                    key={event.id}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        {event.title}
                      </span>
                    </div>
                    <div className="text-sm text-blue-700 mt-1">
                      {event.application?.job_title}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No events for this date</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Follow-ups
            </h3>
            <div className="space-y-3">
              {applications
                .filter(
                  (app: Application) =>
                    app.follow_up_date &&
                    new Date(app.follow_up_date) >= new Date()
                )
                .sort(
                  (a: Application, b: Application) =>
                    new Date(a.follow_up_date!).getTime() -
                    new Date(b.follow_up_date!).getTime()
                )
                .slice(0, 5)
                .map((app: Application) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {app.company_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {app.job_title}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(app.follow_up_date!), "MMM dd")}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
