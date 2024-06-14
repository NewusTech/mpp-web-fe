"use client";

import FormComponent from "@/components/others/formComponent/formComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  service: z.string({ message: "Service can not be empty" }),
});

export default function PermohonanLayananFirstScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center mt-[24px] mb-[132px]">
      <div className="flex flex-col items-center mx-[35px] gap-[16px]">
        <div className="flex flex-col">
          <div className="flex flex-col w-[300px] h-[50px] gap-[24px]">
            <h5 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h5>

            <div className="flex flex-row items-center justify-center">
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  1
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  2
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  3
                </p>
              </div>

              <div className="flex self-center w-[40px] h-[2px] bg-secondary-700"></div>

              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-primary-700 outline outline-1 outline-primary-700 active:bg-primary-700">
                <p className="text-[14px] font-semibold text-primary-700 active:text-neutral-50">
                  4
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-[64px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex self-center h-[40px]">
                <div className="flex h-[30px]">
                  <FormComponent
                    form={form.control}
                    placeholder="Pilih Layanan"
                    label="Placeholder"
                    type="select"
                    name="service"
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex flex-col self-start w-[300px] h-[137px] gap-[16px] pt-[16px]">
          <h5 className="text-[14px] font-semibold">Informasi Layanan</h5>

          <ul className="list-disc list-inside ml-[8px]">
            <li className="text-[12px] text-neutral-800 font-normal">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>

            <li className="text-[12px] text-neutral-800 font-normal">
              Pariatur aperiam ullam consequatur impedit et est facilis
            </li>

            <li className="text-[12px] text-neutral-800 font-normal">
              tempora quaerat reiciendis a officiis, quibusdam error ratione
            </li>

            <li className="text-[12px] text-neutral-800 font-normal">
              corporis cum molestiae porro fuga dicta!
            </li>
          </ul>
        </div>

        <div className="mt-[56px]">
          {/* Untuk process next menggunakan button nanti */}
          <Button
            className="w-[120px] text-[14px] text-neutral-50 font-normal"
            type="submit"
            variant="success">
            <Link href="/layanan/data-diri">Lanjut</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
