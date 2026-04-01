'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Camera, History, Image as ImageIcon, ArrowRight, CheckCircle2, AlertTriangle, Zap, Info, RefreshCw } from 'lucide-react';
import CameraModal from '../components/CameraModal';

export default function ScanPage() {
  const sectionsRef = useRef([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const processFile = async (file) => {
    setUploading(true);
    setResult(null);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', 'anonymous');
      
      const response = await fetch('http://localhost:5000/api/scan/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze image');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Scan error:', err);
      setError('Diagnosis failed. Ensure the backend and ML services are running.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyZTdkMzIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyYzAgMi0yIDQtMiA0cy0yLTItMi00di0yem0wLTMwYzAtMiAyLTQgMi00czIgMiAyIDR2MmMwIDItMiA0LTIgNHMtMi0yLTItNFY0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={(el) => (sectionsRef.current[0] = el)} className="opacity-0 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            AI Crop <span className="text-primary text-glow">Diagnostics</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your capture mode to get an instant diagnosis of your crop's current health.
          </p>
        </div>
        
        {/* Status Messages */}
        <div className="max-w-4xl mx-auto mb-16">
          {uploading && (
             <div className="flex flex-col items-center justify-center py-10 bg-white/50 rounded-[3rem] border border-primary/20 animate-pulse">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <span className="text-primary font-black text-2xl tracking-tighter uppercase">AI Analyzing Field Pattern...</span>
                <p className="text-gray-500 text-sm mt-2">Checking for 38+ plant disease variants</p>
             </div>
          )}

          {error && (
            <div className="bg-red-50 p-8 rounded-[3rem] border border-red-100 flex items-center gap-6 shadow-xl shadow-red-200/50">
               <div className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center text-white shadow-lg">
                  <AlertTriangle size={32} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-red-900 uppercase tracking-tight">System Offline</h3>
                  <p className="text-red-700/70 font-medium">{error}</p>
               </div>
            </div>
          )}

          {result && (
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 transform animate-fade-in-up">
               <div className={`p-10 ${result.isHealthy ? 'bg-emerald-500' : 'bg-primary'} flex items-center justify-between`}>
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-white backdrop-blur-md">
                        {result.isHealthy ? <CheckCircle2 size={40} /> : <Zap size={40} />}
                     </div>
                     <div>
                        <div className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-1">Diagnosis Result</div>
                        <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{result.disease}</h3>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Confidence</div>
                     <div className="text-4xl font-black text-white tracking-tighter">{result.confidence}%</div>
                  </div>
               </div>
               
               <div className="p-10 grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div>
                        <h4 className="flex items-center gap-2 text-gray-900 font-black uppercase tracking-widest text-xs mb-4">
                           <Info className="w-4 h-4 text-primary" /> Recommended Treatment
                        </h4>
                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-gray-700 font-medium leading-relaxed">
                           {result.treatment}
                        </div>
                     </div>
                     <button 
                       onClick={() => setResult(null)}
                       className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all"
                     >
                       Scan Another Crop
                     </button>
                  </div>
                  
                  <div className="space-y-6">
                     <h4 className="flex items-center gap-2 text-gray-900 font-black uppercase tracking-widest text-xs mb-4">
                        <History className="w-4 h-4 text-primary" /> Analysis Insights
                     </h4>
                     <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                           <span className="text-gray-500 text-sm font-bold uppercase">Crop Detected</span>
                           <span className="text-gray-900 font-black uppercase tracking-tight">{result.cropType}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                           <span className="text-gray-500 text-sm font-bold uppercase">Status</span>
                           <span className={`font-black uppercase tracking-tight ${result.isHealthy ? 'text-emerald-500' : 'text-primary'}`}>
                              {result.isHealthy ? 'HEALTHY' : 'DISEASED'}
                           </span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-gray-500 text-sm font-bold uppercase">Stored ID</span>
                           <span className="text-gray-400 font-mono text-xs">{result._id?.substring(0, 10)}...</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Scan Card (Camera) */}
          <div 
            onClick={() => setIsCameraOpen(true)}
            ref={(el) => (sectionsRef.current[1] = el)}
            className="opacity-0 group bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all p-10 md:p-12 border-2 border-transparent hover:border-primary cursor-pointer hover-lift flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
              <Camera className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              Quick Scan
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Open your device camera for a live scan. Our AI will analyze the crop health in real-time.
            </p>
            
            <div className="flex items-center text-primary font-bold text-lg group-hover:gap-3 transition-all">
              Start Scanning
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Files from Device Card */}
          <div 
            ref={(el) => (sectionsRef.current[2] = el)}
            className="opacity-0 group bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all p-10 md:p-12 border-2 border-transparent hover:border-emerald-500 hover-lift overflow-hidden relative flex flex-col items-center text-center"
          >
            <label htmlFor="scan-file-upload" className="cursor-pointer">
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:scale-110 transition-all">
                <ImageIcon className="w-10 h-10 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition-colors">
                Files from Device
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                Upload images from your device gallery. We support JPEG, PNG, and JPG formats.
              </p>
              
              <div className="flex items-center text-emerald-600 font-bold text-lg group-hover:gap-3 transition-all">
                Choose Files
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>

              <input
                id="scan-file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Scan History Card */}
          <Link 
            href="/scan/history"
            ref={(el) => (sectionsRef.current[3] = el)}
            className="opacity-0 group bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all p-10 md:p-12 border-2 border-transparent hover:border-blue-500 hover-lift flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
              <History className="w-10 h-10 text-blue-500 group-hover:text-white transition-colors" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
              Scan History
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              View previous scans, track disease patterns, and access expert recommendations.
            </p>
            
            <div className="flex items-center text-blue-500 font-bold text-lg group-hover:gap-3 transition-all">
              View History
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        <CameraModal 
          isOpen={isCameraOpen} 
          onClose={() => setIsCameraOpen(false)} 
          onCapture={processFile} 
        />
      </div>
    </div>
  );
}
