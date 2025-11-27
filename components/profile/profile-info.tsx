import { Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";

interface ProfileInfoProps {
  user: any;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Email Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-100 transition-colors group">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Email Address</p>
            <p className="text-gray-800 font-semibold break-all">
              {user?.email || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Phone Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-100 transition-colors group">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Phone Number</p>
            <p className="text-gray-800 font-semibold">
              {user?.phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${user?.phoneNumberVerified ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
              {user?.phoneNumberVerified ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <span className="font-medium text-gray-700">Verification Status</span>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            user?.phoneNumberVerified 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {user?.phoneNumberVerified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}
