export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-40 px-6 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How Cropsight Works
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Three simple steps to protect your crops
        </p>
        
        <div className="space-y-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Capture or Upload
              </h2>
              <p className="text-gray-700">
                Take a photo of your crop using your smartphone camera or upload an existing image. 
                Our system accepts JPG, PNG, and JPEG formats up to 10MB.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI Analysis
              </h2>
              <p className="text-gray-700">
                Our advanced AI model analyzes the image in seconds, identifying potential diseases, 
                pests, or nutrient deficiencies with high accuracy.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Recommendations
              </h2>
              <p className="text-gray-700">
                Receive instant treatment recommendations, preventive measures, and expert advice 
                to protect your crops and maximize yield.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of farmers already using Cropsight
          </p>
          <a 
            href="/signup"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  );
}
