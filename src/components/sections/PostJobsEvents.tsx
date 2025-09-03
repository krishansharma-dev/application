'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Users, Rocket, Building, Globe } from 'lucide-react';

export function PostJobsEvents() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            For Employers & Event Organizers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with top talent and grow your team with our comprehensive hiring platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Post a Job Card */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Post a Job</h3>
              <p className="text-gray-600 mb-8">
                Reach thousands of qualified candidates with our targeted job posting platform.
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Building className="h-4 w-4 text-blue-500" />
                  Company profile & branding
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-blue-500" />
                  Advanced candidate filtering
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Multi-platform distribution
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:scale-105 transition-all duration-200">
                Post Your First Job
              </Button>
            </div>
          </Card>
          
          {/* Create Event Card */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Events</h3>
              <p className="text-gray-600 mb-8">
                Host career fairs, networking events, and workshops to connect with talent.
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Rocket className="h-4 w-4 text-green-500" />
                  Event management tools
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-green-500" />
                  Attendee registration & tracking
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Globe className="h-4 w-4 text-green-500" />
                  Virtual & in-person events
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 group-hover:scale-105 transition-all duration-200">
                Create Your Event
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Business Sign-up CTA */}
        <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Next Star Employee?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join over 10,000+ companies using our platform to discover, connect, and hire exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white text-gray-900 hover:bg-gray-100 border-white"
              >
                View Pricing Plans
              </Button>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}