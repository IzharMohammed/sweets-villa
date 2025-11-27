"use client";

import { useRouter } from "next/navigation";
import { Package, Heart, Settings, LogOut, ChevronRight } from "lucide-react";

export default function ProfileActions() {
  const router = useRouter();

  const actions = [
    {
      label: "My Orders",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => router.push("/orders"),
    },
    {
      label: "Wishlist",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      onClick: () => {}, // To be implemented
    },
    {
      label: "Settings",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      onClick: () => {}, // To be implemented
    },
    {
      label: "Logout",
      icon: LogOut,
      color: "text-red-600",
      bgColor: "bg-red-50",
      onClick: () => {}, // To be implemented
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Account Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-amber-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${action.bgColor} ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-gray-900">
                {action.label}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
