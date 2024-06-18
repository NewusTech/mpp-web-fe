"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormComponents from "@/components/others/formComponents/formComponents";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { userRegister } from "@/store/action/actionRegister";
import { Eye, EyeOff } from "lucide-react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const formSchema = z.object({
  name: z
    .string({ message: "Name can not be empty" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  nik: z
    .string({ message: "NIK can not be empty" })
    .min(16, { message: "NIK must be at least 16 characters" })
    .max(16, { message: "NIK must be less than 16 characters" }),
  telepon: z
    .string({ message: "Phone number can not be empty" })
    .min(9, { message: "Phone number must be at least 9 characters" })
    .max(13, { message: "Phone number must be less than 13 characters" }),
  email: z
    .string({ message: "Email can not be empty" })
    .email({ message: "Email must be email format" }),
  password: z
    .string({ message: "Password must be more than 2 characters" })
    .min(2, { message: "Password must be more than 2 characters" }),
  kec: z.string({ message: "Subdistrict can not be empty" }),
  desa: z.string({ message: "Village can not be empty" }),
  rt: z.string({ message: "RT can not be empty" }),
  rw: z.string({ message: "RW can not be empty" }),
  alamat: z.string({ message: "Address can not be empty" }),
  role_id: z.number({ message: "Role can not be empty" }),
});

export default function RegisterScreen() {
  const dispatch: Dispatch<any> = useDispatch();
  const router = useRouter();
  const [seen, setSeen] = useState(true);

  useEffect(() => {
    const token = Cookies.get("Authorization");

    if (token) {
      router.push("/");
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nik: "",
      email: "",
      password: "",
      telepon: "",
      kec: "",
      desa: "",
      rt: "",
      rw: "",
      alamat: "",
      role_id: 3,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      name: values.name,
      nik: values.nik,
      email: values.email,
      password: values.password,
      telepon: values.telepon,
      kec: values.kec,
      desa: values.desa,
      rt: values.rt,
      rw: values.rw,
      alamat: values.alamat,
      role_id: 3,
    };

    try {
      dispatch(userRegister(formData));

      toast.success("Berhasil membuat akun, silahkan login", {
        duration: 1000,
      });

      return router.push("/login");
    } catch (error: any) {
      console.log(error);

      toast(error.message);
    }
  };

  return (
    <div className="flex justify-center md:py-[60px] items-center bg-gradient-to-tr from-[#FAEBBC] from-[-20%] to-[#7bba78] to-90% w-screen md:w-full md:h-full">
      <div className="flex flex-col gap-[4px] md:w-full rounded-2xl bg-primary-200 px-[32px] mx-[32px] md:mx-[250px] my-[45px] md:my-0 md:px-[60px]">
        <div className="flex flex-col pt-[32px]">
          <h6 className="text-primary-800 text-[16px] md:text-[28px] font-semibold mb-[4px]">
            DAFTAR
          </h6>

          <div className="flex flex-row items-start justify-start gap-1">
            <p className="flex flex-row gap-1 font-normal text-[12px] md:text-[16px] text-neutral-800">
              Sudah Punya akun? Silahkan
            </p>
            <Link
              href="/login"
              className="text-[12px] md:text-[16px] font-bold text-primary-800 border-b border-b-primary-800">
              Masuk
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:w-full h-full mt-[20px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:w-full">
              <div className="flex flex-col md:w-full md:flex-none md:grid md:grid-cols-2">
                <div className="flex flex-col">
                  <h5 className="text-[12px] md:text-[18px] text-primary-800 font-semibold mb-[16px] md:mb-[12px]">
                    Data Diri
                  </h5>

                  <div className="grid grid-rows-4 md:w-full gap-4 place-items-center md:place-items-start">
                    <div className="md:w-full">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[225px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Nama Lengkap"
                        label="register"
                        type="text"
                        name="name"
                      />
                    </div>

                    <div className="md:w-full">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[225px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="NIK"
                        label="register"
                        type="text"
                        name="nik"
                      />
                    </div>

                    <div className="md:w-full">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[225px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Nomor Telepon"
                        label="register"
                        type="text"
                        name="telepon"
                      />
                    </div>

                    <div className="md:w-full">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[225px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Email"
                        label="register"
                        type="text"
                        name="email"
                      />
                    </div>

                    <div className="flex justify-between rounded-[50px] bg-white text-[14px] w-full h-[40px] font-normal outline outline-1 outline-neutral-700 placeholder:text-[14px] placeholder:text-neutral-700">
                      <FormComponents
                        form={form.control}
                        classStyle="w-full md:w-full pl-[16px] h-[40px] border-none outline-none text-[14px] mr-4 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Password"
                        label="register"
                        type={!seen ? "text" : "password"}
                        name="password"
                      />

                      <div onClick={() => setSeen(!seen)} className="p-2">
                        {seen ? (
                          <EyeOff className="text-neutral-700 w-[20px] h-[20px] cursor-pointer" />
                        ) : (
                          <Eye className="text-neutral-700 w-[20px] h-[20px] cursor-pointer" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[16px] md:mt-0 md:pl-4">
                  <h3 className="text-[12px] md:text-[18px] text-primary-800 font-semibold mb-[16px] md:mb-[12px]">
                    Alamat
                  </h3>

                  <div className="flex flex-col md:w-full space-y-4 place-items-center md:place-items-start">
                    <div className="grid grid-cols-2 md:w-full gap-[16px]">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[105px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Kecamatan"
                        label="register"
                        type="text"
                        name="kec"
                      />

                      <FormComponents
                        form={form.control}
                        classStyle="w-[105px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Desa"
                        label="register"
                        type="text"
                        name="desa"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:w-full gap-[16px]">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[105px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="RT"
                        label="register"
                        type="text"
                        name="rt"
                      />

                      <FormComponents
                        form={form.control}
                        classStyle="w-[105px] md:w-full pl-[16px] h-[40px] border border-neutral-700 placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="RW"
                        label="register"
                        type="text"
                        name="rw"
                      />
                    </div>

                    <div className="md:w-full">
                      <FormComponents
                        form={form.control}
                        classStyle="w-[226px] md:w-full h-[74px] md:h-[150px] text-[12px] placeholder:opacity-[70%]"
                        labelStyle="text-[12px] text-neutral-900 font-semibold"
                        placeholder="Alamat"
                        label="register"
                        type="textarea"
                        name="alamat"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-end my-[32px]">
                <Button
                  type="submit"
                  className="md:w-[120px] md:h-[40px] md:text-[14px] md:font-semibold"
                  variant="neutral">
                  Daftar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
