import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-white/[0.08] bg-secondary shadow-xs hover:bg-card hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-white/[0.05] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        duo: "bg-gradient-to-r from-teal to-teal-dark border-2 border-teal-btn border-b-4 text-teal-fg font-extrabold uppercase tracking-wide hover:brightness-110 active:border-b-2 active:translate-y-[2px] active:mb-[2px]",
        "duo-red": "bg-gradient-to-r from-rose to-rose-dark border-2 border-rose-btn border-b-4 text-white font-extrabold uppercase tracking-wide hover:brightness-110 active:border-b-2 active:translate-y-[2px] active:mb-[2px]",
        "duo-blue": "bg-gradient-to-r from-ocean to-ocean-dark border-2 border-ocean-btn border-b-4 text-white font-extrabold uppercase tracking-wide hover:brightness-110 active:border-b-2 active:translate-y-[2px] active:mb-[2px]",
        "duo-outline": "bg-secondary border-2 border-teal/15 border-b-4 text-foreground font-bold hover:bg-card hover:border-teal/25 active:border-b-2 active:translate-y-[2px] active:mb-[2px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        duo: "h-14 px-8 rounded-2xl text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
