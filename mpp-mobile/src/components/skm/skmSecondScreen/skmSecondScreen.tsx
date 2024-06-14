"use client";

import FormComponent from "@/components/others/formComponent/formComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  jenisLayanan: z.string({ message: "Enis Layanan harus diisi" }),
  performa: z.string({ message: "Enis Layanan harus diisi" }),
  kepuasan: z.string({ message: "Enis Layanan harus diisi" }),
  ketepatan: z.string({ message: "Enis Layanan harus diisi" }),
});

export default function SKMSecondScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jenisLayanan: "",
      performa: "",
      kepuasan: "",
      ketepatan: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center mt-[24px] mx-[20px] mb-[27px]">
      <div className="flex flex-col items-center">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg px-[16px]">
          <div className="flex justify-center my-[22px] mb-[16px]">
            <h6 className="text-[16px] text-primary-800 font-semibold">
              Survey Kepuasan Masyarakat
            </h6>
          </div>

          <div className="flex flex-col my-[16px] rounded-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-rows-4 place-items-center">
                <div className="flex flex-row rounded-2xl mb-[12px]">
                  <FormComponent
                    form={form.control}
                    placeholder="1"
                    label="Bagaimana pendapat saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?"
                    type="radio"
                    name="jenisLayanan"
                  />
                </div>

                <div className="flex flex-row rounded-2xl my-[12px]">
                  <FormComponent
                    form={form.control}
                    placeholder="2"
                    label="Bagaimana pendapat saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?"
                    type="radio"
                    name="jenisLayanan"
                  />
                </div>

                <div className="flex flex-row rounded-2xl my-[12px]">
                  <FormComponent
                    form={form.control}
                    placeholder="3"
                    label="Bagaimana pendapat saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?"
                    type="radio"
                    name="jenisLayanan"
                  />
                </div>

                <div className="flex flex-row rounded-2xl mt-[12px]">
                  <FormComponent
                    form={form.control}
                    placeholder="4"
                    label="Bagaimana pendapat saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?"
                    type="radio"
                    name="jenisLayanan"
                  />
                </div>
              </form>
            </Form>
          </div>

          <div className="flex self-center justify-center items-end mb-[22px]">
            <Button
              className="w-[90px] h-[30px] text-[12px] text-neutral-50 font-light"
              type="submit"
              variant="link">
              Selesai
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
