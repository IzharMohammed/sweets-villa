/**
 * Client-safe wrappers for server actions
 * These can be imported in client components and used with TanStack Query
 */

import {
    getProducts as serverGetProducts,
    getProductDetails as serverGetProductDetails
} from "@/actions/products";
import {
    getCartItems as serverGetCartItems,
    addToCart as serverAddToCart,
    removeFromCart as serverRemoveFromCart,
    updateCartQuantity as serverUpdateCartQuantity
} from "@/actions/cart";
import {
    getOrders as serverGetOrders,
    createOrder as serverCreateOrder
} from "@/actions/order";
import {
    sendOtp as serverSendOtp,
    verifyOtp as serverVerifyOtp,
    resendOtp as serverResendOtp,
    getAuthStatus as serverGetAuthStatus
} from "@/actions/auth";

// Products
export const getProducts = serverGetProducts;
export const getProductDetails = serverGetProductDetails;

// Cart
export const getCartItems = serverGetCartItems;
export const addToCart = serverAddToCart;
export const removeFromCart = serverRemoveFromCart;
export const updateCartQuantity = serverUpdateCartQuantity;

// Orders
export const getOrders = serverGetOrders;
export const createOrder = serverCreateOrder;

// Auth
export const sendOtp = serverSendOtp;
export const verifyOtp = serverVerifyOtp;
export const resendOtp = serverResendOtp;
export const getAuthStatus = serverGetAuthStatus;
