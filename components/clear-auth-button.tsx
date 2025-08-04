'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function ClearAuthButton() {
  const clearAllAuth = () => {
    // Clear all authentication data
    localStorage.removeItem('linka_user');
    localStorage.removeItem('retailer_token');
    
    // Reload the page to reset all contexts
    window.location.reload();
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button 
        onClick={clearAllAuth}
        variant="destructive"
        size="sm"
        className="shadow-lg"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear Auth & Reload
      </Button>
    </div>
  );
}
