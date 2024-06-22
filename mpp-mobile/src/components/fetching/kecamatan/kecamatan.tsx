export default async function kecamatanFetch(search: string, limit = 1000000) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/kecamatan/get?search=${search}&limit=${limit}`,
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
