"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = ({ children, requireAuth = true }) => {
  const router = useRouter();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (requireAuth && !authToken) {
      router.push("/");
    } else if (!requireAuth && authToken) {
      router.push("/dashboard");
    } else {
      setAuthLoaded(true);
    }
  }, [requireAuth, router]);

  if (!authLoaded) return null;

  return <>{children}</>;
};

export default AuthGuard;
