export default function MarketPage() {
  return (
    <div className="min-h-screen pt-40 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Market Information
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Live market prices and trading information
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access real-time market prices, mandi rates, and connect with buyers directly. 
            This feature will help you get the best prices for your produce.
          </p>
        </div>
      </div>
    </div>
  );
}
