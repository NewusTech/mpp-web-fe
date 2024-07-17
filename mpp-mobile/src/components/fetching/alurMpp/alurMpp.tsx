export default async function fetchAlurMpp() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/alurmpp/get`,
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
