export default function KidsAccessoriesFilters() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
          <select className="w-full p-2 border rounded-md">
            <option>All Ages</option>
            <option>0-3 years</option>
            <option>4-7 years</option>
            <option>8-12 years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-full p-2 border rounded-md">
            <option>All Categories</option>
            <option>Backpacks</option>
            <option>Hair Accessories</option>
            <option>Sunglasses</option>
          </select>
        </div>
      </div>
    </div>
  );
}
