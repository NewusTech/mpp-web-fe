"use client";

import fetchContact from "@/components/fetching/contact/contact";
import { ContactType } from "@/types/type";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
export const dynamic = "force-dynamic";

export default function KontakPage() {
  const [kontak, setKontak] = useState<ContactType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchKontak = async () => {
    setIsLoading(true);
    try {
      const contact = await fetchContact();

      setKontak(contact.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  let iframeSrc = "https://www.google.com/maps?q=";
  if (kontak?.latitude && kontak?.longitude) {
    iframeSrc +=
      kontak.latitude + "," + kontak.longitude + "&hl=es;z=14&output=embed";
  }

  return (
    <section className="bg-neutral-50 mx-9 mb-8 md:mb-28 md:mx-[70px] rounded-xl mt-4">
      <div className="flex flex-col md:flex-row items-center md:p-8 md:gap-x-9">
        <div className="w-full md:w-4/5 flex items-center justify-center">
          {isLoading ? (
            <Loader className="animate-spin w-32 h-32" />
          ) : (
            <iframe
              src={iframeSrc}
              width="600"
              height="450"
              style={{ border: "0" }}
              className="border-0 w-full rounded-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
              {kontak?.alamat}
            </iframe>
          )}
        </div>

        <div className="flex flex-col p-5 gap-y-6 md:p-0 md:mt-0">
          <h3 className="text-[24px] md:text-[32px] text-primary-800 font-bold">
            Kontak Kami
          </h3>

          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <h4 className="text-[16px] md:text-[20px] text-neutral-900 font-semibold">
                Lokasi
              </h4>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-light">
                {kontak?.alamat}
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h4 className="text-[16px] md:text-[20px] text-neutral-900 font-semibold">
                Email
              </h4>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-light">
                {kontak?.email}
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h4 className="text-[16px] md:text-[20px] text-neutral-900 font-semibold">
                Nomor Telepon
              </h4>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-light">
                {kontak?.telp}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
