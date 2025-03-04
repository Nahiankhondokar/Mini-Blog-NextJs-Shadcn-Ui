"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      if (pathname !== "/") {
        router.push("/"); // Redirect to login if not authenticated
      }
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setIsAuthenticated(true);
        if (pathname === "/" || pathname === 'register') {
          router.push("/dashboard"); 
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        if (pathname !== "/") {
          router.push("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });

  }, [router, pathname]);

  if (loading) return <p className="text-center text-blue-900 font-bold">Loading...</p>;

  return isAuthenticated || pathname === "/" ? <>{children}</> : null;
}
