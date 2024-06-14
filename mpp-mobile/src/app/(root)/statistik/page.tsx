"use client";
import StatisticsScreen from "@/components/statistics/statisticScreen";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function StatisticsPage() {
  const token = Cookies.get("Authorization");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, []);

  return <StatisticsScreen />;
}
