export default function MensAccessoriesFilters() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-full p-2 border rounded-md">
            <option>All Categories</option>
            <option>Watches</option>
            <option>Belts</option>
            <option>Wallets</option>
            <option>Sunglasses</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select className="w-full p-2 border rounded-md">
            <option>All Prices</option>
            <option>Under $50</option>
            <option>$50 - $100</option>
            <option>$100 - $200</option>
            <option>Over $200</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <select className="w-full p-2 border rounded-md">
            <option>All Brands</option>
            <option>Premium</option>
            <option>Classic</option>
            <option>Modern</option>
          </select>
        </div>
      </div>
    </div>
  );
}
