"use client";

import fetchVisiMisi from "@/components/fetching/visimisi/visimisi";
import MppScreen from "@/components/mpp/mppScreen";
import { VisiMisiType } from "@/types/type";
import { useEffect, useState } from "react";

export default function MppPage() {
  const [visimisi, setVisimisi] = useState<VisiMisiType>({
    visi: "",
    misi: "",
  });

  const fetchVisiMisiMpp = async () => {
    const response = await fetchVisiMisi();

    setVisimisi(response.data);
  };

  useEffect(() => {
    fetchVisiMisiMpp();
  }, []);

  return (
    <div className="bg-primary-100 md:h-full">
      <MppScreen visimisi={visimisi} />
    </div>
  );
}
