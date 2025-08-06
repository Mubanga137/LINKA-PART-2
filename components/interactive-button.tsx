"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";

interface InteractiveButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  loadingText?: string;
  successText?: string;
  hapticFeedback?: boolean;
  pulseOnSuccess?: boolean;
  children: React.ReactNode;
}

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    className, 
    loading = false, 
    success = false, 
    loadingText = "Loading...", 
    successText = "Success!",
    hapticFeedback = true,
    pulseOnSuccess = true,
    children, 
    onClick,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || props.disabled) return;

      // Haptic feedback for mobile devices
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }

      // Visual press feedback
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);

      // Handle success animation
      if (success && pulseOnSuccess) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }

      if (onClick) {
        onClick(e);
      }
    };

    const buttonVariants = {
      rest: { 
        scale: 1, 
        transition: { duration: 0.2, ease: "easeOut" } 
      },
      hover: { 
        scale: 1.02, 
        transition: { duration: 0.2, ease: "easeOut" } 
      },
      tap: { 
        scale: 0.98, 
        transition: { duration: 0.1, ease: "easeOut" } 
      },
      pressed: {
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeOut" }
      },
      success: {
        scale: [1, 1.05, 1],
        transition: { duration: 0.3, ease: "easeOut" }
      }
    };

    const iconVariants = {
      hidden: { opacity: 0, scale: 0.5, rotate: -180 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      },
      exit: { 
        opacity: 0, 
        scale: 0.5, 
        rotate: 180,
        transition: { duration: 0.2, ease: "easeIn" }
      }
    };

    const getCurrentContent = () => {
      if (loading) {
        return (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="h-4 w-4" />
            </motion.div>
            <span>{loadingText}</span>
          </div>
        );
      }

      if (success && showSuccess) {
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            <span>{successText}</span>
          </motion.div>
        );
      }

      return children;
    };

    return (
      <motion.div
        variants={buttonVariants}
        initial="rest"
        whileHover={!loading && !props.disabled ? "hover" : "rest"}
        whileTap={!loading && !props.disabled ? "tap" : "rest"}
        animate={
          isPressed ? "pressed" : 
          (success && showSuccess && pulseOnSuccess) ? "success" : 
          "rest"
        }
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "focus:ring-2 focus:ring-offset-2 focus:outline-none",
            "active:scale-95 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            loading && "cursor-wait",
            success && showSuccess && "bg-green-500 hover:bg-green-600 border-green-500",
            className
          )}
          onClick={handleClick}
          disabled={loading || props.disabled}
          aria-pressed={isPressed}
          aria-label={loading ? loadingText : props['aria-label']}
          {...props}
        >
          {/* Background ripple effect */}
          <AnimatePresence>
            {isPressed && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 bg-white/20 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            )}
          </AnimatePresence>

          {/* Button content */}
          <motion.div
            key={loading ? "loading" : success && showSuccess ? "success" : "default"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {getCurrentContent()}
          </motion.div>

          {/* Success overlay */}
          <AnimatePresence>
            {success && showSuccess && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 bg-green-500/10 rounded-md"
              />
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";
