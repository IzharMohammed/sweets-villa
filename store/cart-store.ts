import { create } from "zustand";

type CartStore = {
    count: number;
    setCount: (count: number) => void;
    increment: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
    increment: () => set((state) => ({ count: state.count + 1 })),
}));
