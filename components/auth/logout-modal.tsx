'use client';

import { AlertTriangle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function LogoutModal({ isOpen, onClose, onConfirm, userName }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-red-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
                <p className="text-sm text-gray-600">Confirm your logout</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <p className="text-gray-600 mb-2">
              Are you sure you want to sign out{userName ? `, ${userName}` : ''}?
            </p>
            <p className="text-sm text-gray-500">
              You'll be redirected to the homepage and will need to log in again to access your dashboard.
            </p>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
