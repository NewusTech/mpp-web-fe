"use client";

import FormComponents from "@/components/others/formComponents/formComponents";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchProfile from "@/components/fetching/profile/profile";
import { useDispatch } from "react-redux";
import { updateProfileUser } from "@/store/action/actionUpdateProfile";
import { Dispatch } from "redux";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string({ message: "Name can not be empty" })
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  telepon: z
    .string({ message: "Phone number can not be empty" })
    .min(9, { message: "Phone number must be at least 9 characters" })
    .max(13, { message: "Phone number must be less than 13 characters" }),
  email: z
    .string({ message: "Email can not be empty" })
    .email({ message: "Email must be email format" }),
  kec: z.string({ message: "Subdistrict can not be empty" }),
  desa: z.string({ message: "Village can not be empty" }),
  rt: z.string({ message: "RT can not be empty" }),
  rw: z.string({ message: "RW can not be empty" }),
  alamat: z.string({ message: "Address can not be empty" }),
});

interface UserType {
  id?: number;
  name?: string;
  nik?: string;
  telepon?: string;
  email?: string;
  kec?: string;
  desa?: string;
  rt?: string;
  rw?: string;
  alamat?: string;
}

export default function ProfileEditPage({
  params,
}: {
  params: { id: number };
}) {
  const dispatch: Dispatch<any> = useDispatch();
  const [detail, setDetail] = useState<UserType | undefined>({
    id: 0,
    name: "",
    nik: "",
    telepon: "",
    email: "",
    kec: "",
    desa: "",
    rt: "",
    rw: "",
    alamat: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);

  const fetchUser = async (id: number) => {
    try {
      const result = await fetchProfile(id);

      setDetail(result.data);
      setIsDataFetched(true);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchUser(params.id);
  }, [params.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      telepon: "",
      email: "",
      kec: "",
      desa: "",
      rt: "",
      rw: "",
      alamat: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (isDataFetched && detail) {
      form.reset({
        name: detail?.name || "",
        telepon: detail?.telepon || "",
        email: detail?.email || "",
        kec: detail?.kec || "",
        desa: detail?.desa || "",
        rt: detail?.rt || "",
        rw: detail?.rw || "",
        alamat: detail?.alamat || "",
      });
    }
  }, [isDataFetched, detail, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      name: values.name,
      nik: detail?.nik || "",
      telepon: values.telepon,
      email: values.email,
      kec: values.kec,
      desa: values.desa,
      rt: values.rt,
      rw: values.rw,
      alamat: values.alamat,
    };

    try {
      dispatch(updateProfileUser(formData, detail?.id ?? 0));
      await fetchUser(params.id);
      router.push(`/profile/${params.id}`);
    } catch (error) {
      toast("Gagal mengupdate data!");
    }
  };

  return (
    <div className="flex items-center justify-center mt-[24px]">
      <div className="flex flex-col items-center w-full mx-[35px]">
        <div className="flex self-start mb-[32px]">
          <h5 className="text-[20px] font-bold text-primary-800">
            Edit Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg px-[15px] pt-[16px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col">
              <div className="flex flex-col w-full mb-[4px]">
                <FormComponents
                  form={form.control}
                  classStyle="w-full h-[30px]"
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
                <div className="flex items-center w-full h-[30px] border border-neutral-700 pl-[16px] rounded-2xl">
                  <p className="text-[14px] text-neutral-900 opacity-[100%]">
                    {detail?.nik}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full mb-[4px]">
                <FormComponents
                  form={form.control}
                  classStyle="w-full h-[30px]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                  placeholder="085764156224"
                  label="Nomor Telepon"
                  type="text"
                  name="telepon"
                />
              </div>

              <div className="flex flex-col w-full mb-[4px]">
                <FormComponents
                  form={form.control}
                  classStyle="w-full h-[30px]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                  placeholder="Qurrotaaini@gmail.com"
                  label="Email"
                  type="text"
                  name="email"
                />
              </div>

              <div className="grid grid-cols-2 w-full my-[4px]">
                <div className="flex flex-col w-[120px]">
                  <FormComponents
                    form={form.control}
                    classStyle="w-full h-[30px]"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="Way Halim"
                    label="Kecamatan"
                    type="text"
                    name="kec"
                  />
                </div>

                <div className="flex flex-col w-[120px]">
                  <FormComponents
                    form={form.control}
                    classStyle="w-full h-[30px]"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="Jagabaya"
                    label="Desa"
                    type="text"
                    name="desa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full my-[4px]">
                <div className="flex flex-col w-[120px]">
                  <FormComponents
                    form={form.control}
                    classStyle="w-full h-[30px]"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="01"
                    label="RT"
                    type="text"
                    name="rt"
                  />
                </div>

                <div className="flex flex-col w-[120px]">
                  <FormComponents
                    form={form.control}
                    classStyle="w-full h-[30px]"
                    labelStyle="text-[12px] text-neutral-900 font-semibold"
                    placeholder="00"
                    label="RW"
                    type="text"
                    name="rw"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full my-[4px]">
                <FormComponents
                  form={form.control}
                  classStyle="w-[258px] h-[74px] text-[12px]"
                  labelStyle="text-[12px] text-neutral-900 font-semibold"
                  placeholder="Jl. Pangeran Antasari"
                  label="Alamat"
                  type="textarea"
                  name="alamat"
                />
              </div>

              <div className="flex justify-center items-end self-end my-[16px]">
                <Button
                  className="w-[90px] h-[30px] text-[12px]"
                  type="submit"
                  variant="success">
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
