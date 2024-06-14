import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] w-[120px] h-[40px] text-[#FEFEFE] font-normal px-[36px] py-[10px] font-extrabold",
        neutral:
          "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] w-[120px] h-[40px] text-[#FEFEFE] font-semibold px-[36px] py-[10px] text-[14px]",
        secondary:
          "bg-[#FEFEFE] hover:bg-[#7BBA78] rounded-[50px] w-[290px] h-[40px] text-[#7BBA78] font-normal px-[130.5px] py-[9px] outline outline-1 outline-[#DEDEDE]",
        success:
          "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] w-[290px] h-[40px] text-[#FEFEFE] font-normal px-[114px] py-[9px] outline outline-1 outline-[#DEDEDE]",
        warning:
          "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] text-[#FEFEFE] font-normal text-[16px] py-[11px] px-[99.5px]",
        error:
          "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] w-[290px] h-[40px] text-[#FEFEFE] font-normalSemibold text-[16px] py-[9px] px-[126px]",
        link: "bg-[#7BBA78] hover:bg-[#3A6C38] rounded-[50px] w-[120px] h-[40px] text-[#FEFEFE] font-normalSemibold text-[14px] py-[9px] px-[126px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
