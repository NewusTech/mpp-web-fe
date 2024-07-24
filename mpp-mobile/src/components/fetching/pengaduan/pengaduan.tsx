import Cookies from "js-cookie";

export default async function fetchPengaduanLists(
  page = 1,
  limit = 1000000,
  search?: string,
  start_date?: string,
  end_date?: string,
  status?: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/pengaduan/get?page=${page}&limit=${limit}&search=${search}&start_date=${start_date}&end_date=${end_date}&status=${status}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}
