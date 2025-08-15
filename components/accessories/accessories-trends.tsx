export default function AccessoriesTrends() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Vintage Revival</h3>
            <p className="mb-4">Classic styles making a comeback with modern twists</p>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Bold Statement Pieces</h3>
            <p className="mb-4">Make an impact with eye-catching accessories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
