import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Edit, Trash2, Eye, Plus } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Traditional Chitenge Dress",
    category: "Fashion",
    price: "ZMW 250",
    stock: 15,
    sales: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Copper Wire Elephant",
    category: "Crafts",
    price: "ZMW 180",
    stock: 8,
    sales: 23,
    status: "active",
  },
  {
    id: 3,
    name: "Handwoven Basket Set",
    category: "Home Decor",
    price: "ZMW 145",
    stock: 0,
    sales: 67,
    status: "out_of_stock",
  },
  {
    id: 4,
    name: "Kalimba (Thumb Piano)",
    category: "Instruments",
    price: "ZMW 75",
    stock: 12,
    sales: 34,
    status: "active",
  },
]

export function ProductManagement() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-900">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-emerald-500" />
            Product Management
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Product</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Price</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Sales</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg mr-3"></div>
                      <div className="font-medium text-slate-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{product.category}</td>
                  <td className="py-4 px-4 font-medium text-slate-900">{product.price}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? "bg-emerald-100 text-emerald-700"
                          : product.stock > 0
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{product.sales}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
