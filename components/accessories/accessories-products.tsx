export default function AccessoriesProducts() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Premium Watch</h3>
            <p className="text-gray-600">Elegant timepiece for any occasion</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Designer Handbag</h3>
            <p className="text-gray-600">Stylish and functional everyday bag</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Sunglasses</h3>
            <p className="text-gray-600">UV protection with modern style</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Jewelry Set</h3>
            <p className="text-gray-600">Complete your look with elegant jewelry</p>
          </div>
        </div>
      </div>
    </div>
  );
}
