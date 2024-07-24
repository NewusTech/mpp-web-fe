// "use client";

import Cookies from "js-cookie";

export default async function fetchInstansiSurvei(
  page = 1,
  limit = 8,
  skm?: boolean
) {
  const token = Cookies.get("Authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/instansi/get?page=${page}&limit=${limit}&skm=${skm}`,
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
