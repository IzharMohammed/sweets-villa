/**
 * Type-safe query key factory for TanStack Query
 * Organized from generic to specific for easy invalidation
 */
export const queryKeys = {
    // Products
    products: {
        all: ['products'] as const,
        lists: () => [...queryKeys.products.all, 'list'] as const,
        list: (filters: Record<string, any> = {}) =>
            [...queryKeys.products.lists(), filters] as const,
        details: () => [...queryKeys.products.all, 'detail'] as const,
        detail: (id: string) =>
            [...queryKeys.products.details(), id] as const,
    },

    // Cart
    cart: {
        all: ['cart'] as const,
        items: () => [...queryKeys.cart.all, 'items'] as const,
        summary: () => [...queryKeys.cart.all, 'summary'] as const,
    },

    // Orders
    orders: {
        all: ['orders'] as const,
        lists: () => [...queryKeys.orders.all, 'list'] as const,
        list: (filters: Record<string, any> = {}) =>
            [...queryKeys.orders.lists(), filters] as const,
        detail: (id: string) =>
            [...queryKeys.orders.all, 'detail', id] as const,
    },

    // Auth
    auth: {
        all: ['auth'] as const,
        user: () => [...queryKeys.auth.all, 'user'] as const,
    },
} as const;
