import Link from "next/link";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/legacy/image";
import loginDong from "@/../../public/assets/undraw_login_re_4vu2.svg";
import { LogIn } from "lucide-react";
import { Layanantype } from "@/types/type";

export default function CardLayananComponent({
  layanan,
}: {
  layanan: Layanantype;
}) {
  const token = Cookies.get("Authorization");

  let bgStatus = "";
  let textStatus = "";

  if (layanan.active_offline === true) {
    bgStatus = "bg-success-700";
    textStatus = "Buka";
  } else {
    bgStatus = "bg-error-700";
    textStatus = "Tutup";
  }

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-full outline outline-2 outline-neutral-700 bg-neutral-50 shadow-xl rounded-2xl">
      <div className="flex flex-col items-center justify-center w-10/12 h-[296px]">
        <Link
          href={`/instansi/${layanan.slug}`}
          className="h-[135px] w-full flex items-center justify-center">
          <Image
            src={layanan?.image || ""}
            className="h-full object-contain"
            alt="Lampung Timur"
            width={80}
            height={106.12}
          />
        </Link>

        <div className="flex flex-col justify-center pb-6 mt-[8px] w-full">
          <Link href={`/instansi/${layanan.slug}`}>
            <h6 className="text-[14px] text-center text-primary-800 font-semibold">
              {layanan.name}
            </h6>
          </Link>

          <p className="text-[12px] text-center text-neutral-700 font-normal">
            Jumlah Layanan : {layanan.jmlLayanan}
          </p>

          <div
            className={`${bgStatus} flex justify-center items-center w-1/4 h-[20px] rounded-[50px] mt-4 self-center`}>
            <p className="text-[10px] text-neutral-50">{textStatus}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row text-center items-center justify-center w-full md:w-full h-[50px] gap-[1px]">
        {!token ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center font-semibold text-[12px] w-dvw h-full bg-secondary-700 hover:bg-secondary-600 rounded-none rounded-bl-xl shadow-lg text-neutral-50">
                booking Antrian
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col h-[250px] bg-neutral-50 rounded-2xl items-center w-[300px] justify-center">
              <DialogHeader>
                <DialogDescription>
                  <div className="bg-neutral-50 w-full">
                    <Image
                      src={loginDong}
                      alt="Login Dong"
                      width={200}
                      height={200}
                    />

                    <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                      Maaf, Anda tidak mempunyai akses!
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="w-full">
                <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                  <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                  <Link href={"/login"} className="text-primary-800">
                    Login
                  </Link>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={`/instansi/booking-antrian/${layanan.id}`}
            className="flex items-center justify-center font-semibold px-1 text-[12px] w-dvw h-full bg-secondary-700 hover:bg-secondary-600 rounded-none rounded-bl-xl shadow-lg text-neutral-50">
            Booking Antrian
          </Link>
        )}

        {!token ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center font-semibold text-wrap text-[12px] w-dvw h-full bg-primary-700 hover:bg-primary-600 rounded-none rounded-br-xl shadow-lg text-neutral-50">
                Permohonan Layanan
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col h-[250px] bg-neutral-50 rounded-2xl items-center w-[300px] justify-center">
              <DialogHeader>
                <DialogDescription>
                  <div className="bg-neutral-50 w-full">
                    <Image
                      src={loginDong}
                      alt="Login Dong"
                      width={200}
                      height={200}
                    />

                    <p className="text-[14px] text-neutral-900 font-semibold mt-2">
                      Maaf, Anda tidak mempunyai akses!
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="w-full">
                <div className="flex flex-row w-full gap-2 items-center justify-center mt-4">
                  <LogIn className="text-primary-800 w-[15px] h-[15px]" />

                  <Link href={"/login"} className="text-primary-800">
                    Login
                  </Link>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={`/instansi/permohonan-layanan/${layanan.id}`}
            className="flex items-center justify-center font-semibold text-wrap px-1 text-[12px] w-dvw h-full bg-primary-700 hover:bg-primary-600 rounded-none rounded-br-xl shadow-lg text-neutral-50">
            Permohonan Layanan
          </Link>
        )}
      </div>
    </div>
  );
}
