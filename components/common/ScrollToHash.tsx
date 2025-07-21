"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToHash() {
  const params = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [params]);

  return null;
}
