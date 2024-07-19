import React from "react";

export default function SearchComponent({ change, search }: any) {
  return (
    <input
      type="text"
      value={search}
      onChange={change}
      name="search"
      placeholder="Cari"
      className="text-neutral-900 w-full text-[14px] md:text-[16px] h-[40px] border border-neutral-700 active:border-neutral-600 focus:border-neutral-600 focus:outline-none active:outline-none placeholder:text-neutral-700 rounded-[50px] placeholder:text-[12px] pl-[16px]"
    />
  );
}
