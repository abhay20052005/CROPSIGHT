'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PhotoUploadButton from './components/PhotoUploadButton';
import MSPTable from './components/MSPTable';
import InteractiveBackground from './components/InteractiveBackground';
import WeatherWidget from './components/WeatherWidget';
import { Camera, CloudSun, TrendingUp, TrendingDown, Target, Activity, ChevronRight } from 'lucide-react';

export default function Home() {
  const sectionsRef = useRef([]);
  const [analysis, setAnalysis] = useState(null);

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

  const handleWeatherUpdate = (weather, city) => {
    // Advanced Agricultural Analysis (March 2026 Specific)
    let best, worst;
    
    const condition = (weather.condition || "").toLowerCase();
    const isHot = weather.temp > 30;
    const isWet = condition.includes('rain') || condition.includes('storm');
    const isVeryHumid = weather.humidity > 60;

    if (isWet) {
      best = { crop: 'Mint / Mentha', reason: 'High hydration tolerance during intermittent rains.' };
      worst = { crop: 'Standing Wheat', reason: 'Critical Risk: Lodging and grain blackening due to moisture.' };
    } else if (isHot && !isVeryHumid) {
      best = { crop: 'Watermelon & Muskmelon', reason: 'Peak heat accelerates sugar accumulation and ripening.' };
      worst = { crop: 'Leafy Vegetables', reason: 'High transpiration rate; risk of wilting and bitterness.' };
    } else if (isVeryHumid) {
      best = { crop: 'Sugarcane Sowing', reason: 'Moisture-rich air is ideal for early germination.' };
      worst = { crop: 'Onion & Garlic', reason: 'Harvest Risk: Curing is impossible; high risk of fungal rot.' };
    } else {
      // Ideal Spring Weather
      best = { crop: 'Wheat (Harvesting)', reason: 'Dry, moderate weather ensures low grain moisture for storage.' };
      worst = { crop: 'Late Mustard', reason: 'Shattering risk if harvest is delayed in dry wind.' };
    }

    setAnalysis({ best, worst, city });
  };

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-green-50 via-white to-transparent relative overflow-hidden">
          <InteractiveBackground />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div ref={(el) => (sectionsRef.current[0] = el)} className="opacity-0">
              <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-8 tracking-tight">
                CROPSIGHT
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Snap. Diagnose. Protect.
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                AI-powered crop disease detection for modern agriculture. 
                Upload a photo and get instant diagnosis with treatment recommendations.
              </p>
            </div>
            
            <div ref={(el) => (sectionsRef.current[1] = el)} className="opacity-0">
              <PhotoUploadButton />
            </div>
          </div>
        </section>

        {/* Crop Management Preview Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div ref={(el) => (sectionsRef.current[2] = el)} className="opacity-0">
              <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-[4rem] shadow-2xl p-8 md:p-14 border border-white">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
                  Field Intelligence Dashboard
                </h2>
                
                <div className="grid lg:grid-cols-12 gap-8 mb-12 items-stretch">
                  {/* Crop Analysis Card (Expanded) */}
                  <div className="lg:col-span-12 xl:col-span-4 bg-white rounded-[3rem] p-10 border border-gray-100 flex flex-col justify-center shadow-xl shadow-gray-200/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                       <Target size={120} />
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-gray-400 text-xs mb-8 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                         <Activity className="w-4 h-4 text-primary" /> Real-time Analysis
                      </p>
                      
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 italic">Current Health Status</p>
                          <div className="text-7xl font-black text-primary tracking-tighter mb-2">GOOD</div>
                          <div className="flex items-center gap-2 text-primary/70 font-bold bg-primary/10 px-4 py-1.5 rounded-full text-[11px] w-fit">
                             <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/40" />
                             OPTIMAL FOR HARVEST
                          </div>
                        </div>

                        {analysis && (
                          <div className="pt-8 border-t border-gray-50 flex flex-col gap-5">
                            <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                               <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 text-white">
                                  <TrendingUp size={20} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Best Harvest</p>
                                  <p className="text-sm font-black text-gray-900">{analysis.best.crop}</p>
                                  <p className="text-[10px] text-emerald-700/60 font-medium">{analysis.best.reason}</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-4 bg-red-50 p-4 rounded-2xl border border-red-100">
                               <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 text-white">
                                  <TrendingDown size={20} />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none mb-1">Harvest Risk</p>
                                  <p className="text-sm font-black text-gray-900">{analysis.worst.crop}</p>
                                  <p className="text-[10px] text-red-700/60 font-medium">{analysis.worst.reason}</p>
                               </div>
                            </div>
                          </div>
                        )}
                        
                        {!analysis && (
                          <div className="pt-8 flex flex-col items-center justify-center py-4 bg-gray-50 rounded-3xl animate-pulse">
                              <p className="text-[10px] font-bold text-gray-400">Waiting for location sync...</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Local Weather Section */}
                  <div className="lg:col-span-12 xl:col-span-8">
                     <WeatherWidget onWeatherUpdate={handleWeatherUpdate} />
                  </div>
                </div>

                <div className="space-y-6">
                  <Link 
                    href="/scan"
                    className="block w-full py-6 bg-primary text-white rounded-[2.5rem] font-extrabold text-2xl text-center hover:bg-primary-dark transition-all shadow-2xl hover:shadow-primary/40 hover:scale-105 flex items-center justify-center gap-4 border-2 border-primary"
                  >
                    <Camera className="w-8 h-8" />
                    Launch Smart Scanner
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Link 
                      href="/scan/history"
                      className="block w-full py-5 bg-white text-gray-700 rounded-3xl font-bold text-lg text-center border-2 border-gray-100 hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                      Scan History
                    </Link>
                    
                    <Link 
                      href="/msp"
                      className="block w-full py-5 bg-white text-gray-700 rounded-3xl font-bold text-lg text-center border-2 border-gray-100 hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                      MSP Rates
                    </Link>
                  </div>
                </div>

                <div className="mt-12 text-center pb-4">
                  <Link 
                    href="/crop-management"
                    className="inline-flex items-center text-primary font-bold text-lg hover:text-primary-dark transition-all group"
                  >
                    Explore Comprehensive Dashboard
                    <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MSP Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div ref={(el) => (sectionsRef.current[3] = el)} className="opacity-0">
              <MSPTable />
            </div>
          </div>
        </section>

        {/* Features Section - Standard Restoration */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div ref={(el) => (sectionsRef.current[4] = el)} className="opacity-0 text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Why Farmers Trust Cropsight
              </h2>
              <p className="text-gray-500 text-lg">
                Empowering Indian farmers with cutting-edge intelligence
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  title: 'Instant Detection',
                  desc: 'Get disease diagnosis in seconds with our advanced AI model trained on thousands of crop images',
                  gradient: 'from-green-50 to-white'
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  title: 'Expert Advice',
                  desc: 'Receive treatment recommendations from agricultural experts and proven solutions',
                  gradient: 'from-blue-50 to-white'
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  title: 'Live MSP Rates',
                  desc: 'Stay updated with current minimum support prices and market trends for better planning',
                  gradient: 'from-amber-50 to-white'
                }
              ].map((feature, idx) => (
                <div 
                  key={idx}
                  ref={(el) => (sectionsRef.current[5 + idx] = el)}
                  className={`opacity-0 bg-gradient-to-br ${feature.gradient} p-8 rounded-2xl shadow-md border border-gray-100 hover-lift`}
                >
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyYzAgMi0yIDQtMiA0cy0yLTItMi00di0yem0wLTMwYzAtMiAyLTQgMi00czIgMiAyIDR2MmMwIDItMiA0LTIgNHMtMi0yLTItNFY0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { number: '10K+', label: 'Active Farmers' },
                { number: '50K+', label: 'Scans Completed' },
                { number: '95%', label: 'Accuracy Rate' },
                { number: '24/7', label: 'AI Support' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  ref={(el) => (sectionsRef.current[8 + idx] = el)}
                  className="opacity-0"
                >
                  <div className="text-5xl md:text-7xl font-black mb-3 tracking-tighter text-primary">{stat.number}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <div ref={(el) => (sectionsRef.current[12] = el)} className="max-w-4xl mx-auto text-center opacity-0">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              Ready to Protect Your Harvest?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
              Join the future of farming. Get instant alerts, field insights, and disease detection today.
            </p>
            <Link 
              href="/signup"
              className="inline-block px-12 py-6 bg-primary text-white rounded-full font-black text-xl hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
