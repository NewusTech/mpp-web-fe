"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type LayoutFormType = {
  typeForm: string;
  valueForm: any;
  change: (e: any) => void;
  nameForm?: string;
  labelName: string;
  placeholder: string;
  opacity: boolean;
  dataRadio: [{ id: number; key: string }];
};

export default function LayoutInput({
  typeForm,
  valueForm,
  change,
  nameForm,
  labelName,
  placeholder,
  opacity,
  dataRadio,
}: LayoutFormType) {
  if (typeForm === "string") {
    return (
      <>
        <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
          {labelName}
        </Label>

        <Input
          value={valueForm}
          onChange={change}
          name={nameForm}
          type="text"
          placeholder={placeholder}
          className="flex w-full md:h-[50px] border placeholder:opacity-[50%] border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed mb-[8px]"
        />
      </>
    );
  }

  if (typeForm === "number") {
    return (
      <>
        <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
          {labelName}
        </Label>

        <Input
          value={valueForm}
          onChange={change}
          name={nameForm}
          type="number"
          placeholder={placeholder}
          className="flex w-full md:h-[50px] border placeholder:opacity-[50%] border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </>
    );
  }

  if (typeForm === "date") {
    return (
      <>
        <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
          {labelName}
        </Label>

        <Input
          value={valueForm}
          onChange={change}
          name={nameForm}
          type="date"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
          }}
          placeholder={placeholder}
          className={`${
            opacity
              ? "text-neutral-900 text-[14px]"
              : "text-gray-500 opacity-50"
          } flex appearance-none w-full border border-neutral-800 px-[16px] h-[36px] md:h-[50px] text-[12px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed`}
        />
      </>
    );
  }

  if (typeForm === "radio") {
    return (
      <>
        <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
          {labelName}
        </Label>

        <div className="grid grid-cols-2 w-full justify-between">
          {dataRadio.map((data: { id: number; key: string }, i: number) => {
            return (
              <div key={i} className="flex flex-row items-center space-x-2">
                <Input
                  value={valueForm}
                  onChange={() =>
                    change({ target: { name: nameForm, value: data.id } })
                  }
                  checked={valueForm === data.id}
                  name={nameForm}
                  type="radio"
                  placeholder={placeholder}
                  className="flex w-[15px] border border-neutral-700 h-[15px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />

                <Label className="text-neutral-700 text-[14px] font-normal">
                  {data.key}
                </Label>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (typeForm === "textarea") {
    return (
      <>
        <Label className="text-[12px] text-neutral-900 font-normal mb-[8px]">
          {labelName}
        </Label>

        <Textarea
          value={valueForm}
          onChange={change}
          placeholder={placeholder}
          name={nameForm}
          className="flex w-full border border-neutral-700 pl-[16px] text-[14px] rounded-xl placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </>
    );
  }

  return (
    <>
      <Label>Hello World</Label>

      <Input
        name="Hello"
        type="text"
        value="World"
        onChange={() => {
          console.log("Hello World");
        }}
      />
    </>
  );
}
