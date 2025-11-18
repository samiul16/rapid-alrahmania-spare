"use client";

import React, { useEffect, useRef } from "react";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/hooks/cart/cartSlice";

interface ShoppingCartProps {
  onCheckout?: () => void;
  className?: string;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  onCheckout,
  className = "",
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice, isOpen } = useAppSelector(
    (state) => state.cart
  );
  const cartRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    dispatch(closeCart());
  };

  // Handle escape key only
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClose, isOpen]);

  const handleUpdateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(cartId));
    } else {
      dispatch(updateQuantity({ cartId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (cartId: string) => {
    dispatch(removeFromCart(cartId));
  };

  const handleCheckout = () => {
    onCheckout?.();
    handleClose();
    router.push("/checkout");
  };

  const handleLinkClick = () => {
    handleClose();
  };

  // Convert CartItem[] to match the component's expected format
  const cartItems = items.map((item) => ({
    id: item.cartId,
    name: item.product.name,
    price: item.product.final_price || item.product.price,
    quantity: item.quantity,
    image: item.product.image_url,
  }));

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - NO CLICK HANDLER */}
      <div className="fixed inset-0 bg-black/20 z-[9998]" />

      {/* Shopping Cart Sidebar */}
      <div
        ref={cartRef}
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl border-l border-gray-200 z-[9999] transform transition-all duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${className}`}
        style={{
          boxShadow:
            "-10px 0 25px -5px rgba(0, 0, 0, 0.1), -5px 0 10px -5px rgba(0, 0, 0, 0.04)",
          height: "100vh",
          position: "fixed",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Shopping Cart ({totalItems})
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sky-200 transition-colors cursor-pointer"
            aria-label="Close shopping cart"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h4>
            <p className="text-gray-600 mb-6">
              Add some products to get started!
            </p>
            <Link
              href="/products"
              onClick={handleLinkClick}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </h4>
                    <p className="font-semibold text-cyan-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-500 group-hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1 border border-gray-200 rounded-full">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-gray-500" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-500">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">
                  Subtotal:
                </span>
                <span className="text-xl font-bold text-sky-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-300 to-sky-500 text-white rounded-full hover:from-cyan-400 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 font-semibold cursor-pointer"
                >
                  Checkout
                </button>

                <Link
                  href="/cart"
                  onClick={handleLinkClick}
                  className="w-full px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors font-semibold text-center block"
                >
                  View Full Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShoppingCartComponent;
