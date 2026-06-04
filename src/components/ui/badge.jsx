import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-black text-white',
        secondary: 'bg-gray-100 text-gray-600',
        destructive: 'bg-red-50 text-red-600 border border-red-200',
        outline: 'border border-gray-300 text-gray-600',
        teal: 'bg-green-50 text-[#00B14F] border border-green-200',
        pink: 'bg-black text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
