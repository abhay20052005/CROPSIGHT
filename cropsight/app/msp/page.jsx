import MSPTable from '../components/MSPTable';

export default function MSPPage() {
  return (
    <div className="min-h-screen pt-40 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Minimum Support Prices
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Stay updated with the latest MSP rates and government schemes for farmers
        </p>
        
        <MSPTable />
        
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Government Schemes
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                PM-KISAN: Direct income support of ₹6000/year
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Crop Insurance: Protection against crop loss
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Soil Health Card: Free soil testing
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Apply
            </h2>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Visit your nearest agriculture office</li>
              <li>Submit required documents (land records, Aadhaar)</li>
              <li>Register for the scheme online or offline</li>
              <li>Receive benefits directly in your bank account</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
