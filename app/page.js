"use client"
import { useRouter } from "next/navigation";
import { Button } from "../@/components/ui/button"
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter();
  return (
    <div>
    <Header />
      <Button onClick={()=>router.replace('/dashboard')} className="w-full">Go to Dashboard</Button>
    </div>
  );

}