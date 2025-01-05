import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { HeaderNav } from './navigation-menu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { RainbowButton } from '@/components/ui/rainbow-button'

interface HeaderData {
  navItems: {
    link: {
      type?: 'reference' | 'custom' | null
      label: string
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: number | { id: string }
      } | null
      url?: string
    }
    id?: string
  }[]
}

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as HeaderData

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <HeaderNav navItems={headerData.navItems || []} />
        <div className="ml-auto flex items-center space-x-4">
          <RainbowButton>Get Started</RainbowButton>
        </div>
      </div>
    </header>
  )
}
