"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/legacy/image";

export default function CardDocumentPendukung({
  document,
}: {
  document: { name: string; value: string };
}) {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <div className="flex flex-row justify-between w-full h-[80px] rounded-xl mb-[8px] bg-neutral-50 border border-primary-700 px-4">
        <div className="flex flex-col w-full justify-center gap-[9px]">
          <h6 className="text-[12px] md:text-[14px] text-primary-800 font-semibold">
            {document.name}
          </h6>
        </div>
        <div className="flex self-center items-center w-full justify-end">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center w-full px-4 h-[25px] md:h-[40px] rounded-full justify-center font-normal text-[12px] md:text-[14px] bg-primary-700 hover:bg-primary-600 text-neutral-50 py-2 cursor-pointer">
                Lihat File
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-between w-full bg-neutral-50">
              <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 z-50">
                <div className="bg-primary-100 rounded-xl shadow-md w-10/12 md:max-w-full">
                  <div className="w-full h-full p-4 rounded-xl">
                    {document && (
                      <Image
                        src={document?.value}
                        alt={document.name}
                        className="w-full h-full object-contain rounded-xl"
                        width={500}
                        height={500}
                      />
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {/* <Link
              href={"/documents"}
              // href={document.fileoutput}
              target="_blank"
              className="flex items-center w-5/12 h-[25px] md:h-[40px] rounded-[50px] justify-center font-normal text-[11px] md:text-[14px] bg-primary-700 hover:bg-primary-600 hover:text-neutral-50 text-neutral-50 py-[10px] cursor-pointer">
              Lihat
            </Link> */}
        </div>
      </div>
    </div>
  );
}
