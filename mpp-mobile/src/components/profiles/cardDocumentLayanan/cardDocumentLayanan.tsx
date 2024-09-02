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
      <div className="flex flex-col md:flex-row self-center items-end w-full justify-end">
        {document.fileoutput && (
          <Link
            href={document?.fileoutput}
            target="_blank"
            className="flex items-center w-10/12 md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] md:text-[14px] mb-1.5 md:mb-0 mx-0 md:mx-1 bg-primary-700 hover:bg-primary-600 hover:text-neutral-50 text-neutral-50 py-[10px] cursor-pointer">
            Surat Rekomendasi
          </Link>
        )}
        {document.filesertif && (
          <Link
            href={document?.filesertif}
            target="_blank"
            className="flex items-center w-10/12 md:w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] md:text-[14px] mx-0 md:mx-1 bg-primary-700 hover:bg-primary-600 hover:text-neutral-50 text-neutral-50 py-[10px] cursor-pointer">
            Dokumen Hasil
          </Link>
        )}
      </div>
    </div>
  );
}
