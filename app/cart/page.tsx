"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Cart from "@/components/cart/Cart";
import CommonHeader from "@/components/Common/CommonHeader";
import RecentView from "@/components/cart/RecentView";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  subtotal: number;
}

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleContinueShopping = () => {
    // Navigate to products page or close cart
    console.log("Continue shopping");
  };

  const handleProceedToCheckout = () => {
    // Navigate to checkout page
    console.log("Proceed to checkout");
  };

  const handleApplyCoupon = (code: string) => {
    // Apply coupon logic
    console.log("Apply coupon:", code);
  };

  return (
    <div>
      <CommonHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", isActive: true },
        ]}
      />
      <div data-aos="fade-up">
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onContinueShopping={handleContinueShopping}
          onProceedToCheckout={handleProceedToCheckout}
          onApplyCoupon={handleApplyCoupon}
        />
      </div>
      <div data-aos="fade-up">
        <RecentView />
      </div>
    </div>
  );
}
