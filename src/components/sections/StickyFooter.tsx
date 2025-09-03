'use client';

import { Button } from '@/components/ui/button';
import { UserPlus, Briefcase, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function StickyFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = documentHeight * 0.8; // Show when 80% scrolled
      
      setIsVisible(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Footer Content */}
      <footer className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Thousands of Job Seekers and Recruiters
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Take control of your career today. Whether you're looking for your next opportunity or the perfect candidate, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Post a Job
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">50,000+</div>
                <p className="text-gray-300">Active Job Seekers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">10,000+</div>
                <p className="text-gray-300">Companies Hiring</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                <p className="text-gray-300">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transform transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-gray-900">Ready to accelerate your career?</p>
              <p className="text-sm text-gray-600">Join our platform today and discover your next opportunity.</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Sign Up Free
              </Button>
              <Button variant="outline">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}