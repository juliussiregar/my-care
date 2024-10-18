"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke halaman /onboarding saat halaman root diakses
    router.push("/onboarding");
  }, [router]);

  return null; 
}
