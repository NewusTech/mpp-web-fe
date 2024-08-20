"use client";

import google from "@/../../public/assets/google-color.png";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye, UserRound, Loader } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormComponents from "@/components/others/formComponents/formComponents";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import { TermType } from "@/types/type";
import TermCondition from "@/components/fetching/termCond/termCond";
import Swal from "sweetalert2";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const formSchema = z.object({
  nik: z
    .string({ message: "Email/NIK/No-Telepon Tidak Boleh Kosong!" })
    .min(5, { message: "Email/NIK/No-Telepon harus lebih dari 5 karakter" }),
  password: z
    .string({ message: "Password harus lebih dari 6 karakter" })
    .min(6, { message: "Password harus lebih dari 6 karakter" }),
});

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [term, setTerm] = useState<TermType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const fetchTerm = async () => {
    try {
      const terms = await TermCondition();
      setTerm(terms.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTerm();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
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
        Swal.fire({
          icon: "success",
          title: "Login berhasil!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login gagal. Periksa NIK dan password Anda.",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: `${error.message}`,
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgree = () => {
    setIsDialogOpen(false);
  };

  return (
    <section className="flex justify-center items-center bg-gradient-to-bl from-neutral-50 from-[-40%] via-primary-700 via-99% to-neutral-700 to-[120%] w-screen h-screen md:w-screen">
      <div className="flex flex-col w-11/12 md:w-6/12 gap-[10px] md:gap-0 items-center md:items-start justify-center md:justify-start rounded-xl bg-primary-200 px-8 py-6 md:py-12 md:px-20">
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center w-full gap-y-3">
          <div className="w-full flex flex-row justify-center">
            <Image
              src={logo}
              alt="Lampung Timur"
              className="w-full h-full"
              width={300}
              height={100}
            />
          </div>

          <div className="flex flex-col pl-[23px] justify-center items-center">
            <h3
              className={`${raleway.className} font-semibold text-[12px] md:text-[20px] text-primary-700`}>
              MAL PELAYANAN PUBLIK
            </h3>

            <h3
              className={`${raleway.className} font-normal text-primary-800 text-[14px] md:text-[16px]`}>
              Kabupaten Lampung Timur
            </h3>
          </div>
        </Link>

        <div className="flex flex-col w-full justify-center mt-8 md:mt-12 gap-y-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-y-4">
                <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <div className="w-full">
                    <FormComponents
                      form={form.control}
                      classStyle="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                      labelStyle="text-[12px] text-neutral-900 font-semibold"
                      placeholder="Email/NIK/No-Telepon"
                      label="login"
                      type="text"
                      name="nik"
                    />
                  </div>

                  <div className="p-2">
                    <UserRound className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                  </div>
                </div>
                {form.formState.errors.nik && (
                  <p className="text-destructive text-[14px] text-error-700 mb-1">
                    {form.formState.errors.nik.message}
                  </p>
                )}

                <div className="flex rounded-[50px] bg-neutral-50 text-[14px] w-full h-[40px] font-normal border border-primary-700 placeholder:text-[14px] placeholder:text-neutral-700">
                  <div className="w-full">
                    <FormComponents
                      form={form.control}
                      classStyle="rounded-[50px] border-none outline-none text-[14px] w-full h-[38px] pl-[15px] py-[10px] font-normal placeholder:text-[14px] focus:outline-none active:border-none focus:border-none active:outline-none placeholder:text-neutral-700"
                      labelStyle="text-[12px] text-neutral-900 font-semibold"
                      placeholder="Password"
                      label="login"
                      type={!seen ? "text" : "password"}
                      name="password"
                    />
                  </div>

                  <div onClick={() => setSeen(!seen)} className="p-2">
                    {seen ? (
                      <EyeOff className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    ) : (
                      <Eye className="text-primary-700 w-[20px] h-[20px] cursor-pointer" />
                    )}
                  </div>
                </div>
                {form.formState.errors.password && (
                  <p className="text-destructive text-[14px] text-error-700 mb-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:gap-1 items-end justify-end mt-2">
                <Link
                  href="/forgot-password"
                  className="text-[12px] md:text-[14px] underline font-normal text-primary-700">
                  Lupa Kata Sandi?
                </Link>

                <div className="flex flex-row gap-1 text-end text-neutral-800 font-normal text-[12px] md:text-[14px]">
                  Belum Punya akun? Silahkan
                  <Link
                    href="/register"
                    className="text-[12px] md:text-[14px] font-bold text-primary-800 underline">
                    Daftar
                  </Link>
                </div>
              </div>

              <div className="flex justify-center items-start">
                <Button
                  className="text-[14px] font-normal"
                  type="submit"
                  variant="primary"
                  disabled={isLoading ? true : false}>
                  {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
                </Button>
              </div>
            </form>
          </Form>

          <div className="w-full flex flex-row items-center">
            <div className="w-full h-[0.5px] bg-neutral-800"></div>

            <div className="w-5/12">
              <p className="text-center text-neutral-800">Atau</p>
            </div>

            <div className="w-full h-[0.5px] bg-neutral-800"></div>
          </div>

          <div className="w-8/12 flex items-center justify-center self-center">
            <Button className="border border-neutral-700 rounded-full bg-neutral-50 shadow-md w-full flex flex-row items-center py-6 gap-x-1 md:gap-x-0">
              <div className="w-2/12 flex items-center">
                <Image
                  src={google}
                  alt="Google Login"
                  width={30}
                  height={30}
                  className="w-full h-full"
                />
              </div>

              <p className="text-primary-800 font-semibold text-[12px] md:text-[14px]">
                Masuk Dengan Google
              </p>
            </Button>
          </div>
        </div>

        <div className="w-full text-center text-primary-700 text-[14px] md:mt-8">
          Dengan mendaftar, Anda menyetujui{" "}
          {term && (
            <Dialog open={isDialogOpen}>
              <DialogTrigger
                className="text-primary-800 font-semibold hover:underline"
                onClick={() => setIsDialogOpen(true)}>
                Syarat & Ketentuan
              </DialogTrigger>
              <DialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                  <div>{term && parse(term?.desc_text)}</div>

                  <div
                    onClick={handleAgree}
                    className="bg-primary-700 text-center cursor-pointer w-4/12 rounded-full text-neutral-50 py-1 px-5">
                    Setuju
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}{" "}
          kami dan Anda telah membaca{" "}
          {term && (
            <Dialog open={isDialogOpen}>
              <DialogTrigger
                className="text-primary-800 font-semibold hover:underline"
                onClick={() => setIsDialogOpen(true)}>
                Kebijakan Privasi
              </DialogTrigger>
              <DialogContent className="flex flex-col bg-neutral-50 rounded-xl p-1 justify-center items-center w-10/12 md:w-4/12 max-h-[550px]">
                <div className="m-3 px-4 flex flex-col items-center w-full verticalScroll gap-y-6">
                  <div>{term && parse(term?.privasi_text)}</div>

                  <div
                    onClick={handleAgree}
                    className="bg-primary-700 text-center cursor-pointer w-4/12 rounded-full text-neutral-50 py-1 px-5">
                    Setuju
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}{" "}
          kami.
        </div>
      </div>
    </section>
  );
}
