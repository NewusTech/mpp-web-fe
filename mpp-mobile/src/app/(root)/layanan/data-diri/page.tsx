"use client";

import fetchProfile from "@/components/fetching/profile/profile";
import { Button } from "@/components/ui/button";
import { updateProfileUser } from "@/store/action/actionUpdateProfile";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import FormComponents from "@/components/others/formComponents/formComponents";
import { useRouter } from "next/navigation";
import { Dispatch } from "redux";
import { RootState } from "@/store/store";

interface JWT {
  userId: number;
}

type InfoType = {
  status: string;
  data: {
    name: string;
    nik: string;
    telepon: string;
    alamat: string;
  };
};

const formSchema = z.object({
  name: z
    .string({ message: "Name can not be empty" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  telepon: z
    .string({ message: "Phone number can not be empty" })
    .min(9, { message: "Phone number must be at least 9 characters" })
    .max(13, { message: "Phone number must be less than 13 characters" }),
  alamat: z.string({ message: "Address can not be empty" }),
});

export default function DataDiriPage() {
  const permohonan = useSelector((state: RootState) => state.permohonan);
  const dispatch: Dispatch<any> = useDispatch();
  const [info, setInfo] = useState<Partial<InfoType["data"]>>({
    name: "",
    nik: "",
    telepon: "",
    alamat: "",
  });
  const router = useRouter();

  const fetchUserInfo = async (id: number) => {
    try {
      const result = await fetchProfile(id);

      setInfo(result.data);
    } catch (error: any) {
      toast("Tidak berhasil mengupdate profile!");
    }
  };

  useEffect(() => {
    const auth = Cookies.get("Authorization");
    if (auth) {
      const decodedToken = jwtDecode<JWT>(auth);
      fetchUserInfo(decodedToken.userId);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: info.name,
      telepon: info.telepon,
      alamat: info.alamat,
    },
  });

  useEffect(() => {
    if (info) {
      form.reset({
        name: info?.name || "",
        telepon: info?.telepon || "",
        alamat: info?.alamat || "",
      });
    }
  }, [info, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      name: values.name,
      nik: info?.nik || "",
      telepon: values.telepon,
      alamat: values.alamat,
    };
    const auth = Cookies.get("Authorization");
    if (auth) {
      const decodedToken = jwtDecode<JWT>(auth);
      fetchUserInfo(decodedToken.userId);

      dispatch(updateProfileUser(formData, decodedToken.userId ?? 0));
      router.push(`/layanan/formulir`);
    }
  };

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center mx-[35px] mt-[24px] mb-[14px]">
      <div className="flex flex-col items-center gap-[16px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col justify-center">
            <h4 className="text-[20px] font-semibold text-primary-800">
              Permohonan Layanan
            </h4>
          </div>

          <div className="flex flex-row">
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

        <div className="flex flex-col w-full border border-neutral-700 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col mt-[22px] px-[21px]">
            <h5 className="text-[14px] font-semibold text-primary-800">
              Data Diri
            </h5>

            <div className="flex flex-col mt-[32px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col">
                  <div className="flex flex-col w-full mb-[4px]">
                    <FormComponents
                      form={form.control}
                      classStyle="w-full h-[40px]"
                      labelStyle="text-[12px] text-neutral-900 font-semibold"
                      placeholder="Qurotta Aini"
                      label="Nama Lengkap"
                      type="text"
                      name="name"
                    />
                  </div>

                  <div className="flex flex-col w-full mb-[4px]">
                    <p className="text-[12px] text-neutral-900 font-semibold mb-[4px] mt-[2px]">
                      NIk
                    </p>
                    <div className="flex items-center w-full h-[40px] border border-neutral-700 pl-[16px] rounded-[50px]">
                      <p className="text-[14px] text-neutral-900 opacity-[100%]">
                        {info?.nik}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full mb-[4px]">
                    <FormComponents
                      form={form.control}
                      classStyle="w-full h-[40px]"
                      labelStyle="text-[12px] text-neutral-900 font-semibold"
                      placeholder="085764156224"
                      label="Nomor Telepon"
                      type="text"
                      name="telepon"
                    />
                  </div>

                  <div className="grid grid-cols-2 w-full my-[4px]">
                    <FormComponents
                      form={form.control}
                      classStyle="w-[258px] h-[74px] text-[14px]"
                      labelStyle="text-[12px] text-neutral-900 font-semibold"
                      placeholder="Jl. Pangeran Antasari"
                      label="Alamat"
                      type="textarea"
                      name="alamat"
                    />
                  </div>

                  <div className="flex self-center h-[40px] w-[120px] mb-[19px] mt-[16px]">
                    <Button type="submit" variant="success">
                      Lanjut
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
