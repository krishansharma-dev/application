'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Filter, Briefcase } from 'lucide-react';
import { JobCard } from '../ui/job-card';

const trendingJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechFlow Inc.',
    location: 'San Francisco, CA',
    type: 'Remote',
    salary: '$120k - $160k',
    logo: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'StartupXyz',
    location: 'New York, NY',
    type: 'Hybrid',
    salary: '$140k - $180k',
    logo: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '1 day ago'
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Los Angeles, CA',
    type: 'Remote',
    salary: '$90k - $120k',
    logo: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '3 days ago'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Austin, TX',
    type: 'Onsite',
    salary: '$110k - $150k',
    logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '4 days ago'
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Seattle, WA',
    type: 'Remote',
    salary: '$130k - $170k',
    logo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '1 week ago'
  },
  {
    id: 6,
    title: 'Marketing Manager',
    company: 'GrowthCorp',
    location: 'Chicago, IL',
    type: 'Hybrid',
    salary: '$85k - $110k',
    logo: 'https://images.pexels.com/photos/3183146/pexels-photo-3183146.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    posted: '5 days ago'
  }
];

export function JobListingsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Job Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of opportunities from top companies worldwide
          </p>
        </div>
        
        {/* Filter Bar */}
        <Card className="p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input 
                  placeholder="Location" 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input 
                  placeholder="Job Title" 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>Salary Range</option>
                  <option>$50k - $75k</option>
                  <option>$75k - $100k</option>
                  <option>$100k - $150k</option>
                  <option>$150k+</option>
                </select>
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
                  <option>Work Type</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8">
              <Filter className="mr-2 h-4 w-4" />
              Filter Jobs
            </Button>
          </div>
        </Card>
        
        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trendingJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}