"use client";

import { DocumentResultType, DocumentTerbitType } from "@/types/type";
import CardDocumentLayanan from "../cardDocumentLayanan/cardDocumentLayanan";
import Image from "next/legacy/image";

export default function CardDocumentInstansi({
  document,
}: {
  document: DocumentResultType;
}) {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="w-full">
        <h3 className="text-neutral-900 font-semibold text-[14px] md:text-[16px]">
          {document.instansi_name}
        </h3>
      </div>

      <div className="flex flex-col w-full gap-y-4">
        {document &&
          document.dokumen.length > 0 &&
          document?.dokumen.map((doc: DocumentTerbitType, i: number) => {
            return <CardDocumentLayanan key={i} document={doc} />;
          })}
      </div>
    </div>
  );
}
