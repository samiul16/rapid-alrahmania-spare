import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  name: string;
  arabic_name?: string;
  price: number;
  final_price?: number;
  offer_price?: string;
  image_url: string;
  currency?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  cartId: string;
  addedAt: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
};

const CART_STORAGE_KEY = "shopping_cart";

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.final_price || item.product.price;
    return sum + price * item.quantity;
  }, 0);
  return { totalItems, totalPrice };
};

// Load initial state from localStorage (only on client side)
const loadCartFromStorage = (): CartItem[] => {
  // Check if we're on the client side
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Helper function to save to localStorage (only on client side)
const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const initialItems = loadCartFromStorage();
const { totalItems, totalPrice } = calculateTotals(initialItems);

const initialState: CartState = {
  items: initialItems,
  totalItems,
  totalPrice,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        items: Product;
        quantity: number;
        cartId: string;
      }>
    ) => {
      const { items: product, quantity, cartId } = action.payload;

      // Check if item already exists
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          product,
          quantity,
          cartId,
          addedAt: Date.now(),
        });
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.cartId !== action.payload
      );

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      // Save to localStorage
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ cartId: string; quantity: number }>
    ) => {
      const { cartId, quantity } = action.payload;
      const item = state.items.find((item) => item.cartId === cartId);

      if (item) {
        item.quantity = quantity;

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;

        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // Clear localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
          console.error("Error clearing localStorage:", error);
        }
      }
    },

    // Load cart from localStorage (useful for hydration)
    loadCart: (state) => {
      const items = loadCartFromStorage();
      state.items = items;
      const totals = calculateTotals(items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    // Open cart
    openCart: (state) => {
      state.isOpen = true;
    },

    // Close cart
    closeCart: (state) => {
      state.isOpen = false;
    },

    // Toggle cart
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCart,
  openCart,
  closeCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
