import { InfoLandingType } from "@/types/type";

export default function AboutScreen({
  infoLanding,
}: {
  infoLanding: InfoLandingType;
}) {
  console.log(infoLanding, "infoLanding");

  return (
    <div className="flex flex-col justify-center mt-[14px] mx-5 md:mx-8 md:mt-0 md:pt-8 md:rounded-xl">
      <div className="flex flex-col justify-center bg-primary-200 py-5 md:py-8 rounded-xl">
        <div className="grid grid-cols-2 place-items-center md:grid-cols-4 mx-4 gap-y-5 md:gap-y-0 md:gap-x-5">
          <div className="flex w-10/12 md:w-full">
            <div className="grid grid-rows-2 place-items-center items-center p-2 justify-center w-full min-h-[130px] bg-neutral-50 rounded-xl shadow-md md:w-full md:h-[215px]">
              <h5 className="text-[26px] text-primary-700 self-end font-semibold md:text-[26px]">
                {infoLanding.instansiCount}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-primary-700 font-semibold text-center">
                Jumlah Instansi
              </p>
            </div>
          </div>

          <div className="flex w-10/12 md:w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full min-h-[130px] bg-neutral-50 rounded-xl shadow-md md:w-full md:h-[215px]">
              <h5 className="text-[26px] text-secondary-700 self-end font-semibold md:text-[26px]">
                {infoLanding.layananCount}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-secondary-700 font-semibold text-center">
                Jumlah Layanan
              </p>
            </div>
          </div>

          <div className="flex w-10/12 md:w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full min-h-[130px] bg-neutral-50 rounded-xl shadow-md md:w-full md:h-[215px]">
              <h5 className="text-[26px] text-primary-700 self-end font-semibold md:text-[26px]">
                18
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-primary-700 font-semibold text-center">
                Jumlah Antrian
              </p>
            </div>
          </div>

          <div className="flex w-10/12 md:w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full min-h-[130px] bg-neutral-50 rounded-xl shadow-md md:w-full md:h-[215px]">
              <h5 className="text-[26px] text-secondary-700 self-end font-semibold md:text-[26px]">
                {infoLanding.permohonanCountToday}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-secondary-700 font-semibold text-center">
                Jumlah Permohonan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-200 mt-5 py-5 rounded-xl">
        <div className="grid grid-rows-1 mt-[28px] md:mt-0 space-y-4 mx-[30px]">
          <h3 className="text-start text-[16px] text-secondary-800 font-semibold md:text-[26px]">
            Tentang Mal Pelayanan Publik
          </h3>

          <p className="text-[10px] md:text-[16px] text-neutral-800 font-normal text-justify md:leading-10">
            Mal Pelayanan Publik (MPP) merupakan konsep inovatif yang
            mengintegrasikan berbagai layanan publik di satu lokasi yang nyaman
            dan mudah diakses. Tujuan utamanya adalah meningkatkan kualitas
            layanan kepada masyarakat dengan menyediakan berbagai layanan
            administrasi dari berbagai instansi pemerintah dan swasta dalam satu
            atap. MPP memudahkan masyarakat dalam mengurus berbagai keperluan
            administrasi tanpa harus berpindah-pindah tempat. Dasar hukum
            pendirian MPP Lampung Timur adalah sebagai berikut: Peraturan
            Presiden Republik Indonesia Nomor 89 Tahun 2021 tentang
            Penyelenggaraan Mal Pelayanan Publik. Peraturan Menteri PANRB Nomor
            23 Tahun 2017 tentang Penyelenggaraan Mal Pelayanan Publik.
            Peraturan Menteri PANRB Nomor 92 Tahun 2021 tentang Petunjuk Teknis
            Penyelenggaraan Mal Pelayanan Publik. MPP dirancang untuk memberikan
            kemudahan, kenyamanan, dan efisiensi dalam pelayanan publik, serta
            meningkatkan transparansi dan akuntabilitas dalam pelayanan
            pemerintah. Lokasi yang terpadu juga menghemat waktu dan biaya bagi
            masyarakat yang memerlukan berbagai jenis layanan.
          </p>
        </div>
      </div>
    </div>
  );
}
