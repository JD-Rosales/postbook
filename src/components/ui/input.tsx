import React from "react";

import { cn } from "@lib/utils";
import { IconType } from "react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helpterText?: string;
  error?: boolean;
  icon?: IconType;
  iconPosition?: "start" | "end";
  iconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      name,
      icon: Icon,
      iconPosition = "start",
      iconClick,
      helpterText,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="relative">
          <input
            type={type}
            name={name}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent mt-2 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              `${Icon && iconPosition === "start" ? "ps-11" : "pr-11"}`,
              className
            )}
            ref={ref}
            {...props}
          />
          {Icon && (
            <Icon
              size={20}
              onClick={iconClick}
              className={`
              absolute
              text-slate-400
              top-2.5 
              ${iconPosition === "start" ? "left-3" : "right-3"}
              ${iconClick && "cursor-pointer"}
              `}
            />
          )}
          {helpterText && (
            <label
              htmlFor={name}
              className={`flex ps-3  ${
                error ? "text-rose-500" : "text-slate-400"
              }`}
            >
              <small>{helpterText}</small>
            </label>
          )}
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
