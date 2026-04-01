export default function ScanHistoryPage() {
  const mockHistory = [
    { id: 1, crop: 'Tomato', disease: 'Late Blight', date: '2024-11-18', severity: 'High' },
    { id: 2, crop: 'Wheat', disease: 'Rust', date: '2024-11-15', severity: 'Medium' },
    { id: 3, crop: 'Rice', disease: 'Healthy', date: '2024-11-12', severity: 'None' },
  ];

  return (
    <div className="min-h-screen pt-40 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Scan History
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          View your previous crop scans and diagnoses
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Crop</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Diagnosis</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Severity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.crop}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.disease}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.severity === 'High' ? 'bg-red-100 text-red-700' :
                        item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-primary hover:text-primary-dark font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
