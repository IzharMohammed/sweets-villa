import { cookieManager } from "@/utils/authTools";

export default async function Profile() {
  const userDetails = await cookieManager.getAuthUser();
  console.log("userDetails", userDetails);
  const guestToken = await cookieManager.getGuestToken();
  console.log(guestToken);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-pink-50">
      {/* Decorative Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-4 text-4xl">🍬</div>
          <div className="absolute bottom-2 right-4 text-4xl">🍭</div>
          <div className="absolute top-1/2 left-1/2 text-4xl">🍰</div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg mb-2">
            My Account
          </h1>
          <p className="text-white text-opacity-90 text-sm sm:text-base">
            Welcome to your sweet shop profile
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Customer Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-amber-200 mb-8">
          {/* Profile Header with Background */}
          <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-pink-200 h-32 sm:h-40 relative">
            <div className="absolute inset-0 opacity-20 text-6xl flex items-center justify-center">
              🍫
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 sm:px-8 pb-8">
            {/* Avatar and Name */}
            <div className="flex flex-col sm:flex-row items-center gap-6 -mt-16 mb-8 relative z-10">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-6xl">🍪</span>
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-1">
                  Sweet Customer
                </h2>
                <p className="text-amber-700 text-sm sm:text-base font-medium">
                  Member ID: {userDetails?.id}
                </p>
                <p className="text-amber-700 text-sm sm:text-base font-medium">
                  {guestToken ? "Guest user" : "Auth user"}
                </p>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Email Card */}
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl p-6 border-2 border-pink-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-pink-300 flex items-center justify-center text-xl">
                    📧
                  </div>
                  <h3 className="text-pink-900 font-bold text-lg">Email</h3>
                </div>
                <p className="text-pink-800 font-semibold break-all text-sm sm:text-base">
                  {userDetails?.email}
                </p>
              </div>

              {/* Phone Card */}
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-6 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-300 flex items-center justify-center text-xl">
                    📞
                  </div>
                  <h3 className="text-orange-900 font-bold text-lg">Phone</h3>
                </div>
                <p className="text-orange-800 font-semibold text-sm sm:text-base">
                  {userDetails?.phone}
                </p>
              </div>

              {/* Verification Card */}
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow md:col-span-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-300 flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <h3 className="text-green-900 font-bold text-lg">
                      Phone Verification Status
                    </h3>
                  </div>
                  {userDetails?.phoneNumberVerified ? (
                    <div className="flex items-center gap-2 bg-green-200 px-4 py-2 rounded-lg">
                      <span className="text-2xl">✅</span>
                      <span className="text-green-800 font-bold text-sm sm:text-base">
                        Verified
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-yellow-200 px-4 py-2 rounded-lg">
                      <span className="text-2xl">⏳</span>
                      <span className="text-yellow-800 font-bold text-sm sm:text-base">
                        Pending
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t-2 border-amber-200">
              <button className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                🎁 Edit Profile
              </button>
              <button className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                🔐 Change Password
              </button>
              <button className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                ❤️ Wishlist
              </button>
              <button className="bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                📦 My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
