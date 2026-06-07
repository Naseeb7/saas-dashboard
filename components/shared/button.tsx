"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-border-custom bg-transparent text-sidebar-dark",
  secondary: "bg-sidebar text-surface",
  ghost: "border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "",
  md: "",
  lg: "",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          "flex items-center justify-center gap-2 rounded-[7px] px-3 py-2 text-xs font-medium leading-normal",
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && "opacity-50",
          className,
        )}
        {...props}
      >
        {loading ? <span aria-hidden="true">...</span> : leftIcon}
        {children && <span>{children}</span>}
        {rightIcon}
      </button>
    );
  },
);
