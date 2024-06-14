// "use client";

import Cookies from "js-cookie";

export default async function fetchInstansi(search: string) {
  const token = Cookies.get("Authorization");

  if (search) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/instansi/get?search=${search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    return response.json();
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/instansi/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    return response.json();
  }
}
