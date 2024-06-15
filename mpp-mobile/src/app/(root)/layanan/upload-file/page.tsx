"use client";

import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

type LayananFormType = {
  id: number;
  field: string;
  tipedata: string;
};

type LayananType = {
  Layananforms: [LayananFormType];
  desc: string;
  image: string;
  name: string;
  slug: string;
};

type FormType = {
  status: string;
  data: LayananType;
};

export default function UploadFilePage() {
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const dispatch = useDispatch();
  const [dataFile, setDataFile] = useState<LayananType | null>(null);

  const router = useRouter();
  const token = Cookies.get("Authorization");

  const fetchFile = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/layanan/docs/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result: FormType = await response.json();

    setDataFile(result.data);
  };

  useEffect(() => {
    fetchFile(permohonan.id);
  }, [permohonan.id]);

  return (
    <div className="flex justify-center mt-[24px]">
      <div className="flex flex-col items-center gap-[12px]">
        <div className="flex flex-col mb-[16px]">
          <div className="flex flex-col justify-center">
            <h4 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h4>
          </div>

          <div className="flex flex-row self-center mt-[24px]">
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

        <div className="flex flex-col">
          <div className="flex flex-col">
            <form className="flex flex-col items-center">
              {dataFile?.Layananforms?.map((el: LayananFormType) => (
                <div
                  key={el.id}
                  className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                  <div className="flex flex-col w-[152px] justify-center gap-[9px]">
                    <h6 className="text-[12px] text-primary-800 font-semibold">
                      {el.field}
                    </h6>
                    <p className="text-[10px] text-neutral-900 font-normal">
                      {dataFile.desc}
                    </p>
                  </div>
                  <div className="flex self-center">
                    <input type="file" placeholder="Upload" />
                    <label className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px] cursor-pointer">
                      Upload
                    </label>
                  </div>
                </div>
              ))}
              <div className="h-[40px] w-[150px] flex self-center justify-center items-end mb-[22px] mt-[16px]">
                <Button type="submit" variant="success">
                  Ajukan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
