export default function MppScreen() {
  return (
    <div className="flex flex-col w-full items-center justify-center mt-[24px] px-[35px] md:px-0 md:mt-[56px] bg-primary-100 md:mx-0 mb-[24px] md:mb-0 md:pb-[150px]">
      <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none place-items-center md:place-items-start md:mx-[35px] gap-[16px] md:mb-[62px]">
        <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
          <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold">
            VISI
          </h4>

          <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
            Mewujudkan Pelayanan Publik yang Terpadu, Efisien, dan Berorientasi
            pada Kebutuhan Masyarakat.
          </p>
        </div>

        <div className="flex flex-col text-center gap-[16px] md:gap-[40px]">
          <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold">
            MISI
          </h4>

          <p className="text-[10px] md:text-[16px] md:px-[25px] text-neutral-800 text-center">
            Meningkatkan Kualitas Pelayanan Publik, Memudahkan Akses Layanan
            Bagi Masyarakat, Meningkatkan Efisiensi dan Efektivitas Pelayanan,
            Mendorong Inovasi dalam Pelayanan Publik, Meningkatkan Transparansi
            dan Akuntabilitas, Membangun Sinergi dengan Instansi Terkait.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[32px]">
        <h4 className="text-primary-800 text-[16px] md:text-[26px] font-semibold md:mb-[40px]">
          ALUR PELAYANAN MPP
        </h4>

        <div className="flex flex-col md:grid md:grid-cols-2 mt-[16px] md:gap-[20px] md:mx-[55px]">
          <div className="flex flex-col h-full md:h-[294px] bg-white shadow-xl rounded-2xl gap-[32px]">
            <div className="flex justify-center pt-[16px]">
              <h4 className="text-[16px] md:text-[26px] text-secondary-700 font-semibold">
                Booking Antrian
              </h4>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-4 justify-between space-y-2 md:space-y-0 px-[16px]">
              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-primary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">1</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Booking antrian melalui website atau aplikasi
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-primary-700 rounded-[50%] w-[50px] h-[50px] space-y-2 md:space-y-0">
                  <p className="text-[16px] text-neutral-50 font-bold">2</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Pilih waktu booking antrian
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-primary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">3</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Simpan atau cetak QR code yang diberikan dan membawa
                    persyaratan yang tertera
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-primary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">4</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Datang ke Mall Pelayanan Publik dengan tepat waktu
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full md:h-[294px] bg-white shadow-xl rounded-2xl gap-[32px] mt-[16px] md:mt-0">
            <div className="flex justify-center pt-[16px]">
              <h4 className="text-[16px] md:text-[26px] text-primary-700 font-semibold">
                Permohonan Layanan
              </h4>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-4 justify-between space-y-2 md:space-y-0 px-[16px]">
              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-secondary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">1</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Buat permohonanan layanan melalui website atau aplikasi.
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-secondary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">2</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Isi form dan upload dokumen yang diperlukan.
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-secondary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">3</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Cek secara berkala sampai berstatus selesai.
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2 place-items-center md:grid-rows-none md:flex md:flex-col md:gap-[30px]">
                <div className="flex justify-center items-center bg-secondary-700 rounded-[50%] w-[50px] h-[50px] space-y-2">
                  <p className="text-[16px] text-neutral-50 font-bold">4</p>
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-center text-[10px] text-neutral-800">
                    Download dokumen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
