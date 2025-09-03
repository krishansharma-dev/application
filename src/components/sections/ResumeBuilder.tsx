'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Sparkles, Zap, Eye } from 'lucide-react';

const resumeTemplates = [
  {
    id: 1,
    name: 'Professional',
    description: 'Clean and corporate design',
    preview: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2'
  },
  {
    id: 2,
    name: 'Creative',
    description: 'Modern design with color accents',
    preview: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2'
  },
  {
    id: 3,
    name: 'Minimal',
    description: 'Simple and elegant layout',
    preview: 'https://images.pexels.com/photos/4226215/pexels-photo-4226215.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2'
  }
];

export function ResumeBuilder() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Build a Resume That{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Gets You Hired
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create professional resumes in minutes with our AI-powered builder and ATS-optimized templates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Template Previews */}
          <div className="grid grid-cols-3 gap-4">
            {resumeTemplates.map((template, index) => (
              <div key={template.id} className="text-center">
                <div className="relative group">
                  <Card className="p-2 hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={template.preview}
                        alt={`${template.name} template`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Card>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-4">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Features */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI-Powered Content
                </h3>
                <p className="text-gray-600">
                  Generate compelling bullet points and optimize your content for ATS systems with our AI assistant.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quick Builder
                </h3>
                <p className="text-gray-600">
                  Build professional resumes in under 10 minutes with our intuitive drag-and-drop interface.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Multiple Formats
                </h3>
                <p className="text-gray-600">
                  Export your resume as PDF, Word document, or share a live link with potential employers.
                </p>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Free Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}