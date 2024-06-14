"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export default function PermohonanLayananSecondScreen() {
  return (
    <div className="flex items-center justify-center mx-[35px] mt-[24px] mb-[14px]">
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col justify-center">
            <h4 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h4>
          </div>

          <div className="flex flex-row">
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

        <div className="flex flex-col w-full border border-neutral-700 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col mt-[22px] px-[21px]">
            <h5 className="text-[14px] font-semibold text-primary-800">
              Data Diri
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
                  NIK
                </Label>

                <Input
                  name="nik"
                  type="text"
                  placeholder="NIK"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Nomor Telepon
                </Label>

                <Input
                  name="telepon"
                  type="text"
                  placeholder="Nomor Telepon"
                  className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
                {/* <FormComponents
                      form={form.control}
                      classStyle="w-full h-[36px]"
                      labelStyle="text-[12px] text-neutral-900 font-normal"
                      placeholder="Nomor Telepon"
                      label="Nomor Telepon"
                      type="text"
                      name="telepon"
                    /> */}
              </div>

              <div className="flex flex-col mb-[8px]">
                <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
                  Alamat
                </Label>

                <Textarea
                  placeholder="Alamat"
                  name="alamat"
                  className="w-[258px] h-[99px] text-[14px] placeholder:text-[12px]"
                />
                {/* <FormComponents
                      form={form.control}
                      classStyle="w-[258px] h-[99px] text-[12px]"
                      labelStyle="text-[12px] text-neutral-900 font-normal"
                      placeholder="Jl. Pangeran Antasari"
                      label="Alamat"
                      type="textarea"
                      name="alamat"
                    /> */}
              </div>
            </div>

            <div className="flex self-center h-[40px] w-[120px] mb-[19px] mt-[16px]">
              <Button type="submit" variant="success">
                <Link href="/layanan/formulir">Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
