"use client";

export default async function fetchProfileBySlug(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/alluser/get/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return response.json();
}
