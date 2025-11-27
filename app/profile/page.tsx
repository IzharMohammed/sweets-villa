import { cookieManager } from "@/utils/authTools";
import BottomNav from "@/components/bottom-nav";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileActions from "@/components/profile/profile-actions";

export default async function Profile() {
  const userDetails = await cookieManager.getAuthUser();
  const guestToken = await cookieManager.getGuestToken();
  const isGuest = !!guestToken && !userDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ProfileHeader user={userDetails} isGuest={isGuest} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProfileInfo user={userDetails} />
            </div>
            
            <div className="lg:col-span-1">
              <ProfileActions />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
