import React from "react";

export default async function InstansiDetailFetch(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/instansi/get/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await response.json();
}
