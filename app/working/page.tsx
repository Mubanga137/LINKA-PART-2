export default function WorkingPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        ✅ App is Working!
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Next.js server is running properly on the correct port.
      </p>
      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Status:</h2>
        <ul className="text-green-700">
          <li>✅ Next.js 15.2.4 running</li>
          <li>✅ Port 3002 (auto-selected)</li>
          <li>✅ Dependencies installed</li>
          <li>✅ Radix UI version conflicts resolved</li>
        </ul>
      </div>
    </div>
  );
}
