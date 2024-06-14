import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import PopUpAntrianComponent from "../popUpAntrianComponent/popUpAntrianComponent";

export default function PopAntrianComponent() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Download className="text-[#656565] w-[15px] h-[15px]" />
        </DialogTrigger>
        <DialogContent className="flex flex-col w-[290px] h-[290px]">
          <div>
            <PopUpAntrianComponent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
