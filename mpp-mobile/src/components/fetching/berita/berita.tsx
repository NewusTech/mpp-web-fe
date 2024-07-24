export default async function fetchNews(
  page = 1,
  limit = 4,
  search?: string,
  start_date?: string,
  end_date?: string,
  instansi_id?: string
) {
  if (instansi_id) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get?page=${page}&limit=${limit}&search=${search}&start_date=${start_date}&end_date=${end_date}&instansi_id=${instansi_id}`,
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
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/artikel/get?page=${page}&limit=${limit}&search=${search}&start_date=${start_date}&end_date=${end_date}`,
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
