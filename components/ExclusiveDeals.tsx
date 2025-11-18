import React from "react";
import Image from "next/image";

const ExclusiveDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Air Brake System",
      image: "/Exclusive-Deals/1.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
    },
    {
      id: 2,
      title: "Disc Brake Rotor",
      image: "/Exclusive-Deals/2.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: true,
      discountText: "30% Off",
      buttonStyle: "filled",
    },
    {
      id: 3,
      title: "Turbo Charger",
      image: "/Exclusive-Deals/3.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
    },
    {
      id: 4,
      title: "Alloy Wheel Rim",
      image: "/Exclusive-Deals/4.png",
      rating: 5,
      orderText: "Order Now",
      hasDiscount: false,
      buttonStyle: "outline",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-5xl font-bold text-[#E9292A] mb-4">
            Exclusive Deals Across All Parts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get premium car parts at special prices. Only for our valued
            customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 relative border border-gray-100"
            >
              {/* Discount Badge */}
              {deal.hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                  {deal.discountText}
                </div>
              )}

              {/* Product Image */}
              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 relative">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-contain rounded-xl shadow"
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-brake.png";
                    }}
                  />
                </div>
              </div>

              {/* Product Title */}
              <h3 className="text-2xl font-bold text-red-800 mb-4 text-center">
                {deal.title}
              </h3>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(deal.rating)}
              </div>

              {/* Order Button */}
              <div className="text-center">
                {deal.buttonStyle === "filled" ? (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200 w-full cursor-pointer shadow">
                    {deal.orderText}
                  </button>
                ) : (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-200 w-full cursor-pointer shadow">
                    {deal.orderText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
