import React from "react";

export default async function fetchAppSupport(limit = 1000000) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/aplikasietc/get?limit=${limit}`,
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
