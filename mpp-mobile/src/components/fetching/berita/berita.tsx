export default async function fetchNews(
  page = 1,
  limit = 4,
  instansi_id?: number
) {
  if (instansi_id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get?page=${page}&limit=${limit}&instansi_id=${instansi_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    return response.json();
  } else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get?page=${page}&limit=${limit}`,
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
}
