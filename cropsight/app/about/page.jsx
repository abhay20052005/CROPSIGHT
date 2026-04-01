'use client';

import { useEffect, useRef } from 'react';

export default function AboutPage() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
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

  return (
    <div className="min-h-screen pt-40">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyZTdkMzIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyYzAgMi0yIDQtMiA0cy0yLTItMi00di0yem0wLTMwYzAtMiAyLTQgMi00czIgMiAyIDR2MmMwIDItMiA0LTIgNHMtMi0yLTItNFY0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={(el) => (sectionsRef.current[0] = el)} className="opacity-0 transition-all duration-1000">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-primary font-semibold">AI-Powered Agriculture</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About Cropsight
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Cropsight is an AI-powered agricultural platform helping Indian farmers detect crop diseases instantly. 
                Using advanced machine learning and computer vision, we provide real-time analysis and actionable insights 
                to protect your harvest and maximize yields.
              </p>
              <div className="flex gap-4">
                <a 
                  href="/signup"
                  className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Get Started
                </a>
                <a 
                  href="/scan"
                  className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  Try Demo
                </a>
              </div>
            </div>
            
            <div ref={(el) => (sectionsRef.current[1] = el)} className="opacity-0 transition-all duration-1000 delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-teal-500/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl">
                    <svg className="w-40 h-40 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={(el) => (sectionsRef.current[2] = el)} className="opacity-0 transition-all duration-1000 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl transform -rotate-3"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl">
                    <svg className="w-40 h-40 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div ref={(el) => (sectionsRef.current[3] = el)} className="opacity-0 transition-all duration-1000 delay-300 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-amber-600/10 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-amber-600 font-semibold">Our Mission</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Empowering Every Farmer
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To empower every Indian farmer with accessible technology that prevents crop loss, increases profitability, 
                and ensures food security for our nation. We believe that technology should be a tool for empowerment, 
                not a barrier, and we're committed to making advanced agricultural solutions available to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={(el) => (sectionsRef.current[4] = el)} className="opacity-0 transition-all duration-1000">
              <div className="inline-flex items-center gap-2 bg-blue-600/10 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-blue-600 font-semibold">Our Vision</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Future of Farming
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                A future where no farmer loses their harvest to preventable diseases, and where technology bridges 
                the gap between traditional farming and modern agricultural practices. We envision a world where 
                every farmer has the tools and knowledge to make data-driven decisions that protect their livelihood.
              </p>
            </div>
            
            <div ref={(el) => (sectionsRef.current[5] = el)} className="opacity-0 transition-all duration-1000 delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl">
                    <svg className="w-40 h-40 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div ref={(el) => (sectionsRef.current[6] = el)} className="opacity-0 transition-all duration-1000 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl transform -rotate-3"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-center h-80 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                    <svg className="w-40 h-40 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div ref={(el) => (sectionsRef.current[7] = el)} className="opacity-0 transition-all duration-1000 delay-300 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-600/10 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-purple-600 font-semibold">Advanced Technology</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powered by AI
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Powered by proprietary AI models trained on millions of Indian crop images, specifically optimized 
                for local conditions, soil types, and common regional diseases.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">95% Accuracy Rate</h3>
                    <p className="text-gray-600">Trained on diverse Indian crop datasets</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Real-time Analysis</h3>
                    <p className="text-gray-600">Get results in seconds, not days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Continuous Learning</h3>
                    <p className="text-gray-600">Models improve with every scan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div ref={(el) => (sectionsRef.current[8] = el)} className="text-center mb-16 opacity-0 transition-all duration-1000">
            <div className="inline-flex items-center gap-2 bg-slate-600/10 px-4 py-2 rounded-full mb-6">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-slate-600 font-semibold">Our Team</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built by Experts
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Founded by agricultural experts and AI engineers, Cropsight combines decades of farming knowledge 
              with cutting-edge technology to serve Indian agriculture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Agricultural Experts', 
                desc: 'Deep understanding of Indian farming practices',
                color: 'text-green-600 bg-green-100'
              },
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'AI Engineers', 
                desc: 'Cutting-edge machine learning expertise',
                color: 'text-blue-600 bg-blue-100'
              },
              { 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Product Specialists', 
                desc: 'User-focused design and development',
                color: 'text-purple-600 bg-purple-100'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                ref={(el) => (sectionsRef.current[9 + idx] = el)}
                className="opacity-0 transition-all duration-1000 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Farmers' },
              { number: '50K+', label: 'Scans Completed' },
              { number: '95%', label: 'Accuracy Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, idx) => (
              <div key={idx} ref={(el) => (sectionsRef.current[12 + idx] = el)} className="opacity-0 transition-all duration-1000">
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of farmers already using Cropsight to safeguard their harvests
          </p>
          <a 
            href="/signup"
            className="inline-block px-10 py-5 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
          >
            Get Started Free
          </a>
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
