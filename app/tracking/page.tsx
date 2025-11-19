"use client";

import { memo, useState } from "react";
import {
  FaBox,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaCalendarAlt,
  FaCreditCard,
  FaCog,
  FaShippingFast,
} from "react-icons/fa";

// Dummy data for car parts orders
const dummyOrders = [
  {
    id: 1,
    bill_number: "CAR-2024-001",
    status: "Order Received",
    status_ar: "تم استلام الطلب",
    total_amount: 850,
    created_at: "2024-11-01T10:30:00",
    delivery_address: "123 Auto Street, New York, NY 10001",
    customer_name: "John Doe",
    order_items: [
      {
        id: 1,
        name: "Brake Pads Set",
        name_ar: "طقم فرامل",
        quantity: 1,
        price: 450,
      },
      {
        id: 2,
        name: "Oil Filter",
        name_ar: "فلتر زيت",
        quantity: 2,
        price: 400,
      },
    ],
  },
  {
    id: 2,
    bill_number: "CAR-2024-002",
    status: "Accepted",
    status_ar: "قيد المعالجة",
    total_amount: 1200,
    created_at: "2024-11-02T14:15:00",
    delivery_address: "456 Motor Avenue, Los Angeles, CA 90001",
    customer_name: "Jane Smith",
    order_items: [
      {
        id: 3,
        name: "Headlight Assembly",
        name_ar: "مجموعة المصابيح الأمامية",
        quantity: 1,
        price: 800,
      },
      {
        id: 4,
        name: "Air Filter",
        name_ar: "فلتر هواء",
        quantity: 1,
        price: 400,
      },
    ],
  },
  {
    id: 3,
    bill_number: "CAR-2024-003",
    status: "Completed",
    status_ar: "اكتمل",
    total_amount: 650,
    created_at: "2024-10-28T09:45:00",
    delivery_address: "789 Garage Boulevard, Miami, FL 33101",
    customer_name: "Mike Johnson",
    order_items: [
      {
        id: 5,
        name: "Spark Plugs Set",
        name_ar: "طقم شمعات الإشعال",
        quantity: 1,
        price: 350,
      },
      {
        id: 6,
        name: "Wiper Blades",
        name_ar: "ممسحات الزجاج",
        quantity: 2,
        price: 300,
      },
    ],
  },
  {
    id: 4,
    bill_number: "CAR-2024-004",
    status: "Delivered",
    status_ar: "تم التوصيل",
    total_amount: 950,
    created_at: "2024-10-25T16:20:00",
    delivery_address: "321 Service Lane, Chicago, IL 60601",
    customer_name: "Sarah Williams",
    order_items: [
      {
        id: 7,
        name: "Battery",
        name_ar: "بطارية",
        quantity: 1,
        price: 750,
      },
      {
        id: 8,
        name: "Coolant",
        name_ar: "سائل التبريد",
        quantity: 1,
        price: 200,
      },
    ],
  },
];

const steps = [
  {
    id: 1,
    name: "Order Received",
    name_ar: "تم استلام الطلب",
    description: "Your order has been received",
    description_ar: "تم استلام طلبك",
    icon: FaBox,
  },
  {
    id: 2,
    name: "Accepted",
    name_ar: "قيد المعالجة",
    description: "Parts preparation in progress",
    description_ar: "جاري تحضير القطع",
    icon: FaCog,
  },
  {
    id: 3,
    name: "Completed",
    name_ar: "اكتمل",
    description: "Ready for shipping",
    description_ar: "جاهز للشحن",
    icon: FaShippingFast,
  },
  {
    id: 4,
    name: "Delivered",
    name_ar: "تم التوصيل",
    description: "Order has been delivered",
    description_ar: "تم توصيل الطلب",
    icon: FaCheckCircle,
  },
];

const statusOrder = ["Order Received", "Accepted", "Completed", "Delivered"];

const getOrderStatus = (value: string) => {
  const orderStatus: Record<string, string> = {
    "Order Received": "bg-[#E9292A] w-1/4",
    "تم استلام الطلب": "bg-[#E9292A] w-1/4",
    Accepted: "bg-[#E9292A] w-2/4",
    "تم القبول": "bg-[#E9292A] w-2/4",
    Completed: "bg-[#E9292A] w-3/4",
    اكتمل: "bg-[#E9292A] w-3/4",
    Delivered: "bg-[#E9292A] w-full",
    "تم التوصيل": "bg-[#E9292A] w-full",
  };
  return orderStatus[value] || "bg-gray-200";
};

