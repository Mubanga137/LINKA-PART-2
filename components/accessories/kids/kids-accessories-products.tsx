export default function KidsAccessoriesProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-2">Kids Backpacks</h3>
        <p className="text-gray-600">Colorful and fun backpacks for school and play</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-2">Hair Accessories</h3>
        <p className="text-gray-600">Clips, bands, and bows for stylish hair</p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-2">Kids Sunglasses</h3>
        <p className="text-gray-600">UV protection with fun designs</p>
      </div>
    </div>
  );
}
