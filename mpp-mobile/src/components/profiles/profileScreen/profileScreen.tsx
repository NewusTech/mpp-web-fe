import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfileScreen({ profile }: any) {
  return (
    <div className="flex items-center justify-center w-full mt-[24px] mb-[24px] md:mb-0 md:pt-[24px] md:mt-[32px] md:pb-[70px] bg-primary-100">
      <div className="flex flex-col items-center w-full mx-[35px] md:mx-[200px]">
        <div className="flex self-start mb-[32px]">
          <h5 className="text-[20px] md:text-[26px] font-semibold text-primary-800">
            Profile
          </h5>
        </div>

        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg md:px-[75px] md:pt-[32px]">
          <div className="flex flex-col px-[16px] pt-[16px]">
            <div className="grid grid-rows-7 gap-[8px]">
              <div className="flex flex-col w-full mb-[4px] md:mb-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  Nama Lengkap
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile.name}
                </label>
              </div>

              <div className="flex flex-col w-full my-[4px] md:my-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  NIK
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile.nik}
                </label>
              </div>

              <div className="flex flex-col w-full my-[4px] md:my-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  Nomor Telepon
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile.telepon}
                </label>
              </div>

              <div className="flex flex-col w-full my-[4px] md:my-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  Email
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile.email}
                </label>
              </div>

              <div className="grid grid-cols-2 w-full my-[4px] md:my-2">
                <div className="flex flex-col">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Kecamatan
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile.kec}
                  </label>
                </div>

                <div className="flex flex-col pl-3">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    Desa
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile.desa}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 w-full my-[4px] md:my-2">
                <div className="flex flex-col">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    RT
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile.rt}
                  </label>
                </div>

                <div className="flex flex-col pl-3">
                  <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                    RW
                  </label>

                  <label className="text-[12px] md:text-[14px] text-neutral-900">
                    {profile.rw}
                  </label>
                </div>
              </div>

              <div className="flex flex-col w-full mt-[4px] md:my-2">
                <label className="text-[14px] md:text-[16px] font-semibold text-neutral-900 space-y-2">
                  Alamat
                </label>

                <label className="text-[12px] md:text-[14px] text-neutral-900">
                  {profile.alamat}
                </label>
              </div>
            </div>

            <Link
              href={`/profile/${profile.id}/detail/${profile.id}`}
              className="h-[72px] flex justify-center items-end md:items-center self-end md:self-center mb-[32px] md:mt-[32px]">
              <Button
                className="w-[90px] md:w-[290px] h-[30px] md:h-[40px] text-[12px] md:text-[16px] hover:text-neutral-50"
                type="submit"
                variant="secondary">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
