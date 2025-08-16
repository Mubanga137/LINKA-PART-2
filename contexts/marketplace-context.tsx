"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Product, CartItem } from '@/lib/types';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '@/lib/marketplace-utils';

interface MarketplaceState {
  cart: CartItem[];
  favorites: string[];
  recentlyViewed: string[];
  searchHistory: string[];
}

interface MarketplaceContextType extends MarketplaceState {
  addToCart: (product: Product, quantity?: number, variantId?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  addToSearchHistory: (query: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

type MarketplaceAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; variantId?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { itemId: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: { productId: string } }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: { productId: string } }
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
      const { product, quantity, variantId } = action.payload;
      const variant = variantId ? product.variants?.find(v => v.id === variantId) : undefined;
      const existingItem = state.cart.find(item =>
        item.productId === product.id && item.variantId === variantId
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          variantId,
          variant,
          quantity,
          addedAt: new Date()
        }]
      };
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.itemId)
      };
    }
    
    case 'UPDATE_CART_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== itemId)
        };
      }

      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === itemId
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
      const { productId } = action.payload;
      const isFavorite = state.favorites.includes(productId);

      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      };
    }
    
    case 'ADD_TO_RECENTLY_VIEWED': {
      const { productId } = action.payload;
      const filtered = state.recentlyViewed.filter(id => id !== productId);

      return {
        ...state,
        recentlyViewed: [productId, ...filtered].slice(0, 10) // Keep last 10
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
    try {
      if (typeof window === 'undefined') return

      const persistedState = {
        cart: loadFromLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []),
        favorites: loadFromLocalStorage<string[]>(STORAGE_KEYS.FAVORITES, []),
        recentlyViewed: [],
        searchHistory: loadFromLocalStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES, [])
      };

      dispatch({ type: 'LOAD_PERSISTED_STATE', payload: persistedState });
    } catch (error) {
      console.warn('Error loading persisted marketplace state:', error)
    }
  }, []);

  // Persist state changes with error handling
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      saveToLocalStorage(STORAGE_KEYS.CART, state.cart);
    } catch (error) {
      console.warn('Error saving cart to localStorage:', error)
    }
  }, [state.cart]);

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      saveToLocalStorage(STORAGE_KEYS.FAVORITES, state.favorites);
    } catch (error) {
      console.warn('Error saving favorites to localStorage:', error)
    }
  }, [state.favorites]);

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      saveToLocalStorage(STORAGE_KEYS.RECENT_SEARCHES, state.searchHistory);
    } catch (error) {
      console.warn('Error saving search history to localStorage:', error)
    }
  }, [state.searchHistory]);

  const addToCart = (product: Product, quantity: number = 1, variantId?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, variantId } });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId } });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleFavorite = (productId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { productId } });
  };

  const addToRecentlyViewed = (productId: string) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: { productId } });
  };

  const addToSearchHistory = (query: string) => {
    if (query.trim()) {
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: { query: query.trim() } });
    }
  };

  const getCartTotal = (): number => {
    return state.cart.reduce((total, item) => {
      const price = item.variant?.price || item.product.price;
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

  const getItemQuantity = (productId: string): number => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getItemQuantity
  };
}

export function useFavorites() {
  const { favorites, toggleFavorite } = useMarketplace();
  return {
    favorites,
    toggleFavorite,
    isFavorite: (productId: string) => favorites.includes(productId)
  };
}
