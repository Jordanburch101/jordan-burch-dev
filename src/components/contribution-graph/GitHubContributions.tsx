'use client'

import { ContributionGraph } from '.'
import { useEffect, useState } from 'react'

export function GitHubContributions({ username, year }: { username: string; year: number }) {
  const [data, setData] = useState<any[]>([])
  const [totalContributions, setTotalContributions] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/github-contributions?username=${username}&year=${year}`,
          {
            cache: 'no-store',
          },
        )
        const contributionData = await response.json()

        const formattedData = contributionData.weeks.flatMap((week: any) =>
          week.contributionDays.map((day: any) => ({
            date: day.date,
            count: day.contributionCount,
          })),
        )

        setData(formattedData)
        setTotalContributions(contributionData.totalContributions)
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error)
      }
    }

    fetchData()
  }, [username, year])

  return <ContributionGraph data={data} year={year} totalContributions={totalContributions} />
}
