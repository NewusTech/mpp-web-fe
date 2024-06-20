export default function AboutScreen() {
  return (
    <div className="flex flex-col justify-center mt-[14px] bg-neutral-100 md:mt-0 md:pt-[25px]">
      <div className="grid grid-cols-4 mx-[35px]">
        <div className="grid grid-rows-2 place-items-center mr-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg md:w-[150px] md:h-[150px]">
            <h5 className="text-[20px] text-primary-800 font-semibold md:text-[40px]">
              20
            </h5>
          </div>

          <p className="text-[8px] md:text-[20px] -mt-[.5rem] md:-mt-[5rem] text-secondary-700 font-semibold text-center">
            Jumlah Instansi
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center mx-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg md:w-[150px] md:h-[150px]">
            <h5 className="text-[20px] text-primary-800 font-semibold md:text-[40px]">
              48
            </h5>
          </div>

          <p className="text-[8px] md:text-[20px] -mt-[.5rem] md:-mt-[5rem] text-secondary-700 font-semibold text-center">
            Jumlah Layanan
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center mx-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg md:w-[150px] md:h-[150px]">
            <h5 className="text-[20px] text-primary-800 font-semibold md:text-[40px]">
              18
            </h5>
          </div>

          <p className="text-[8px] md:text-[20px] -mt-[.5rem] md:-mt-[5rem] text-secondary-700 font-semibold text-center">
            Antrian Hari ini
          </p>
        </div>

        <div className="grid grid-rows-2 place-items-center ml-[10px]">
          <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#FEFEFE] rounded-[50%] shadow-lg md:w-[150px] md:h-[150px]">
            <h5 className="text-[20px] text-primary-800 font-semibold md:text-[40px]">
              16
            </h5>
          </div>

          <p className="text-[8px] md:text-[20px] -mt-[.5rem] md:-mt-[5rem] text-secondary-700 font-semibold text-center">
            Permohonan Hari ini
          </p>
        </div>
      </div>

      <div className="grid grid-rows-1 mt-[28px] md:mt-0 space-y-4 mx-[30px] md:mx-[70px]">
        <h3 className="text-center text-[16px] text-primary-800 font-semibold md:text-[32px]">
          Tentang Mal Pelayanan Publik
        </h3>

        <p className="text-[10px] md:text-[16px] text-neutral-800 font-normal text-justify md:text-center md:leading-10">
          Mal Pelayanan Publik (MPP) merupakan konsep inovatif yang
          mengintegrasikan berbagai layanan publik di satu lokasi yang nyaman
          dan mudah diakses. Tujuan utamanya adalah meningkatkan kualitas
          layanan kepada masyarakat dengan menyediakan berbagai layanan
          administrasi dari berbagai instansi pemerintah dan swasta dalam satu
          atap. MPP memudahkan masyarakat dalam mengurus berbagai keperluan
          administrasi tanpa harus berpindah-pindah tempat. Dasar hukum
          pendirian MPP Lampung Timur adalah sebagai berikut: Peraturan Presiden
          Republik Indonesia Nomor 89 Tahun 2021 tentang Penyelenggaraan Mal
          Pelayanan Publik. Peraturan Menteri PANRB Nomor 23 Tahun 2017 tentang
          Penyelenggaraan Mal Pelayanan Publik. Peraturan Menteri PANRB Nomor 92
          Tahun 2021 tentang Petunjuk Teknis Penyelenggaraan Mal Pelayanan
          Publik. MPP dirancang untuk memberikan kemudahan, kenyamanan, dan
          efisiensi dalam pelayanan publik, serta meningkatkan transparansi dan
          akuntabilitas dalam pelayanan pemerintah. Lokasi yang terpadu juga
          menghemat waktu dan biaya bagi masyarakat yang memerlukan berbagai
          jenis layanan.
        </p>
      </div>
    </div>
  );
}
