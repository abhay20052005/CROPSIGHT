'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scanDropdown, setScanDropdown] = useState(false);
  const [pricesDropdown, setPricesDropdown] = useState(false);
  const [mobileScanOpen, setMobileScanOpen] = useState(false);
  const [mobilePricesOpen, setMobilePricesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileScanOpen(false);
    setMobilePricesOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="bg-white/30 backdrop-blur-2xl rounded-full border border-white/40 shadow-lg px-4 sm:px-6 py-2.5">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Cropsight" width={60} height={60} className="h-14 sm:h-16 w-auto" priority />
                <span className="hidden sm:block text-xl font-bold text-primary">CROPSIGHT</span>
              </Link>
              
              <ul className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                <li>
                  <Link href="/" className={`font-medium text-base transition-colors ${pathname === '/' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Home
                  </Link>
                </li>
                <li className="relative group" onMouseEnter={() => setScanDropdown(true)} onMouseLeave={() => setScanDropdown(false)}>
                  <Link href="/scan" className={`font-medium text-base transition-colors flex items-center gap-1 ${pathname.startsWith('/scan') ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Scan
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {scanDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56" style={{ zIndex: 9999 }}>
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 py-2">
                        <Link href="/scan" onClick={() => setScanDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                          <span className="font-medium">Quick Scan</span>
                        </Link>
                        <Link href="/scan/history" onClick={() => setScanDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                          <span className="font-medium">Scan History</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
                <li className="relative group" onMouseEnter={() => setPricesDropdown(true)} onMouseLeave={() => setPricesDropdown(false)}>
                  <Link href="/prices" className={`font-medium text-base transition-colors flex items-center gap-1 ${pathname.startsWith('/prices') ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Prices
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {pricesDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56" style={{ zIndex: 9999 }}>
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 py-2">
                        <Link href="/msp" onClick={() => setPricesDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                          <span className="font-medium">Current MSP Rates</span>
                        </Link>
                        <Link href="/prices" onClick={() => setPricesDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                          <span className="font-medium">Price Trends</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <Link href="/crop-management" className={`font-medium text-base transition-colors ${pathname === '/crop-management' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Crop Management
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={`font-medium text-base transition-colors ${pathname === '/about' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    About
                  </Link>
                </li>
              </ul>

              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-all shadow-md">
                  Sign Up
                </Link>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-gradient-to-br from-green-50/95 via-white/95 to-emerald-50/95 backdrop-blur-3xl animate-fade-in">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-white/40 backdrop-blur-xl">
              <div className="flex items-center gap-3 animate-slide-in-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"></div>
                  <Image src="/logo.png" alt="Cropsight" width={60} height={60} className="h-14 w-auto relative z-10" />
                </div>
                <div>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">CROPSIGHT</span>
                  <p className="text-xs text-gray-600 font-medium">Snap. Diagnose. Protect.</p>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 rounded-2xl bg-white/60 hover:bg-white text-gray-700 hover:text-primary transition-all hover:scale-110 hover:rotate-90 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-6 space-y-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`block text-3xl font-bold transition-colors ${pathname === '/' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                Home
              </Link>
              
              <div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setMobileScanOpen(!mobileScanOpen)} className={`text-3xl font-bold transition-colors text-left ${pathname.startsWith('/scan') ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Scan
                  </button>
                  <button onClick={() => setMobileScanOpen(!mobileScanOpen)} className="p-2 text-gray-800 hover:text-primary">
                    <svg className={`w-8 h-8 transition-transform duration-300 ${mobileScanOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileScanOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-3 pl-6">
                    <Link href="/scan" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-medium text-gray-700 hover:text-primary transition-colors">
                      Quick Scan
                    </Link>
                    <Link href="/scan/history" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-medium text-gray-700 hover:text-primary transition-colors">
                      Scan History
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setMobilePricesOpen(!mobilePricesOpen)} className={`text-3xl font-bold transition-colors text-left ${pathname.startsWith('/prices') || pathname === '/msp' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                    Prices
                  </button>
                  <button onClick={() => setMobilePricesOpen(!mobilePricesOpen)} className="p-2 text-gray-800 hover:text-primary">
                    <svg className={`w-8 h-8 transition-transform duration-300 ${mobilePricesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobilePricesOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-3 pl-6">
                    <Link href="/msp" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-medium text-gray-700 hover:text-primary transition-colors">
                      Current MSP Rates
                    </Link>
                    <Link href="/prices/price_trends" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-medium text-gray-700 hover:text-primary transition-colors">
                      Price Trends
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/crop-management" onClick={() => setMobileMenuOpen(false)} className={`block text-3xl font-bold transition-colors ${pathname === '/crop-management' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                Crop Management
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`block text-3xl font-bold transition-colors ${pathname === '/about' ? 'text-primary' : 'text-gray-800 hover:text-primary'}`}>
                About
              </Link>
            </nav>
            <div className="space-y-4 mt-8">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 text-center text-xl font-semibold text-gray-800 border-2 border-gray-300 rounded-2xl hover:border-primary hover:text-primary transition-all">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 text-center text-xl font-semibold bg-primary text-white rounded-2xl hover:bg-primary-dark transition-all shadow-lg">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
