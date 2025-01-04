import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ContributionGraph } from '@/components/contribution-graph'

async function getGitHubContributions(username: string, year: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/github-contributions?username=${username}&year=${year}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub contributions')
  }

  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }

  return data
}

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const username = 'Jordanburch101'
  const year = 2025
  const contributionData = await getGitHubContributions(username, year)

  const data = contributionData.weeks.flatMap((week: any) =>
    week.contributionDays.map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  )

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <ContributionGraph
            data={data}
            year={year}
            totalContributions={contributionData.totalContributions}
          />
        </Suspense>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
