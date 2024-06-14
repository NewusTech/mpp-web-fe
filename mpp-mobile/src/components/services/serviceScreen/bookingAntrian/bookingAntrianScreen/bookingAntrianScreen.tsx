"use client";

import FormComponent from "@/components/others/formComponent/formComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  service: z.string({ message: "Service can not be empty" }),
  date: z.string({ message: "Date can not be empty" }),
  time: z.string({ message: "Time can not be empty" }),
});

export default function BookingAntrianScreen() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      date: "",
      time: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="flex justify-center mt-[53.5px] mb-[234px]">
      <div className="flex flex-col items-center">
        <div className="">
          <h5 className="text-[20px] font-semibold text-primary-800">
            Booking Antrian
          </h5>
        </div>

        <div className="flex flex-col w-[312px] mt-[24px] pt-[16px] items-center h-full bg-white rounded-2xl shadow-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <FormComponent
                  form={form.control}
                  placeholder="Pilih Jenis Layanan"
                  label="Pilih Jenis Layanan"
                  type="select"
                  name="service"
                />
              </div>

              <div className="flex flex-col items-center">
                <FormComponent
                  form={form.control}
                  placeholder="Tanggal"
                  label="Tanggal"
                  type="input"
                  name="date"
                />
              </div>

              <div className="flex flex-col items-center">
                <FormComponent
                  form={form.control}
                  placeholder="Jam"
                  label="Jam"
                  type="input"
                  name="time"
                />
              </div>

              <div className="flex self-start justify-start items-end mb-[32px] mt-[20px]">
                <Button
                  className="bg-primary-700 hover:bg-primary-800 h-[30px] text-[12px] text-neutral-50 font-normal py-[6.5] px-[33px]"
                  type="submit"
                  variant="warning">
                  Pilih
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
