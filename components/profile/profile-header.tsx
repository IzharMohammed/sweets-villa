import { User } from "lucide-react";

interface ProfileHeaderProps {
  user: any; // Type should be properly defined
  isGuest: boolean;
}

export default function ProfileHeader({ user, isGuest }: ProfileHeaderProps) {
  const initials = user?.name 
    ? user.name.substring(0, 2).toUpperCase() 
    : "G";

  return (
    <div className="relative mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl opacity-10 transform -skew-y-2"></div>
      
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-white/50 relative z-10 flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl font-bold text-amber-700">
              {initials}
            </span>
          </div>
          <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            {user?.name || "Guest User"}
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-3">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isGuest ? "Guest Account" : "Member"}
            </span>
          </div>
          
          {!isGuest && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
              Gold Member
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
