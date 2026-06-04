import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
        destructive:
          'border border-red-200 text-red-600 hover:bg-red-50',
        outline:
          'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400',
        secondary:
          'bg-gray-100 text-gray-700 hover:bg-gray-200',
        ghost:
          'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
        link:
          'text-black underline-offset-4 hover:underline',
        teal:
          'bg-[#00B14F] text-white hover:bg-[#008C3C] active:bg-[#007A36]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-xl px-6 text-base',
        icon: 'h-9 w-9',
        'icon-sm': 'h-7 w-7 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
