"use client";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye, UserRound } from "lucide-react";
import logo from "@/../public/assets/450px-Lokasi_Lampung_Kabupaten_Lampung_Timur.png";
import Image from "next/image";
import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormComponents from "@/components/others/formComponents/formComponents";
import Cookies from "js-cookie";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const formSchema = z.object({
  nik: z
    .string({ message: "NIK can not be empty" })
    .min(16, { message: "NIK must be at least 16 characters" })
    .max(16, { message: "NIK must be less than 16 characters" }),
  password: z
    .string({ message: "Password must be more than 2 characters" })
    .min(2, { message: "Password must be more than 2 characters" }),
});

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = {
        nik: values.nik,
        password: values.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (result?.data?.token) {
        Cookies.set("Authorization", result?.data?.token);
        router.push("/");
        toast.success("Login berhasil!", { duration: 1000 });
      } else {
        toast.error("Login gagal. Periksa NIK dan password Anda.");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-[#FAEBBC] from-[-20%] to-[#7bba78] to-90% w-screen h-screen">
      <div className="flex flex-col md:w-full gap-[10px] items-center md:items-start justify-center md:justify-start rounded-2xl bg-primary-200 my-[70px] md:py-[70px] p-[32px] md:px-[210px] md:mx-[285px]">
        <div className="flex flex-row">
          <Image
            src={logo}
            alt="Lampung Timur"
            className="w-[73px] md:w-[174px] h-[69px] md:h-[160px]"
            width={73}
            height={69}
          />

          <div className="flex flex-col pl-[23px]">
            <h1
              className={`text-primary-800 text-[24px] md:text-[48px] font-bold ${raleway.className}`}>
              MPP
            </h1>

            <h3
              className={`${raleway.className} font-semibold text-[12px] md:text-[20px] text-secondary-700`}>
              MAL PELAYANAN PUBLIK
            </h3>

            <h3
              className={`${raleway.className} font-normal text-neutral-800 text-[14px] md:text-[20px]`}>
              Lampung Timur
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full justify-center mt-[32px] md:mt-[48px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2">
              <div className="flex flex-col gap-[8px]">
                <div className="flex justify-between rounded-[50px] bg-white text-[14px] w-full h-[40px] font-normal outline outline-1 outline-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <FormComponents
                    form={form.control}
                    classStyle="rounded-[50px] border-none outline-none text-[14px] w-full h-[40px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="NIK"
                    label="login"
                    type="text"
                    name="nik"
                  />

                  <div className="p-2">
                    <UserRound className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                  </div>
                </div>

                <div className="flex justify-between rounded-[50px] bg-white text-[14px] w-full h-[40px] font-normal outline outline-1 outline-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <FormComponents
                    form={form.control}
                    classStyle="rounded-[50px] border-none outline-none text-[14px] w-full h-[40px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="Password"
                    label="login"
                    type={!seen ? "text" : "password"}
                    name="password"
                  />

                  <div onClick={() => setSeen(!seen)} className="p-2">
                    {seen ? (
                      <EyeOff className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    ) : (
                      <Eye className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-1 items-end justify-end mt-[8px] md:mt-[24px]">
                <p className="flex flex-row gap-1 text-end font-normal text-[12px] md:text-[14px]">
                  Belum Punya akun? Silahkan
                </p>

                <Link
                  href="/register"
                  className="text-[12px] md:text-[14px] font-bold text-primary-800 border-b border-b-primary-800">
                  Daftar
                </Link>
              </div>

              <div className="h-[72px] flex justify-center items-end">
                <Button
                  className="text-[14px] font-normal"
                  type="submit"
                  variant="primary">
                  Masuk
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
