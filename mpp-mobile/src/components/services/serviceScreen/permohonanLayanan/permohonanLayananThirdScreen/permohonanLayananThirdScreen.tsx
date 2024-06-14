"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function PermohonanLayananThirdScreen() {
  return (
    <div className="flex items-center justify-center mt-[14px] mx-[35px] mb-[15px]">
      <div className="flex flex-col items-centergap-[16px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col justify-center">
            <h5 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h5>
          </div>

          <div className="flex flex-row self-center">
            <div className="flex flex-row items-center justify-center">
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  1
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  2
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-[#F3CB53]"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  3
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-[#F3CB53]"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-[#7BBA78] outline outline-1 outline-[#7BBA78] active:bg-[#7BBA78]">
                <p className="text-[14px] font-semibold text-[#7BBA78] active:text-[#FEFEFE]">
                  4
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg mt-[20px]">
          <div className="flex flex-col mt-[22px] px-[21px]">
            <h5 className="text-[14px] font-semibold text-primary-800">
              Formulir
            </h5>

            <div className="flex flex-col mt-[32px]">
              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nama Lengkap
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nama Lengkap
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nama Lengkap
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nama Lengkap
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nama Lengkap
                </Label>

                <Input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex self-center h-[40px] w-[120px] mb-[19px] mt-[16px]">
              <Button type="submit" variant="success">
                <Link href="/layanan/upload-file">Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
