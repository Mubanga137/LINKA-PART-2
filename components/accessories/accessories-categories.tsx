export default function AccessoriesCategories() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-8 rounded-lg mb-4">
              <h3 className="text-xl font-semibold">Men's Accessories</h3>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-pink-100 p-8 rounded-lg mb-4">
              <h3 className="text-xl font-semibold">Women's Accessories</h3>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-8 rounded-lg mb-4">
              <h3 className="text-xl font-semibold">Kids Accessories</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
