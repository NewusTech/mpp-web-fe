"use client";
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

export default function FormComponents({
  type,
  form,
  placeholder,
  label,
  name,
  classStyle,
  labelStyle,
}: {
  type: string;
  form: any;
  placeholder: string;
  label: string;
  name: string;
  classStyle: string;
  labelStyle: string;
}) {
  if (type === "text" && label === "register") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                className={`${classStyle}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "text" && label === "login") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                className={`${classStyle}`}
                placeholder={placeholder}
                required
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "text" && name === "nik" && label !== "register") {
    return (
      <FormField
        control={form}
        name={name}
        disabled
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
              <Input
                type="text"
                className={`${classStyle} border border-neutral-700 pl-[16px]`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "text") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
              <Input
                type="text"
                className={`${classStyle} border border-neutral-700 pl-[16px]`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "password" && label === "login") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="password"
                autoComplete="true"
                className={`${classStyle}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "password") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="password"
                autoComplete="true"
                className={`${classStyle}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "file") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="file"
                className="flex absolute opacity-0 hover:bg-[#7BBA78] hover:text-[#FEFEFE] w-[80px] h-[25px] border border-[#FEFEFE] text-[#7BBA78] py-[10px]"
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "textarea" && label === "register") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                className={`${classStyle}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "textarea") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
              <Textarea
                className={`${classStyle}`}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if ((type === "select" && name === "kecamatan_id") || name === "desa_id") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "select") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (type === "radio") {
    return (
      <FormField
        control={form}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label className={`${labelStyle}`}>{label}</Label>
            <FormControl>
              <RadioGroup className="flex flex-row">
                <div className="grid grid-cols-4 place-items-center">
                  <div className="flex flex-col items-center">
                    <Label className="text-[10px] font-normal">
                      Tidak Sesuai
                    </Label>
                    <RadioGroupItem className={`${classStyle}`} value="1" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-[10px] font-normal">
                      Kurang Sesuai
                    </Label>
                    <RadioGroupItem className={`${classStyle}`} value="2" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-[10px] font-normal">Sesuai</Label>
                    <RadioGroupItem className={`${classStyle}`} value="3" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-[10px] font-normal">
                      Sangat Sesuai
                    </Label>
                    <RadioGroupItem className={`${classStyle}`} value="4" />
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <>
      <Input type="text" placeholder={placeholder} name={name} />
    </>
  );
}
