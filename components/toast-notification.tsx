"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, ShoppingCart, Heart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning" | "cart" | "wishlist" | "order";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    const newToast: Toast = {
      id,
      duration: 4000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ 
  toasts, 
  removeToast 
}: { 
  toasts: Toast[]; 
  removeToast: (id: string) => void; 
}) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ 
  toast, 
  onRemove 
}: { 
  toast: Toast; 
  onRemove: () => void; 
}) {
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          titleColor: "text-green-900",
          descColor: "text-green-700"
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          icon: AlertCircle,
          iconColor: "text-red-600",
          titleColor: "text-red-900",
          descColor: "text-red-700"
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: AlertTriangle,
          iconColor: "text-yellow-600",
          titleColor: "text-yellow-900",
          descColor: "text-yellow-700"
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: Info,
          iconColor: "text-blue-600",
          titleColor: "text-blue-900",
          descColor: "text-blue-700"
        };
      case "cart":
        return {
          bg: "bg-indigo-50 border-indigo-200",
          icon: ShoppingCart,
          iconColor: "text-indigo-600",
          titleColor: "text-indigo-900",
          descColor: "text-indigo-700"
        };
      case "wishlist":
        return {
          bg: "bg-pink-50 border-pink-200",
          icon: Heart,
          iconColor: "text-pink-600",
          titleColor: "text-pink-900",
          descColor: "text-pink-700"
        };
      case "order":
        return {
          bg: "bg-purple-50 border-purple-200",
          icon: Package,
          iconColor: "text-purple-600",
          titleColor: "text-purple-900",
          descColor: "text-purple-700"
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          icon: Info,
          iconColor: "text-gray-600",
          titleColor: "text-gray-900",
          descColor: "text-gray-700"
        };
    }
  };

  const styles = getToastStyles(toast.type);
  const IconComponent = styles.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.8
      }}
      className={cn(
        "pointer-events-auto relative rounded-xl border p-4 shadow-lg backdrop-blur-sm",
        styles.bg
      )}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 600, damping: 25 }}
        >
          <IconComponent className={cn("h-5 w-5 flex-shrink-0", styles.iconColor)} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className={cn("font-semibold text-sm", styles.titleColor)}
          >
            {toast.title}
          </motion.p>
          
          {toast.description && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={cn("text-xs mt-1", styles.descColor)}
            >
              {toast.description}
            </motion.p>
          )}
          
          {toast.action && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={toast.action.onClick}
              className={cn(
                "text-xs font-medium mt-2 underline hover:no-underline transition-all",
                styles.titleColor
              )}
            >
              {toast.action.label}
            </motion.button>
          )}
        </div>
        
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRemove}
          className={cn(
            "flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors",
            styles.iconColor
          )}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: (toast.duration || 4000) / 1000, ease: "linear" }}
        className={cn(
          "absolute bottom-0 left-0 h-1 rounded-b-xl origin-left",
          styles.iconColor.replace("text-", "bg-").replace("600", "400")
        )}
        style={{ width: "100%" }}
      />
    </motion.div>
  );
}

// Convenience hooks for common toast types
export function useCartToast() {
  const { showToast } = useToast();
  
  return {
    addToCart: (itemName: string) => {
      showToast({
        type: "cart",
        title: "Added to Cart",
        description: `${itemName} has been added to your cart`,
        action: {
          label: "View Cart",
          onClick: () => window.location.href = "/cart"
        }
      });
    },
    removeFromCart: (itemName: string) => {
      showToast({
        type: "info",
        title: "Removed from Cart",
        description: `${itemName} has been removed from your cart`
      });
    }
  };
}

export function useWishlistToast() {
  const { showToast } = useToast();
  
  return {
    addToWishlist: (itemName: string) => {
      showToast({
        type: "wishlist",
        title: "Added to Wishlist",
        description: `${itemName} has been saved to your wishlist`,
        action: {
          label: "View Wishlist",
          onClick: () => window.location.href = "/wishlist"
        }
      });
    },
    removeFromWishlist: (itemName: string) => {
      showToast({
        type: "info",
        title: "Removed from Wishlist",
        description: `${itemName} has been removed from your wishlist`
      });
    }
  };
}
