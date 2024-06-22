export default async function desaFetch(
  search: string,
  limit = 1000000,
  kecamatan_id: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/desa/get?search=${search}&limit=${limit}&kecamatan_id=${kecamatan_id}`,
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
