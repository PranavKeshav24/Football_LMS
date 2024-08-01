"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const checkAuthAndRedirect = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/userLogin");
    } else {
      router.push(path);
    }
  };

  return { isAuthenticated, checkAuthAndRedirect };
}
