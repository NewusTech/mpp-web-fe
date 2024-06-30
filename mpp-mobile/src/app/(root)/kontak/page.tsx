import React from "react";
export const dynamic = "force-dynamic";

export default function KontakPage() {
  return (
    <section className="bg-neutral-50 mx-9 mb-8 md:mb-0 md:mx-[70px] rounded-xl mt-6">
      <div className="flex flex-col md:flex-row items-center md:p-8 md:gap-x-9">
        <div className="w-full md:w-4/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4391.5424857987655!2d105.5255487769218!3d-5.048226681011157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40915ca6ae3e81%3A0x228c93122a17d429!2sKANTOR%20BUPATI%20LAMPUNG%20TIMUR!5e0!3m2!1sid!2sid!4v1719561240009!5m2!1sid!2sid"
            width="600"
            height="450"
            style={{ border: "0" }}
            className="border-0 w-full rounded-xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
            Sukadana Ilir, Kec. Sukadana, Kabupaten Lampung Timur, Lampung 34194
          </iframe>
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
                Sukadana Ilir, Kec. Sukadana, Kabupaten Lampung Timur, Lampung
                34194
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h4 className="text-[16px] md:text-[20px] text-neutral-900 font-semibold">
                Email
              </h4>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-light">
                mpplampungtimur@gmail.go.id
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              <h4 className="text-[16px] md:text-[20px] text-neutral-900 font-semibold">
                Nomor Telepon
              </h4>

              <p className="text-[12px] md:text-[16px] text-neutral-900 font-light">
                08123456789
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
