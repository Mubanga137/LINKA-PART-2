"use client";

import { useRef, useState, useCallback, useEffect } from 'react';

interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  velocity?: number;
}

interface LongPressOptions {
  onLongPress?: (e: TouchEvent | MouseEvent) => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
  delay?: number;
  moveThreshold?: number;
}

interface TapOptions {
  onTap?: (e: TouchEvent | MouseEvent) => void;
  onDoubleTap?: (e: TouchEvent | MouseEvent) => void;
  tapTimeout?: number;
  doubleTapDelay?: number;
}

interface AdvancedGestureOptions extends SwipeGestureOptions, LongPressOptions, TapOptions {
  disabled?: boolean;
  preventDefault?: boolean;
}

export function useAdvancedGestures(options: AdvancedGestureOptions = {}) {
  const {
    // Swipe options
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocity = 0.3,
    
    // Long press options
    onLongPress,
    onLongPressStart,
    onLongPressEnd,
    delay = 500,
    moveThreshold = 10,
    
    // Tap options
    onTap,
    onDoubleTap,
    tapTimeout = 200,
    doubleTapDelay = 300,
    
    // General options
    disabled = false,
    preventDefault = false
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<TouchPoint | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);
  const longPressTriggeredRef = useRef(false);

  // State for gesture feedback
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);

  // Haptic feedback
  const triggerHaptic = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator && navigator.vibrate) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, []);

  // Touch start handler
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    
    if (preventDefault) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    longPressTriggeredRef.current = false;

    // Start long press timer
    if (onLongPress && !longPressTimerRef.current) {
      longPressTimerRef.current = setTimeout(() => {
        setIsLongPressing(true);
        longPressTriggeredRef.current = true;
        triggerHaptic('medium');
        onLongPressStart?.();
        onLongPress(e);
      }, delay);
    }
  }, [disabled, preventDefault, onLongPress, onLongPressStart, delay, triggerHaptic]);

  // Touch move handler
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (disabled || !touchStartRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Cancel long press if moved too much
    if (distance > moveThreshold && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
      setIsLongPressing(false);
    }

    // Visual feedback for swipe direction
    if (Math.abs(deltaX) > threshold * 0.3) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else if (Math.abs(deltaY) > threshold * 0.3) {
      setSwipeDirection(deltaY > 0 ? 'down' : 'up');
    }
  }, [disabled, moveThreshold, threshold]);

  // Touch end handler
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (disabled || !touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocityX = Math.abs(deltaX) / deltaTime;
    const velocityY = Math.abs(deltaY) / deltaTime;

    // Clear timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Reset states
    setIsLongPressing(false);
    setSwipeDirection(null);

    // Handle long press end
    if (longPressTriggeredRef.current) {
      onLongPressEnd?.();
      touchStartRef.current = null;
      return;
    }

    // Check for swipe gestures
    const isHorizontalSwipe = Math.abs(deltaX) > threshold && velocityX > velocity;
    const isVerticalSwipe = Math.abs(deltaY) > threshold && velocityY > velocity;

    if (isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
      triggerHaptic('light');
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else if (isVerticalSwipe && Math.abs(deltaY) > Math.abs(deltaX)) {
      triggerHaptic('light');
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }
    // Handle tap gestures
    else if (distance < moveThreshold && deltaTime < tapTimeout) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;

      if (timeSinceLastTap < doubleTapDelay && onDoubleTap) {
        // Double tap
        if (tapTimerRef.current) {
          clearTimeout(tapTimerRef.current);
          tapTimerRef.current = null;
        }
        triggerHaptic('medium');
        onDoubleTap(e);
      } else if (onTap) {
        // Single tap (with delay to detect double tap)
        if (onDoubleTap) {
          tapTimerRef.current = setTimeout(() => {
            triggerHaptic('light');
            onTap?.(e);
          }, doubleTapDelay);
        } else {
          triggerHaptic('light');
          onTap(e);
        }
      }

      lastTapRef.current = now;
    }

    touchStartRef.current = null;
  }, [
    disabled, threshold, velocity, moveThreshold, tapTimeout, doubleTapDelay,
    onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap,
    onLongPressEnd, triggerHaptic
  ]);

  // Mouse events for desktop
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (disabled) return;

    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };

    // Long press for desktop (right-click alternative)
    if (onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        setIsLongPressing(true);
        longPressTriggeredRef.current = true;
        onLongPressStart?.();
        onLongPress(e);
      }, delay);
    }
  }, [disabled, onLongPress, onLongPressStart, delay]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (disabled || !touchStartRef.current) return;

    const deltaTime = Date.now() - touchStartRef.current.time;
    const deltaX = e.clientX - touchStartRef.current.x;
    const deltaY = e.clientY - touchStartRef.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Clear timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    setIsLongPressing(false);

    // Handle long press end
    if (longPressTriggeredRef.current) {
      onLongPressEnd?.();
      touchStartRef.current = null;
      return;
    }

    // Handle click/tap
    if (distance < moveThreshold && deltaTime < tapTimeout && onTap) {
      onTap(e);
    }

    touchStartRef.current = null;
  }, [disabled, moveThreshold, tapTimeout, onTap, onLongPressEnd]);

  // Setup event listeners
  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    // Touch events (passive for better performance)
    element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefault });
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventDefault });

    // Mouse events for desktop
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    // Prevent context menu on long press for mobile
    const preventContextMenu = (e: Event) => {
      if (isLongPressing) {
        e.preventDefault();
      }
    };
    element.addEventListener('contextmenu', preventContextMenu);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('contextmenu', preventContextMenu);

      // Clear any pending timers
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
    };
  }, [
    disabled, preventDefault, isLongPressing,
    handleTouchStart, handleTouchMove, handleTouchEnd,
    handleMouseDown, handleMouseUp
  ]);

  return {
    ref: elementRef,
    isLongPressing,
    swipeDirection,
    triggerHaptic
  };
}

// Utility hook for card state management
export function useCardState() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSwipeRevealed, setIsSwipeRevealed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const expandCard = useCallback(() => {
    setIsExpanded(true);
    setIsSwipeRevealed(false);
  }, []);

  const collapseCard = useCallback(() => {
    setIsExpanded(false);
    setIsSwipeRevealed(false);
  }, []);

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => !prev);
    setIsSwipeRevealed(false);
  }, []);

  const showSwipeActions = useCallback(() => {
    setIsSwipeRevealed(true);
    setIsExpanded(false);
  }, []);

  const hideSwipeActions = useCallback(() => {
    setIsSwipeRevealed(false);
  }, []);

  const showPreviewModal = useCallback(() => {
    setShowPreview(true);
  }, []);

  const hidePreviewModal = useCallback(() => {
    setShowPreview(false);
  }, []);

  const setLoadingState = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return {
    // States
    isExpanded,
    isSwipeRevealed,
    showPreview,
    isLoading,
    
    // Actions
    expandCard,
    collapseCard,
    toggleExpansion,
    showSwipeActions,
    hideSwipeActions,
    showPreviewModal,
    hidePreviewModal,
    setLoadingState
  };
}
