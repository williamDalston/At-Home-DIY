"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SearchKeyboardShortcut() {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k" &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        router.push("/search");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
