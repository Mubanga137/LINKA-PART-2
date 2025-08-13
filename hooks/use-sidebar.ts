'use client';

import { useState, useEffect } from 'react';

interface UseSidebarOptions {
  defaultCollapsed?: boolean;
  breakpoint?: number;
}

export function useSidebar({ 
  defaultCollapsed = false, 
  breakpoint = 1024 
}: UseSidebarOptions = {}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobile(mobile);
      
      // Auto-close mobile sidebar when switching to desktop
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Listen for window resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [breakpoint, isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle sidebar with Ctrl/Cmd + B
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        if (isMobile) {
          setIsOpen(!isOpen);
        } else {
          setIsCollapsed(!isCollapsed);
        }
      }
      
      // Close mobile sidebar with Escape
      if (event.key === 'Escape' && isMobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, isOpen, isCollapsed]);

  // Persist collapsed state in localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed !== null && !isMobile) {
      setIsCollapsed(JSON.parse(savedCollapsed));
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed, isMobile]);

  const toggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const open = () => {
    if (isMobile) {
      setIsOpen(true);
    } else {
      setIsCollapsed(false);
    }
  };

  const close = () => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsCollapsed(true);
    }
  };

  const getSidebarWidth = () => {
    if (isMobile) {
      return isOpen ? '320px' : '0px';
    }
    return isCollapsed ? '80px' : '280px';
  };

  const getMainContentMargin = () => {
    if (isMobile) {
      return '0px';
    }
    return isCollapsed ? '80px' : '280px';
  };

  return {
    isMobile,
    isCollapsed,
    isOpen,
    toggle,
    open,
    close,
    setIsCollapsed,
    setIsOpen,
    getSidebarWidth,
    getMainContentMargin,
  };
}
