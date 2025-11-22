"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendOtp, verifyOtp } from "@/actions/auth";

interface OTPDrawerProps {
  isAuthenticated: boolean;
  onLoginSuccess?: () => void;
}

export default function OTPDrawer({ isAuthenticated, onLoginSuccess }: OTPDrawerProps) {
  const router = useRouter();
  const [parentOpen, setParentOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending OTP
  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setIsLoading(true);

    try {
      //  Call  API to send OTP
      const result = await sendOtp(phoneNumber);
      console.log("result", result);

      console.log("Sending OTP to:", phoneNumber);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOtpOpen(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification and login
  const handleLogin = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Call your API to verify OTP and login
      await verifyOtp(phoneNumber, otp);
      // Close both drawers
      setOtpOpen(false);
      setParentOpen(false);

      // Reset states
      setPhoneNumber("");
      setOtp("");

      // Call success callback
      // if (onLoginSuccess) {
      //   onLoginSuccess();
      // }
      toast.success("Login successful!"); 
      router.push("/orders");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit phone number
  const handleEdit = () => {
    setOtpOpen(false);
    setOtp("");
  };

  return (
    <Drawer open={parentOpen} onOpenChange={setParentOpen}>
      <Button 
        onClick={() => {
          if (isAuthenticated) {
            router.push("/checkout");
          } else {
            setParentOpen(true);
          }
        }}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
      >
        Proceed to Checkout
      </Button>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Enter Your Phone Number</DrawerTitle>
          <DrawerDescription>
            We'll send you an OTP to verify your number
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter 10-digit number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              maxLength={10}
              className="text-lg"
            />
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={isLoading || phoneNumber.length !== 10}
            className="w-full bg-yellow-600 hover:bg-yellow-700"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>

        {/* Nested OTP Drawer */}
        <Drawer open={otpOpen} onOpenChange={setOtpOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-between">
                <span>Verify OTP</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Edit
                </Button>
              </DrawerTitle>
              <DrawerDescription>
                OTP sent to +91 {phoneNumber}
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  className="text-lg text-center tracking-widest"
                />
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                {isLoading ? "Verifying..." : "Login"}
              </Button>

              <div className="text-center">
                <button
                  onClick={handleSendOTP}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  );
}
