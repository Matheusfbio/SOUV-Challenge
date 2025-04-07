import { cn } from "@/lib/utils"; // ou ajuste o import conforme seu projeto
import React from "react";

export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="progressbar" // ← isso aqui é essencial para o teste funcionar
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";
