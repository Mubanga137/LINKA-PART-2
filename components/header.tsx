import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LinkIcon, ShoppingCart, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <LinkIcon className="h-9 w-9 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-xl group-hover:bg-indigo-700/30 transition-all"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Linka
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
            >
              Shop
              <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2 flex items-center">
                Categories
                <ChevronDown className="h-4 w-4 ml-1" />
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/categories/jewelry-accessories">Jewelry & Accessories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/art-culture">Art & Culture</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/tools-hardware">Tools & Hardware</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/agriculture-natural">Agriculture & Natural</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/food-beverages">Food & Beverages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/fashion-textiles">Fashion & Textiles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/categories/traditional-crafts">Traditional Crafts</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {["About", "For Retailers", "Contact", "Industries"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group py-2"
              >
                {item}
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all">
              Sell on Linka
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
