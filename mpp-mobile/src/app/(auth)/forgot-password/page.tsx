"use client";

import { Button } from "@/components/ui/button";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function ForgotPassword() {
  return (
    <section className="md:container md:mx-auto flex justify-center items-center bg-gradient-to-bl from-neutral-50 from-[-40%] via-primary-700 via-99% to-neutral-700 to-[120%] w-screen h-screen md:min-w-full">
      <div className="flex flex-col w-full gap-[10px] md:gap-0 items-center md:items-start justify-center md:justify-start rounded-xl bg-primary-200 mx-8 my-[70px] md:my-0 p-[32px] md:py-[70px] md:px-[120px] md:mx-[300px]">
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center w-full gap-y-3">
          <div className="w-full flex flex-row justify-center">
            <Image
              src={logo}
              alt="Lampung Timur"
              className="w-full h-full"
              width={300}
              height={100}
            />
          </div>

          <div className="flex flex-col pl-[23px] justify-center items-center">
            <h3
              className={`${raleway.className} font-semibold text-[12px] md:text-[20px] text-primary-700`}>
              MAL PELAYANAN PUBLIK
            </h3>

            <h3
              className={`${raleway.className} font-normal text-primary-800 text-[14px] md:text-[16px]`}>
              Kabupaten Lampung Timur
            </h3>
          </div>
        </Link>

        <div className="flex flex-col w-full justify-center mt-8 md:mt-12 gap-y-10">
          <div className="flex flex-row justify-center">
            <p className="text-primary-800 font-semibold text-[16px]">
              Silahkan Masukkan Email Anda
            </p>
          </div>

          <form className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                <Input
                  type="text"
                  placeholder="Email@gmail.com"
                  className="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                />
              </div>
            </div>

            <div className="h-[72px] flex justify-center items-end">
              <Button
                className="text-[14px] font-normal"
                type="submit"
                variant="primary">
                Kirim
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}