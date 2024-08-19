"use client";

import SopMppFetch from "@/components/fetching/sopMpp/sopMpp";
import { SopMpp } from "@/types/type";
import React, { useEffect, useState } from "react";

export default function StandarOperasional() {
  const [sop, setSop] = useState<SopMpp>();

  const fetchSopMpp = async () => {
    const res = await SopMppFetch();
    setSop(res?.data);
  };

  useEffect(() => {
    fetchSopMpp();
  }, []);

  return (
    <section className="flex items-center justify-center bg-primary-100 w-full pt-6 pb-[380px] md:pb-[150px]">
      <div className="flex w-full mx-6 md:mx-24 flex-col items-center gap-y-5">
        <div className="md:flex md:justify-center md:self-center">
          <h3 className="text-[16px] md:text-center md:text-[26px] font-semibold text-primary-800">
            Standar Layanan (SOP) Lampung Timur
          </h3>
        </div>

        <div className="flex flex-col w-full h-[400px] md:h-[550px] bg-neutral-50 shadow-md rounded-lg p-1">
          {sop && (
            <iframe
              allowFullScreen
              src={sop?.file}
              title="Manual Book"
              className="rounded-lg w-full h-full">
              {sop.id}
            </iframe>
          )}
        </div>
      </div>
    </section>
  );
}
