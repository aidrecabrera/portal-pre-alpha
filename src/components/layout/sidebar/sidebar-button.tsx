import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

const sidebarButtonVariants = cva(
  'inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary/90 text-primary-foreground shadow hover:bg-primary',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-3 py-4',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-3',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarButtonVariants> {
  asChild?: boolean
  to?: string
}

const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ className, variant, size, asChild = false, to, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Link
        to={to}
        className={cn(sidebarButtonVariants({ variant, size, className }))}
        {...(to
          ? {
              activeProps: {
                className: `bg-primary/90 text-primary-foreground ${variant === 'ghost' ? 'hover:bg-primary hover:text-primary-foreground' : ''}`,
              },
            }
          : {})}
      >
        <Comp ref={ref} {...props} />
      </Link>
    )
  }
)
SidebarButton.displayName = 'SidebarButton'

export { SidebarButton, sidebarButtonVariants }
