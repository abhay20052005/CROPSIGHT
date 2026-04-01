import Link from 'next/link';

export default function PricesPage() {
  return (
    <div className="min-h-screen pt-40 px-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Price Trends & Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-16 text-center">
          Historical price data, market trends, and predictions for informed crop decisions
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link 
            href="/msp"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-primary"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              Current MSP Rates
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              View the latest Minimum Support Prices for all major crops announced by the Government of India for 2024-25 season.
            </p>
            <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
              View Rates
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          <Link 
            href="/prices/price_trends"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-primary"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
              <svg className="w-8 h-8 text-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              Historical Trends
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Analyze historical price data, market trends, and predictions to make informed decisions about your crops.
            </p>
            <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all">
              View Trends
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-emerald-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Market Intelligence Coming Soon
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're working on advanced price prediction models, market analysis tools, and real-time commodity tracking to help you make better farming decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
