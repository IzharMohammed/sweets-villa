import { getOrders } from "@/actions/order";
import Image from "next/image";
import Link from "next/link";
import { Package, Calendar, MapPin, ChevronRight } from "lucide-react";

export default async function Orders() {
  const { data: orders } = await getOrders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">
          Your Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-1 mb-6">
              Start shopping to see your orders here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-amber-100"
              >
                {/* Order Header */}
                <div className="bg-amber-50/50 px-6 py-4 border-b border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        Order Placed
                      </p>
                      <div className="flex items-center gap-2 text-gray-900 font-medium mt-1">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        Total Amount
                      </p>
                      <p className="text-gray-900 font-bold mt-1">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-400 font-mono">
                      #{order.id.slice(-8)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 sm:gap-6"
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={item.product.image[0] || "/placeholder.jpg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        Shipping Address
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {order.shippingAddress.street}, {order.shippingAddress.city}
                        <br />
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.zipCode}
                        <br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}