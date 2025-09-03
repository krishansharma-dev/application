'use client';

import { Card } from '@/components/ui/card';
import { Search, Target, FileText, Network, TrendingUp, Shield } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Easy Job Search',
    description: 'Advanced search filters and AI-powered job recommendations tailored to your skills and preferences.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: Target,
    title: 'Smart Application Tracker',
    description: 'Never lose track of your applications with our intelligent tracking system and follow-up reminders.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: FileText,
    title: 'Free Resume Tools',
    description: 'Professional resume builder with ATS-optimized templates and AI-powered content suggestions.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Network,
    title: 'Events & Networking',
    description: 'Access exclusive career events, job fairs, and networking opportunities in your industry.',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    icon: TrendingUp,
    title: 'Career Insights',
    description: 'Get market insights, salary data, and career guidance to make informed decisions.',
    color: 'bg-red-100 text-red-600'
  },
  {
    icon: Shield,
    title: 'Verified Companies',
    description: 'All employers are verified to ensure legitimate job opportunities and secure applications.',
    color: 'bg-indigo-100 text-indigo-600'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to accelerate your career journey in one comprehensive platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Join 50,000+ professionals already using our platform
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}