import Link from 'next/link'
import { CodeIcon } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <CodeIcon className="h-6 w-6" />
      <span className="font-bold text-xl">JordanBurch</span>
    </Link>
  )
}
