"use client";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye, UserRound, Loader } from "lucide-react";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import Image from "next/legacy/image";
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
import { TermType } from "@/types/type";
import TermCondition from "@/components/fetching/termCond/termCond";

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
    .string({ message: "Password must be more than 6 characters" })
    .min(6, { message: "Password must be more than 6 characters" }),
});

export default function LoginScreen() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [term, setTerm] = useState<TermType>();
  const [isLoading, setIsLoading] = useState(false);
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
      toast("Gagal Memuat Data!");
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
        toast.success("Login berhasil!", { duration: 1000 });
      } else {
        toast.error("Login gagal. Periksa NIK dan password Anda.");
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="md:container md:mx-auto flex justify-center items-center bg-gradient-to-bl from-neutral-50 from-[-40%] via-primary-700 via-99% to-neutral-700 to-[120%] w-screen h-screen md:min-w-full">
      <div className="flex flex-col w-full gap-[10px] md:gap-0 items-center md:items-start justify-center md:justify-start rounded-xl bg-primary-200 mx-8 my-[70px] md:my-0 p-[32px] md:py-[70px] md:px-[120px] md:mx-[300px]">
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

        <div className="flex flex-col w-full justify-center mt-8 md:mt-12">
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
                      placeholder="NIK"
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

              <div className="flex flex-col md:flex-row md:gap-1 items-end justify-end mt-[8px] md:mt-[24px]">
                <p className="flex flex-row gap-1 text-end text-neutral-800 font-normal text-[12px] md:text-[14px]">
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
                  {isLoading ? <Loader className="animate-spin" /> : "Masuk"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="w-full text-center text-primary-700 text-[14px] mt-8">
          Dengan mendaftar, Anda menyetujui{" "}
          {term && (
            <Link
              href={term?.desc}
              target="_blank"
              className="text-primary-800 font-semibold hover:underline">
              Syarat & Ketentuan{" "}
            </Link>
          )}{" "}
          kami dan Anda telah membaca{" "}
          {term && (
            <Link
              href={term?.privasi}
              target="_blank"
              className="text-primary-800 font-semibold hover:underline">
              Kebijakan Privasi{" "}
            </Link>
          )}{" "}
          kami.
        </div>
      </div>
    </section>
  );
}
