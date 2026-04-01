'use client';

import Link from 'next/link';
import { Camera } from 'lucide-react';

export default function PhotoUploadButton() {
  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl mx-auto px-6">
      <Link 
        href="/scan"
        className="group relative cursor-pointer bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl hover:shadow-primary/20 border-2 border-transparent hover:border-primary transition-all duration-500 hover:-translate-y-2 text-center max-w-2xl w-full"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all mx-auto shadow-lg shadow-primary/5">
          <Camera className="w-12 h-12 text-primary group-hover:text-white transition-colors" />
        </div>
        <h3 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Start New Scan</h3>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Open camera or upload photos for instant AI-powered crop diagnosis
        </p>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
           <div className="w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
        </div>
        <div className="absolute bottom-6 left-6 opacity-20 group-hover:opacity-100 transition-opacity">
           <div className="w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
        </div>
      </Link>
    </div>
  );
}
