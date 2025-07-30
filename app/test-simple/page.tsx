export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Simple Test Page
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <p className="text-lg text-slate-600">
            This is a simple test page to verify basic functionality.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Test 1</h3>
              <p className="text-blue-700">Basic styling works</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Test 2</h3>
              <p className="text-green-700">Grid layout works</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Test 3</h3>
              <p className="text-purple-700">Colors work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
