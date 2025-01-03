// import { HeaderClient } from './Component.client'
// import { getCachedGlobal } from '@/utilities/getGlobals'
// import React from 'react'

// import type { Header } from '@/payload-types'

// export async function Header() {
//   const headerData: Header = await getCachedGlobal('header', 1)()

//   return <HeaderClient data={headerData} />
// }

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { HeaderNav } from './navigation-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <HeaderNav />
        <div className="ml-auto flex items-center space-x-4">
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}
