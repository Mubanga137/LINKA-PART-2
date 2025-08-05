import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, ArrowLeft, Search, Home } from "lucide-react";

export default function VendorNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Store className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Store Not Found
            </h1>
            <p className="text-gray-600">
              The vendor store you're looking for doesn't exist or may have been removed.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <p>This might have happened because:</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>• The store URL was mistyped</li>
                <li>• The vendor has closed their store</li>
                <li>• The store has been temporarily suspended</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                asChild 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/marketplace">
                  <Search className="h-4 w-4 mr-2" />
                  Browse All Stores
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                asChild 
                className="flex-1"
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
            </div>

            <Button 
              variant="ghost" 
              asChild 
              className="w-full"
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
