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
};

export default function LayoutInputRadio({
  typeForm,
  valueForm,
  change,
  nameForm,
  labelName,
  placeholder,
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
          className="flex w-full border placeholder:opacity-[50%] border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed mb-[8px]"
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
          className="flex w-full border placeholder:opacity-[50%] border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
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
          placeholder={placeholder}
          className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
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

        <div className="flex flex-row items-center space-x-2">
          <Input
            value={valueForm}
            onChange={change}
            name={nameForm}
            type="radio"
            placeholder={placeholder}
            className="flex w-[15px] border border-neutral-700 h-[15px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />

          <Label className="text-neutral-700 text-[14px] font-normal">
            Option A
          </Label>
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
          className="flex w-full border border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
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
