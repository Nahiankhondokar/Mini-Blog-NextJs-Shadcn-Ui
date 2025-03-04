"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    router.push("/");
  } else if (authToken) {
    return <>{children}</>;
  } else {
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
