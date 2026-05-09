import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const bodyVariants = cva(
  "text-primary-700",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      align: "left",
    },
  }
)

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {
  as?: "p" | "span" | "div"
}

const Body = React.forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, size, weight, align, as = "p", ...props }, ref) => {
    const Component = as
    return (
      <Component
        ref={ref}
        className={cn(bodyVariants({ size, weight, align }), className)}
        {...props}
      />
    )
  }
)
Body.displayName = "Body"

export { Body, bodyVariants }
