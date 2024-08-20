import React from "react";

export default function MobileNotifikasi() {
  return (
    <div className="w-full flex flex-col gap-y-2 border border-neutral-900 p-2 rounded-lg">
      <div className="w-full flex flex-row justify-between">
        <h5 className="text-neutral-900 font-semibold text-[16px]">
          Judul Notifikasi
        </h5>

        <p className="text-neutral-900 text-opacity-90 font-normal text-[14px]">
          Tanggal Notifikasi
        </p>
      </div>

      <p className="text-neutral-900 font-normal text-[14px]">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
        perspiciatis quidem minima dolores sit, debitis quas facilis vel
        suscipit tempore reiciendis ratione magnam, quo rem. Iste rerum illo
        inventore quod.
      </p>
    </div>
  );
}
