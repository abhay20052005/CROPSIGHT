export default function PriceTrendsPage() {
  return (
    <div className="min-h-screen pt-40 px-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Price Trends & Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building advanced market intelligence tools to help you make data-driven farming decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Historical Data</h3>
            <p className="text-gray-600">Track price movements over months and years to identify patterns</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Market Analysis</h3>
            <p className="text-gray-600">Get insights on supply, demand, and market conditions</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Price Predictions</h3>
            <p className="text-gray-600">AI-powered forecasts to plan your harvest timing</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Sign up to get notified when price trends and market analytics become available
          </p>
          <a href="/signup" className="inline-block px-8 py-4 bg-white text-primary rounded-full font-bold hover:shadow-2xl transition-all">
            Get Early Access
          </a>
        </div>
      </div>
    </div>
  );
}
