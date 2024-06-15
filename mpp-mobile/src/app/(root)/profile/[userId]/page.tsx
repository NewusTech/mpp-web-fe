"use client";
import fetchProfile from "@/components/fetching/profile/profile";
import ProfileScreen from "@/components/profiles/profileScreen/profileScreen";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage({
  params,
}: {
  params: { userId: number };
}) {
  const token = Cookies.get("Authorization");
  const [profile, setProfile] = useState({});

  const fetchProfiles = async (id: number) => {
    try {
      const result = await fetchProfile(id);

      setProfile(result.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchProfiles(params.userId);
  }, [params.userId]);

  return <ProfileScreen profile={profile} />;
}
