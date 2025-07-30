"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Vendor, CartItem } from '@/lib/types';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '@/lib/marketplace-utils';

interface MarketplaceState {
  cart: CartItem[];
  favorites: string[];
  recentlyViewed: string[];
  searchHistory: string[];
}

interface MarketplaceContextType extends MarketplaceState {
  addToCart: (vendor: Vendor, quantity?: number) => void;
  removeFromCart: (vendorId: string) => void;
  updateCartQuantity: (vendorId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (vendorId: string) => void;
  addToRecentlyViewed: (vendorId: string) => void;
  addToSearchHistory: (query: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

type MarketplaceAction =
  | { type: 'ADD_TO_CART'; payload: { vendor: Vendor; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { vendorId: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { vendorId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: { vendorId: string } }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: { vendorId: string } }
  | { type: 'ADD_TO_SEARCH_HISTORY'; payload: { query: string } }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<MarketplaceState> };

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const initialState: MarketplaceState = {
  cart: [],
  favorites: [],
  recentlyViewed: [],
  searchHistory: []
};

function marketplaceReducer(state: MarketplaceState, action: MarketplaceAction): MarketplaceState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { vendor, quantity } = action.payload;
      const existingItem = state.cart.find(item => item.vendorId === vendor.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.vendorId === vendor.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, {
          vendorId: vendor.id,
          vendor,
          quantity,
          addedAt: new Date()
        }]
      };
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.vendorId !== action.payload.vendorId)
      };
    }
    
    case 'UPDATE_CART_QUANTITY': {
      const { vendorId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.vendorId !== vendorId)
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.vendorId === vendorId
            ? { ...item, quantity }
            : item
        )
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: []
      };
    }
    
    case 'TOGGLE_FAVORITE': {
      const { vendorId } = action.payload;
      const isFavorite = state.favorites.includes(vendorId);
      
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== vendorId)
          : [...state.favorites, vendorId]
      };
    }
    
    case 'ADD_TO_RECENTLY_VIEWED': {
      const { vendorId } = action.payload;
      const filtered = state.recentlyViewed.filter(id => id !== vendorId);
      
      return {
        ...state,
        recentlyViewed: [vendorId, ...filtered].slice(0, 10) // Keep last 10
      };
    }
    
    case 'ADD_TO_SEARCH_HISTORY': {
      const { query } = action.payload;
      const filtered = state.searchHistory.filter(q => q !== query);
      
      return {
        ...state,
        searchHistory: [query, ...filtered].slice(0, 10) // Keep last 10
      };
    }
    
    case 'LOAD_PERSISTED_STATE': {
      return {
        ...state,
        ...action.payload
      };
    }
    
    default:
      return state;
  }
}

interface MarketplaceProviderProps {
  children: ReactNode;
}

export function MarketplaceProvider({ children }: MarketplaceProviderProps) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const persistedState = {
      cart: loadFromLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []),
      favorites: loadFromLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, []),
      recentlyViewed: [],
      searchHistory: loadFromLocalStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES, [])
    };
    
    dispatch({ type: 'LOAD_PERSISTED_STATE', payload: persistedState });
  }, []);

  // Persist state changes
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.CART, state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.FAVORITES, state.favorites);
  }, [state.favorites]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.RECENT_SEARCHES, state.searchHistory);
  }, [state.searchHistory]);

  const addToCart = (vendor: Vendor, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { vendor, quantity } });
  };

  const removeFromCart = (vendorId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { vendorId } });
  };

  const updateCartQuantity = (vendorId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { vendorId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleFavorite = (vendorId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { vendorId } });
  };

  const addToRecentlyViewed = (vendorId: string) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: { vendorId } });
  };

  const addToSearchHistory = (query: string) => {
    if (query.trim()) {
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: { query: query.trim() } });
    }
  };

  const getCartTotal = (): number => {
    return state.cart.reduce((total, item) => {
      const price = parseFloat(item.vendor.pricePreview?.replace(/[^0-9.]/g, '') || '0');
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = (): number => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue: MarketplaceContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavorite,
    addToRecentlyViewed,
    addToSearchHistory,
    getCartTotal,
    getCartItemCount
  };

  return (
    <MarketplaceContext.Provider value={contextValue}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace(): MarketplaceContextType {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

// Custom hooks for specific functionality
export function useCart() {
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart, getCartTotal, getCartItemCount } = useMarketplace();
  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };
}

export function useFavorites() {
  const { favorites, toggleFavorite } = useMarketplace();
  return {
    favorites,
    toggleFavorite,
    isFavorite: (vendorId: string) => favorites.includes(vendorId)
  };
}
