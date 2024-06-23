import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function ProfileEditInput({
  name,
  labelStyle,
  classStyle,
  labelName,
  change,
  value,
  placeholder,
  types,
}: {
  name: string;
  labelStyle: string;
  classStyle: string;
  labelName: string;
  change: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: string;
  placeholder: string;
  types: string;
}) {
  return (
    <>
      <Label className={`${labelStyle}`}>{labelName}</Label>

      <Input
        name={name}
        type={types}
        className={`${classStyle}`}
        onChange={change}
        value={value}
        placeholder={`${placeholder}`}
      />
    </>
  );
}
