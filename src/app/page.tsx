'use client';

import { ApplicationTracker } from '@/components/sections/ApplicationTracker';
import { Hero } from '@/components/sections/Hero';
import { JobListingsPreview } from '@/components/sections/JobListingsPreview';
import { PostJobsEvents } from '@/components/sections/PostJobsEvents';
import { ResumeBuilder } from '@/components/sections/ResumeBuilder';
import { StickyFooter } from '@/components/sections/StickyFooter';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <JobListingsPreview />
    <ApplicationTracker />
        <ResumeBuilder />
   <PostJobsEvents />
      <WhyChooseUs />
     <Testimonials />
    <StickyFooter />  
    </div>
  );
}