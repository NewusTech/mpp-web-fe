"use client";

import { Button } from "@/components/ui/button";
import { DocumentTerbitType } from "@/types/type";
import Link from "next/link";

export default function CardDocumentLayanan({
  document,
}: {
  document: DocumentTerbitType;
}) {
  return (
    <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-neutral-50 border border-primary-700 px-4">
      <div className="flex flex-col w-full justify-center gap-[9px]">
        <h6 className="text-[12px] md:text-[14px] text-primary-800 font-semibold">
          {document.layanan_name}
        </h6>
      </div>
      <div className="flex self-center items-center w-full justify-end">
        {document.fileoutput && (
          <Link
            href={document?.fileoutput}
            target="_blank"
            className="flex items-center w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] md:text-[14px] bg-primary-700 hover:bg-primary-600 hover:text-neutral-50 text-neutral-50 py-[10px] cursor-pointer">
            Lihat
          </Link>
        )}
      </div>
    </div>
  );
}
