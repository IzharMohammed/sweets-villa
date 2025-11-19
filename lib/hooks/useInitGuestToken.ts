"use client"
import { useEffect, useRef } from "react";

/**
 * Initialize guest token once on app load.
 * }
 */
export function useInitGuestToken() {
    const hasInitialized = useRef(false);

    useEffect(() => {
        // Only run once
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const initializeToken = async () => {
            try {
                console.log("Initializing guest token...");
                const response = await fetch("/api/init-guest-token", {
                    method: "GET",
                    credentials: "include", // Include cookies
                    cache: "no-store",
                });

                if (!response.ok) {
                    console.error("Failed to initialize guest token");
                    return;
                }

                const data = await response.json();
                console.log("Guest token initialized successfully");
            } catch (error) {
                console.error("Error initializing guest token:", error);
            }
        };

        initializeToken();
    }, []);
}