"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setInputFile } from "@/store/action/actionPermohonanLayanan";

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
  const [dataFile, setDataFile] = useState<LayananType>();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  const [fileName, setFileName] = useState<string | null>(null);
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

  console.log(dataFile, "ini data file");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let tempat: { layananform_id: number; data: string }[] = [];

    dataFile?.Layananforms.forEach((el: LayananFormType) => {
      const fileDataURLString = input[el.field];

      if (fileDataURLString) {
        tempat.push({
          layananform_id: el.id,
          data: fileDataURLString,
        });
      }
    });

    dispatch(setInputFile(tempat));

    try {
      const formData = new FormData();

      // Menggunakan formData.append untuk menambahkan data ke FormData
      formData.append("datainput", JSON.stringify(permohonan.datainput));
      formData.append("datafile", JSON.stringify(permohonan.datafile)); // Jika perlu

      // Menambahkan file yang diunggah ke FormData
      dataFile?.Layananforms.forEach((el: LayananFormType) => {
        const file = input[el.field];
        if (file) {
          formData.append("files", file); // Sesuaikan dengan nama field di backend
        }
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/inputform/create/${permohonan.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          cache: "no-store",
        }
      );

      const result = await response.json();
      console.log(result, ">>> ini response <<<");

      // Handle redirect atau tindakan setelah sukses submit
      // router.push("/");
    } catch (error: any) {
      console.log(error.message, "ini error");
      toast("Harap lengkapi syarat-syaratnya!");
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.onload = function (event) {
        if (event?.target && event?.target.result) {
          setInput((prevInput) => ({
            ...prevInput,
            [name]: event?.target?.result as string,
          }));
        }
      };

      reader.readAsDataURL(files[0]); // Membaca file sebagai data URL

      setFileName(files[0].name); // Menyimpan nama file yang diunggah
    }
  };

  console.log(input, ">>> ini input <<<");

  return (
    <div className="flex justify-center mt-[24px] h-full">
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center">
              <div className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                {dataFile?.Layananforms?.map((el: LayananFormType) => {
                  return (
                    <div
                      key={el.id}
                      className="flex flex-col w-[152px] justify-center gap-[9px]">
                      <h6 className="text-[12px] text-primary-800 font-semibold">
                        {el.field}
                      </h6>

                      <p className="text-[10px] text-neutral-900 font-normal">
                        {dataFile.desc}
                      </p>
                    </div>
                  );
                })}

                <div className="flex self-center">
                  {dataFile?.Layananforms?.map((el: LayananFormType) => {
                    return (
                      <div key={el.id}>
                        <input
                          type="file"
                          placeholder="Upload"
                          name="data"
                          defaultValue={input[el.field] || ""}
                          onChange={change}
                          className="flex absolute opacity-0 hover:bg-primary-600 hover:text-neutral-50 w-[80px] h-[25px] border border-neutral-700 text-primary-700 py-[10px]"
                        />
                      </div>
                    );
                  })}

                  <div className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px]">
                    {fileName || "Upload"}
                  </div>
                </div>
              </div>
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
