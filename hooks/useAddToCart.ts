import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import toastAlert from "@/utils/toastConfig";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart as clearCartAction,
  loadCart,
  Product as ReduxProduct,
  CartItem,
  openCart,
} from "@/redux/hooks/cart/cartSlice";

// Re-export Product type so it can be used in components
export type Product = ReduxProduct;

const CART_STORAGE_KEY = "shopping_cart";

export function useAddToCart() {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  const toastId = useRef<string | number | null>(null);

  // Get cart from localStorage
  const getCartFromStorage = (): CartItem[] => {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  };

  // Save cart to localStorage
  const saveCartToStorage = (cart: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
      toastAlert("error", "Failed to save cart", "top-right");
    }
  };

  // Add item to cart
  async function addToCartGlobal(
    product: Product,
    id: number,
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) {
    try {
      // Generate unique cart ID
      const cartId = `cart_${Date.now()}_${id}`;

      // Dispatch to Redux (which also handles localStorage)
      dispatch(
        addToCart({
          items: product,
          quantity,
          cartId,
        })
      );

      saveCartToStorage(cartState.items);

      dispatch(openCart());

      // Show success toast
      toastAlert("success", "Item added to cart", "top-right", toastId, {
        autoClose: 2000,
      });

      // Reset quantity
      setQuantity(1);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toastAlert("error", "Failed to add item to cart", "top-right", toastId, {
        autoClose: 4000,
      });
    }
  }

  // Remove item from cart
  const removeFromCartGlobal = (cartId: string) => {
    try {
      dispatch(removeFromCart(cartId));
      saveCartToStorage(cartState.items);
      toastAlert("success", "Item removed from cart", "top-right", toastId, {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toastAlert("error", "Failed to remove item", "top-right", toastId, {
        autoClose: 4000,
      });
    }
  };

  // Update item quantity
  const updateQuantityGlobal = (cartId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        removeFromCartGlobal(cartId);
        return;
      }

      dispatch(updateQuantity({ cartId, quantity: newQuantity }));
      saveCartToStorage(cartState.items);
      toastAlert("success", "Quantity updated", "top-right", toastId, {
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toastAlert("error", "Failed to update quantity", "top-right", toastId, {
        autoClose: 4000,
      });
    }
  };

  // Clear entire cart
  const clearCartGlobal = () => {
    try {
      dispatch(clearCartAction());
      saveCartToStorage([]);
      toastAlert("success", "Cart cleared", "top-right", toastId, {
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toastAlert("error", "Failed to clear cart", "top-right", toastId, {
        autoClose: 4000,
      });
    }
  };

  // Load cart from localStorage (useful for hydration)
  const loadCartFromStorage = () => {
    try {
      dispatch(loadCart());
      loadCartFromStorage();
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Get cart count
  const getCartCount = (): number => {
    return cartState.totalItems;
  };

  // Get total price
  const getTotalPrice = (): number => {
    return cartState.totalPrice;
  };

  // Check if item is in cart
  const isInCart = (productId: number): boolean => {
    return cartState.items.some((item) => item.product.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId: number): number => {
    const item = cartState.items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return {
    // Main functions
    addToCartGlobal,
    removeFromCartGlobal,
    updateQuantityGlobal,
    clearCartGlobal,
    loadCartFromStorage,

    // Helper functions
    getCartFromStorage,
    getCartCount,
    getTotalPrice,
    isInCart,
    getItemQuantity,

    // Cart state
    cartItems: cartState.items,
    totalItems: cartState.totalItems,
    totalPrice: cartState.totalPrice,
  };
}
