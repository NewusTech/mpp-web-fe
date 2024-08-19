import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MobileSKMPage() {
  return (
    <div className="mobile-background-blend flex flex-row justify-center w-full">
      <div className="w-10/12 flex h-full flex-col md:flex-row items-center">
        <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
          <h2 className="font-semibold text-[18px] mt-8 md:mt-0 md:text-[26px] text-primary-800">
            Survey Kepuasan Masyarakat Mal Pelayanan Publik Lampung Timur
          </h2>

          <p className="font-normal text-center md:text-start text-[14px] text-primary-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            asperiores deserunt voluptate laboriosam magni, ipsa ratione et
            similique? Quam, accusantium repellat? Voluptates voluptatum
            assumenda atque. In officiis similique quisquam itaque.
          </p>

          <div className="w-full">
            <Button className="w-full md:w-7/12 font-normal py-6 text-[14px] md:text-[16px]">
              <Link href={`/survei/survei-mpp`}>
                Isi Survey Kepuasan Masyarakat ( SKM )
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full my-4 p-4 rounded-xl bg-primary-800 md:flex flex-col justify-center items-center">
          <h5 className="font-semibold text-center text-neutral-50 text-[18px]">
            Indeks Kepuasan Masyarakat
          </h5>

          <p className="font-semibold text-center text-[40px] text-neutral-50 py-4">
            89.19
          </p>

          <p className="font-normal text-center text-[14px] text-neutral-50">
            Sangat Baik
          </p>
        </div>
      </div>
    </div>
  );
}
