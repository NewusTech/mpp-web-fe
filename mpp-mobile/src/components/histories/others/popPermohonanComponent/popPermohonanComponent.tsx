import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PopUpPermohonanComponent from "../popUpPermohonanComponent/popUpPermohonanComponent";

export default function PopPermohonanComponent() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Download className="text-[#656565] w-[15px] h-[15px]" />
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-between w-[325px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex w-full">
              <div className="grid grid-cols-2 mx-[32px] my-[10px]">
                <h5 className="text-[20px] text-start text-primary-800 font-semibold">
                  Nomor Permohonan
                </h5>

                <h5 className="text-[20px] text-end text-success-700 font-semibold">
                  Status
                </h5>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div>
            <PopUpPermohonanComponent />
          </div>

          <div className="flex justify-center items-end mx-[10px] mb-[10px] mt-[24px]">
            <Button type="submit" variant="link">
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
