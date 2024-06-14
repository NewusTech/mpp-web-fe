"use client";
import fetchProfile from "@/components/fetching/profile/profile";
import ProfileScreen from "@/components/profiles/profileScreen/profileScreen";
import { useEffect, useState } from "react";

export default function ProfilePage({
  params,
}: {
  params: { userId: number };
}) {
  const [profile, setProfile] = useState({});

  const fetchProfiles = async (id: number) => {
    try {
      const result = await fetchProfile(id);

      setProfile(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles(params.userId);
  }, [params.userId]);

  return <ProfileScreen profile={profile} />;
}
