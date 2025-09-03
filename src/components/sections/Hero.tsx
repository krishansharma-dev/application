'use client';

import { Button } from '@/components/ui/button';
import { Search, MapPin, Briefcase } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32">
      {/* Background illustration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Find Jobs,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Track Applications
            </span>
            , and Grow Your Career
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            All-in-one job search, application tracker, and resume builder designed to accelerate your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Jobs
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Post a Job
            </Button>
          </div>
          
          {/* Quick search preview */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Search className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for jobs..."
                  className="bg-transparent outline-none text-gray-700 placeholder:text-gray-400 flex-1"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Location"
                  className="bg-transparent outline-none text-gray-700 placeholder:text-gray-400 w-32"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}