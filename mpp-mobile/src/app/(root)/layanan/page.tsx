"use client";
import fetchInstansi from "@/components/fetching/instansi/instansi";
import ServiceScreen from "@/components/services/serviceScreen/serviceScreen";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";

interface Instansi {
  image: string;
  name: string;
}

export default function LayananPage() {
  const [instansi, setInstansi] = useState([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search);

  const fetchLayanan = async (search: string) => {
    try {
      const res = await fetchInstansi(search);

      setInstansi(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchLayanan(debounceSearch);
  }, [debounceSearch]);

  return <ServiceScreen instansi={instansi} change={change} search={search} />;
}
