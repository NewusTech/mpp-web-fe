import React from "react";

export default async function DinasInfomationFetch(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/infoinstansi/get/${id}`,
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
