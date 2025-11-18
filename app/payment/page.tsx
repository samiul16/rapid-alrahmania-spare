"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/Common/CommonHeader";
import PaymentComponent from "@/components/payment/payment";

export default function Page() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleSaveChanges = (data: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log("Saving profile changes:", data);
    // Add your save logic here
  };

  const handleCancel = () => {
    console.log("Profile edit cancelled");
    // Add your cancel logic here
  };

  return (
    <div>
      <div data-aos="fade-up">
        <CommonHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Payment", isActive: true },
          ]}
        />
      </div>
      <div data-aos="fade-up">
        <PaymentComponent />{" "}
      </div>
    </div>
  );
}
