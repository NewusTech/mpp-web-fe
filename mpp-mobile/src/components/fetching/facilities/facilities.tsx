export default async function facilitiesFetch(page = 1, limit = 1000000) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/Facilities/get?page=${page}&limit=${limit}`,
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
