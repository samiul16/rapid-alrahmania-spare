"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
}

interface CartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  onContinueShopping?: () => void;
  onProceedToCheckout?: () => void;
  onApplyCoupon?: (code: string) => void;
}

export default function Cart({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  onProceedToCheckout,
  onApplyCoupon,
}: CartProps) {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Mock data for demonstration
  const mockItems: CartItem[] = useMemo(
    () => [
      {
        id: "1",
        name: "Premium Red Blazer",
        description:
          "Elegant formal blazer with tailored fit and premium fabric.",
        price: 450,
        quantity: 1,
        image: "/cart/1.jpg",
        subtotal: 450,
      },
      {
        id: "2",
        name: "Classic Brown Jacket",
        description: "Stylish casual jacket perfect for everyday wear.",
        price: 320,
        quantity: 1,
        image: "/cart/2.jpg",
        subtotal: 320,
      },
      {
        id: "3",
        name: "Denim Shirt",
        description: "Comfortable denim shirt with modern cut and design.",
        price: 180,
        quantity: 1,
        image: "/cart/3.jpg",
        subtotal: 180,
      },
      {
        id: "4",
        name: "Black Leather Jacket",
        description: "Premium leather jacket with contemporary styling.",
        price: 650,
        quantity: 1,
        image: "/cart/4.jpg",
        subtotal: 650,
      },
    ],
    []
  );

  // Initialize cart items on component mount
  useEffect(() => {
    if (!isInitialized) {
      if (items.length > 0) {
        setCartItems(items);
      } else {
        setCartItems(mockItems);
      }
      setIsInitialized(true);
    }
  }, [items, mockItems, isInitialized]);

  const displayItems = cartItems;
  const subtotal = displayItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = 0;
  const totalOrder = subtotal + shippingFee;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    console.log("Quantity change clicked:", id, newQuantity);

    setCartItems((prevItems) => {
      console.log("Previous items:", prevItems);
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            quantity: newQuantity,
            subtotal: item.price * newQuantity,
          };
          console.log("Updated item:", updatedItem);
          return updatedItem;
        }
        return item;
      });
      console.log("All updated items:", updatedItems);
      return updatedItems;
    });

    onUpdateQuantity?.(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    console.log("Remove item clicked:", id);

    setCartItems((prevItems) => {
      console.log("Previous items before remove:", prevItems);
      const updatedItems = prevItems.filter((item) => item.id !== id);
      console.log("Items after remove:", updatedItems);
      return updatedItems;
    });

    onRemoveItem?.(id);
  };

  const handleClearCart = () => {
    console.log("Clear cart clicked");
    setCartItems([]);
    onClearCart?.();
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon?.(couponCode);
    }
  };

  return (
    <div className=" bg-white px-4 my-10">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-sky-100 border-b border-b-sky-200 text-sm font-medium text-gray-700">
                <div className="col-span-5">Items</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Sub Total</div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {displayItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 p-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-5 flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          AED. {item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex items-center justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <span className="text-gray-600">−</span>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          AED. {item.subtotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center cursor-pointer border border-red-300"
                        >
                          <span className="text-sm">×</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={handleClearCart}
                  className="px-6 py-2 border border-sky-400 text-sky-400 rounded-full hover:bg-cyan-50 transition-colors text-sm font-semibold cursor-pointer shadow"
                >
                  Clear shopping Cart
                </button>
                <button
                  onClick={() => {
                    onContinueShopping?.();
                    router.push("/products");
                  }}
                  className="px-6 py-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors text-sm font-medium cursor-pointer shadow"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-sky-50 rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Orders Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-semibold">Subtotal</span>
                  <span className="font-semibold">
                    AED. {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-semibold">
                    Shipping fee
                  </span>
                  <span className="font-semibold">
                    AED. {shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total Order</span>
                    <span>AED. {totalOrder.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent rounded-full bg-sky-50/70"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors text-sm font-medium cursor-pointer shadow"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => {
                    onProceedToCheckout?.();
                    router.push("/checkout");
                  }}
                  className="w-full mt-6 px-6 py-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors font-medium cursor-pointer shadow"
                >
                  PROCESS TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