const getOrderStatusForIcon = (currentStatus: string, stepName: string) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepName);
  return stepIndex <= currentIndex ? "bg-[#E9292A]" : "bg-gray-200";
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    "Order Received": "bg-yellow-100 text-yellow-800",
    Accepted: "bg-blue-100 text-blue-800",
    Completed: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getOrderProgress = (status: string) => {
  const progress: Record<string, number> = {
    "order received": 25,
    accepted: 50,
    completed: 75,
    delivered: 100,
  };

  const normalizedStatus = status.toLowerCase();
  return progress[normalizedStatus] || 0;
};

interface Order {
  id: number;
  bill_number: string;
  status: string;
  status_ar: string;
  total_amount: number;
  created_at: string;
  delivery_address: string;
  customer_name: string;
  order_items: Array<{
    id: number;
    name: string;
    name_ar: string;
    quantity: number;
    price: number;
  }>;
}

const CarPartsOrderTracking = () => {
  const [orderInfo] = useState<Order[]>(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = "en"; // Change to "ar" for Arabic
  const lang = locale === "en" ? "en" : "ar";
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 mt-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="bg-[#E9292A] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2"> Order Tracking</h1>
          <p className="text-red-100">Track your car parts orders</p>
        </div>
      </div>

      <div className="container mx-auto my-10 p-4">
        <div className="bg-white rounded-lg mb-10 min-h-screen shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {orderInfo?.map((order) => {
                  const { id, status, total_amount, created_at, bill_number } =
                    order || {};
                  const progress = getOrderProgress(status);

                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleOrderClick(order)}
                    >
                      <td className="px-6 py-4 font-medium text-[#E9292A]">
                        {bill_number}
                      </td>
                      <td className="px-6 py-4">
                        {created_at ? formatDate(created_at) : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            status
                          )}`}
                        >
                          {lang === "ar" ? order.status_ar : status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${total_amount}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#E9292A] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {progress}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-[#E9292A] hover:text-red-700 flex items-center gap-1 justify-center mx-auto whitespace-nowrap cursor-pointer transition-colors">
                          <FaEye className="h-4 w-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-9999">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-red-50">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Order Details
                </h2>
                <button
                  onClick={closeModal}
                  className="hover:bg-red-100 p-2 rounded-full transition-colors"
                >
                  <FaTimes className="h-6 w-6 text-[#E9292A] cursor-pointer" />
                </button>
              </div>

              <div className="p-6">
                {/* Order Info */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaBox className="h-5 w-5 text-[#E9292A]" />
                      <span className="font-medium">Order ID:</span>
                      <span className="text-[#E9292A] font-semibold">
                        {selectedOrder.bill_number}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="h-5 w-5 text-[#E9292A]" />
                      <span className="font-medium">Order Date:</span>
                      <span>
                        {selectedOrder.created_at
                          ? formatDate(selectedOrder.created_at)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="h-5 w-5 text-[#E9292A]" />
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold">
                        ${selectedOrder.total_amount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="overflow-hidden rounded-full bg-gray-200 mb-4">
                    <div
                      className={`h-3 ${getOrderStatus(
                        selectedOrder.status
                      )} rounded-full transition-all`}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {steps.map((step) => (
                      <div key={step.id} className="text-center">
                        <div
                          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full transition-all ${getOrderStatusForIcon(
                            selectedOrder.status,
                            step.name
                          )}`}
                        >
                          <step.icon
                            className={`h-6 w-6 ${
                              getOrderStatusForIcon(
                                selectedOrder.status,
                                step.name
                              ) === "bg-[#E9292A]"
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          {lang === "ar" ? step.name_ar : step.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lang === "ar"
                            ? step.description_ar
                            : step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Items
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedOrder.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {lang === "ar" ? item.name_ar : item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-[#E9292A]">
                      <p className="text-lg font-semibold text-gray-900">
                        Total Amount
                      </p>
                      <p className="text-xl font-bold text-[#E9292A]">
                        ${selectedOrder.total_amount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Address
                  </h3>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-1">
                      {selectedOrder.customer_name}
                    </p>
                    <p className="text-gray-600">
                      {selectedOrder.delivery_address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CarPartsOrderTracking);
