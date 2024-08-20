"use client";

import loginDong from "@/../../public/assets/undraw_login_re_4vu2.svg";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/legacy/image";
import { LogIn } from "lucide-react";

export default function MobileSKMPage() {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(Cookies.get("Authorization"));
  }, []);

  return (
    <div className="mobile-background-blend flex flex-row justify-center w-full">
      <div className="w-10/12 flex h-full flex-col md:flex-row items-center">
        <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
          <h2 className="font-semibold text-[18px] mt-8 md:mt-0 md:text-[26px] text-primary-800">
            Survey Kepuasan Masyarakat Mal Pelayanan Publik Lampung Timur
          </h2>

          <p className="font-normal text-center md:text-start text-[14px] text-primary-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            asperiores deserunt voluptate laboriosam magni, ipsa ratione et
            similique? Quam, accusantium repellat? Voluptates voluptatum
            assumenda atque. In officiis similique quisquam itaque.
          </p>

          <div className="w-full">
            {!token ? (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full md:w-6/12 font-normal bg-primary-700 rounded-full py-4 text-[14px] md:text-[16px]">
                    <p className="text-neutral-50 text-center">
                      Isi Survey Kepuasan Masyarakat ( SKM )
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="flex flex-col bg-neutral-50 rounded-xl items-center w-10/12 md:w-6/12 justify-center py-4">
                  <DialogHeader>
                    <div className="">
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
              <Button className="w-full md:w-7/12 font-normal py-6 text-[14px] md:text-[16px]">
                <Link href={`/survei/survei-mpp`}>
                  Isi Survey Kepuasan Masyarakat ( SKM )
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="w-full my-4 p-4 rounded-xl bg-primary-800 md:flex flex-col justify-center items-center">
          <h5 className="font-semibold text-center text-neutral-50 text-[18px]">
            Indeks Kepuasan Masyarakat
          </h5>

          <p className="font-semibold text-center text-[40px] text-neutral-50 py-4">
            89.19
          </p>

          <p className="font-normal text-center text-[14px] text-neutral-50">
            Sangat Baik
          </p>
        </div>
      </div>
    </div>
  );
}
