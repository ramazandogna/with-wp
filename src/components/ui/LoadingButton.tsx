"use client";
import * as React from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";


import type { ComponentProps } from "react";

export interface LoadingButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, ...props }, ref) => (
    <Button
      ref={ref}
      disabled={props.disabled || loading}
      aria-busy={loading}
      className="cursor-pointer disabled:cursor-not-allowed"
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  )
);
LoadingButton.displayName = "LoadingButton";
