import { Label } from "@radix-ui/react-label";
import React from "react";
import { Textarea } from "../ui/textarea";

interface LayoutInputProps {
  title: string;
  value: string;
  placeholder: string;
  type: string;
  required: boolean;
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error?: string;
  options?: [{ id: number; key: string }];
  opacity: boolean;
}

const LayoutInput: React.FC<LayoutInputProps> = ({
  title,
  value,
  placeholder,
  type,
  required,
  name,
  onChange,
  error,
  options,
  opacity,
}) => {
  return (
    <div className="space-y-2 flex flex-col w-full">
      <Label className="text-[14px] text-neutral-900 font-normal mb-[8px]">
        {title} {required && <span className="text-error-500">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`flex w-full border border-neutral-700 pl-[16px] text-[14px] rounded-xl placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed ${
            error ? "border-error-800" : "border-neutral-700"
          }`}
        />
      ) : type === "radio" ? (
        <>
          <div className="grid grid-cols-2 w-full justify-between">
            {options?.map((item, idx) => (
              <div key={idx} className="flex flex-row items-center space-x-2">
                <input
                  type="radio"
                  name={name}
                  value={item.id}
                  checked={value === item.id.toString()}
                  onChange={onChange}
                  className="flex w-[15px] border border-neutral-700 h-[15px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
                <label className="text-neutral-900 text-[14px] font-normal">
                  {item.key}
                </label>
              </div>
            ))}
          </div>
          {required && <div className="text-error-500">Data Wajib Diisi!</div>}
        </>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`flex flex-col justify-center pr-2 w-full md:h-[50px] border placeholder:opacity-[50%] ${
            opacity ? "text-neutral-900 text-[14px]" : "text-neutral-900"
          } border-neutral-700 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[12px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed ${
            error ? "border-error-800" : "border-neutral-700"
          }`}
        />
      )}
      {error && <p className="text-error-500 text-sm">{error}</p>}
    </div>
  );
};

export default LayoutInput;
