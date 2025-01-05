import Ripple from '@/components/ui/ripple'

type RippleBlockProps = {
  ripple: string
}

export function RippleBlock({ ripple }: RippleBlockProps) {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 animate-gradient-x text-transparent bg-clip-text">
        {ripple}
      </p>
      <Ripple />
    </div>
  )
}
