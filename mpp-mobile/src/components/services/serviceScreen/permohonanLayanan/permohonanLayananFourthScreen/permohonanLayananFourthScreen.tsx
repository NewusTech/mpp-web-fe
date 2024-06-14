"use client";

import FormComponent from "@/components/others/formComponent/formComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ktp: z.string({ message: "KTP harus diisi" }),
  kk: z.string({ message: "KK harus diisi" }),
  sktm: z.string({ message: "SKTM harus diisi" }),
  ijazah: z.string({ message: "Ijazah harus diisi" }),
});

export default function PermohonanLayananFourthScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ktp: "",
      kk: "",
      sktm: "",
      ijazah: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center mt-[24px] mb-[82px]">
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center">
                <div className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                  <div className="flex flex-col w-[152px] justify-center gap-[9px]">
                    <h6 className="text-[12px] text-primary-800 font-semibold">
                      Nama Dokument
                    </h6>

                    <p className="text-[10px] text-neutral-900 font-normal">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                  </div>

                  <div className="flex self-center">
                    <FormComponent
                      form={form.control}
                      placeholder="upload"
                      label="Nama Lengkap"
                      type="file"
                      name="name"
                    />

                    <div className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px]">
                      Upload
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                  <div className="flex flex-col w-[152px] justify-center gap-[9px]">
                    <h6 className="text-[12px] text-primary-800 font-semibold">
                      Nama Dokument
                    </h6>

                    <p className="text-[10px] text-neutral-900 font-normal">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                  </div>

                  <div className="flex self-center">
                    <FormComponent
                      form={form.control}
                      placeholder="upload"
                      label="Nama Lengkap"
                      type="file"
                      name="name"
                    />

                    <div className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px]">
                      Upload
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                  <div className="flex flex-col w-[152px] justify-center gap-[9px]">
                    <h6 className="text-[12px] text-primary-800 font-semibold">
                      Nama Dokument
                    </h6>

                    <p className="text-[10px] text-neutral-900 font-normal">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                  </div>

                  <div className="flex self-center">
                    <FormComponent
                      form={form.control}
                      placeholder="upload"
                      label="Nama Lengkap"
                      type="file"
                      name="name"
                    />

                    <div className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px]">
                      Upload
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between w-[290px] h-[80px] rounded-2xl mb-[8px] bg-white border border-[#7BBA78] px-[16px]">
                  <div className="flex flex-col w-[152px] justify-center gap-[9px]">
                    <h6 className="text-[12px] text-primary-800 font-semibold">
                      Nama Dokument
                    </h6>

                    <p className="text-[10px] text-neutral-900 font-normal">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </p>
                  </div>

                  <div className="flex self-center">
                    <FormComponent
                      form={form.control}
                      placeholder="upload"
                      label="Nama Lengkap"
                      type="file"
                      name="name"
                    />

                    <div className="flex items-center w-[80px] h-[25px] rounded-[50px] justify-center font-normal text-[11px] hover:bg-primary-600 hover:text-neutral-50 border border-1 border-neutral-700 text-primary-700 py-[10px]">
                      Upload
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <div className="h-[40px] w-[150px] flex self-center justify-center items-end mb-[22px] mt-[16px]">
            <Button type="submit" variant="success">
              Ajukan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
