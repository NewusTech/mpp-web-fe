"use client";

import Cookies from "js-cookie";

export default async function fetchProfileBySlug(slug: string) {
  // const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/alluser/get/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  // console.log(response, "ini response");

  // const result = await response.json();
  // console.log(result, "ini result");

  // return result;
  return response.json();
}
