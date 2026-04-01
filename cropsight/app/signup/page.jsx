'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function SignupPage() {
  const [signupMethod, setSignupMethod] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    otp: '',
    farmSize: '',
    terms: false
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Signup functionality - to be implemented');
  };

  const handleGetOTP = () => {
    if (formData.phone) {
      setOtpSent(true);
      alert(`OTP sent to ${formData.phone}`);
    }
  };

  const handleSocialSignup = (provider) => {
    alert(`${provider} signup - to be implemented`);
  };

  return (
    <div className="min-h-screen flex animate-fade-in-up">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-dark to-green-900 p-12 flex-col justify-between relative overflow-hidden animate-fade-in-left">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyYzAgMi0yIDQtMiA0cy0yLTItMi00di0yem0wLTMwYzAtMiAyLTQgMi00czIgMiAyIDR2MmMwIDItMiA0LTIgNHMtMi0yLTItNFY0eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
        </div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image 
              src="/logo_name.png" 
              alt="Cropsight" 
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </Link>
          <p className="text-white/90 text-lg font-semibold mt-4">Snap. Diagnose. Protect.</p>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            Start Your Journey
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of farmers using AI to protect their crops and maximize yields.
          </p>
          <div className="space-y-4 text-white/90">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Instant disease detection with 95% accuracy</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Expert treatment recommendations</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Real-time MSP rates and market trends</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/60 text-sm">
          © 2024 Cropsight. All rights reserved.
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto animate-fade-in-right">
        <div className="w-full max-w-md py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Get started with your free account</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleSocialSignup('Google')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            <button
              onClick={() => handleSocialSignup('Apple')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-all font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500 font-medium">Or sign up with</span>
            </div>
          </div>

          {/* Signup Method Toggle */}
          <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setSignupMethod('email')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                signupMethod === 'email' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setSignupMethod('phone')}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
                signupMethod === 'phone' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {signupMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleGetOTP}
                      className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
                    >
                      Get OTP
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="animate-fade-in-up bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-green-700 font-semibold">
                        OTP sent to {formData.phone}
                      </p>
                    </div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                      Enter 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      required
                      maxLength="6"
                      placeholder="000000"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                      className="w-full px-4 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center text-3xl tracking-[0.5em] font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleGetOTP}
                      className="w-full mt-3 text-sm text-primary hover:text-primary-dark font-semibold"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Farm Size (acres) - Optional
              </label>
              <input
                type="number"
                value={formData.farmSize}
                onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            
            <label className="flex items-start gap-3">
              <input 
                type="checkbox" 
                required
                checked={formData.terms}
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                className="mt-1 w-4 h-4 text-primary rounded" 
              />
              <span className="text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-primary font-semibold">Terms of Service</Link> and <Link href="/privacy" className="text-primary font-semibold">Privacy Policy</Link>
              </span>
            </label>
            
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>
          
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
