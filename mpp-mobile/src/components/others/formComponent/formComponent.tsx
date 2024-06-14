import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default function FormComponent({
  placeholder,
  label,
  form,
  type,
  name,
}: {
  placeholder: string;
  label: string;
  form: any;
  type: string;
  name: string;
}) {
  return (
    <>
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            {type === "select" ||
            label === "register" ||
            placeholder === "Jam" ||
            placeholder === "Tanggal" ||
            placeholder === "upload" ? (
              <></>
            ) : type === "radio" ? (
              <Label className="flex text-center font-normal text-primary-800 text-[12px] mb-[16px]">
                {label}
              </Label>
            ) : placeholder === "placeholder" ? (
              <Label className="text-[12px] text-neutral-900 font-light">
                {label}
              </Label>
            ) : (
              <Label className="text-[12px] text-neutral-900 font-semibold">
                {label}
              </Label>
            )}
            <FormControl>
              {type === "input" && placeholder === "placeholder" ? (
                <Input
                  type="text"
                  className="flex w-[248px] h-[36px] pl-[16px] rounded-[50px] placeholder:text-[#fefefe] placeholder:text-[14px] placeholder:opacity-[50%] mt-[8px] outline outline-1 outline-[#C4C4C4] text-[14px] font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={placeholder}
                  {...field}
                />
              ) : type === "input" && label === "register" ? (
                <Input
                  type="text"
                  className="flex h-[40px] placeholder:pl-[12px] w-full pl-[12px] text-[12px]"
                  autoComplete="true"
                  placeholder={placeholder}
                  {...field}
                />
              ) : type === "input" ? (
                <>
                  {placeholder === "Jam" || placeholder === "Tanggal" ? (
                    <Input
                      type="text"
                      className="flex h-[52px] rounded-none placeholder:text-neutral-700 placeholder:text-[14px] outline-0 border-b border-neutral-800 text-[14px] font-normal active:border-none focus:border-none active:outline-none focus:outline-none"
                      placeholder={placeholder}
                      {...field}
                    />
                  ) : (
                    <Input
                      className="w-full h-[30px] placeholder:pl-[16px]"
                      type="text"
                      placeholder={placeholder}
                      {...field}
                    />
                  )}
                </>
              ) : type === "file" ? (
                <Input
                  type="file"
                  className="flex absolute opacity-0 hover:bg-[#7BBA78] hover:text-[#FEFEFE] w-[80px] h-[25px] border border-[#FEFEFE] text-[#7BBA78] py-[10px]"
                  placeholder={placeholder}
                  {...field}
                />
              ) : type === "textarea" && placeholder === "placeholder" ? (
                <Textarea
                  className="h-[99px] w-[248px] placeholder:text-[14px]"
                  placeholder={placeholder}
                  {...field}
                />
              ) : type === "textarea" ? (
                <Textarea
                  className="w-[258px] h-[74px] text-[12px]"
                  placeholder={placeholder}
                  {...field}
                />
              ) : type === "select" && placeholder === "Pilih Layanan" ? (
                <Select>
                  <SelectTrigger className="flex w-[289px] opacity-[50%] h-[40px] items-center outline outline-1 outline-[#656565] border border-[#656565] justify-between rounded-[50px] border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              ) : type === "select" ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              ) : type === "radio" ? (
                <RadioGroup className="flex flex-row">
                  <div className="grid grid-cols-4 place-items-center">
                    <div className="flex flex-col items-center">
                      <Label className="text-[10px] font-normal">
                        Tidak Sesuai
                      </Label>
                      <RadioGroupItem
                        className="w-[50px] h-[50px]"
                        value="option-one"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <Label className="text-[10px] font-normal">
                        Kurang Sesuai
                      </Label>
                      <RadioGroupItem
                        className="w-[50px] h-[50px]"
                        value="option-two"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <Label className="text-[10px] font-normal">Sesuai</Label>
                      <RadioGroupItem
                        className="w-[50px] h-[50px]"
                        value="option-three"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <Label className="text-[10px] font-normal">
                        Sangat Sesuai
                      </Label>
                      <RadioGroupItem
                        className="w-[50px] h-[50px]"
                        value="option-four"
                      />
                    </div>
                  </div>
                </RadioGroup>
              ) : (
                <div>djdbajfbj</div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
