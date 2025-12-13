"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(10, "Phone number must be 10 digits"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

interface ShippingAddressDialogProps {
  onConfirm: (address: AddressFormData) => void;
  children: React.ReactNode;
}

export function ShippingAddressDialog({
  onConfirm,
  children,
}: ShippingAddressDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (data: AddressFormData) => {
    onConfirm(data);
    setOpen(false);
    reset();
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="street">Street Address</Label>
        <Input
          id="street"
          {...register("street")}
          placeholder="Enter your full address"
        />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="Enter phone number"
          type="tel"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
    </form>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
          </DialogHeader>
          <div className="py-4">{formContent}</div>
          <DialogFooter>
            <Button onClick={handleSubmit(onSubmit)}>Confirm Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Shipping Address</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{formContent}</div>
        <DrawerFooter className="pt-2">
          <Button onClick={handleSubmit(onSubmit)} className="w-full">
            Confirm Address
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
