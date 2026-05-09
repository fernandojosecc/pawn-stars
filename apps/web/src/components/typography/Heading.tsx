import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-bold tracking-tight text-primary-900",
  {
    variants: {
      level: {
        h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
        h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
        h3: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
        h4: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
        h5: "text-base sm:text-lg md:text-xl lg:text-2xl",
        h6: "text-sm sm:text-base md:text-lg lg:text-xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      level: "h2",
      align: "left",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, align, as, ...props }, ref) => {
    const Component = as || level || "h2"
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, align }), className)}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
