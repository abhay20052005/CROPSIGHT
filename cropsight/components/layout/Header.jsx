'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { APP_NAME } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'Scan',
      dropdown: [
        { label: 'Quick Scan', href: '/scan' },
        { label: 'Scan History', href: '/scan/history' },
      ],
    },
    {
      label: 'Prices',
      dropdown: [
        { label: 'Current MSP', href: '/msp' },
        { label: 'Price Trends', href: '/prices' },
      ],
    },
    { label: 'Crop Management', href: '/crop-management' },
    { label: 'About', href: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          {APP_NAME}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <>
                  <button className="text-gray-700 hover:text-primary font-medium transition-colors">
                    {link.label}
                  </button>
                  {activeDropdown === idx && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[180px]">
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <Link
          href="/login"
          className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
