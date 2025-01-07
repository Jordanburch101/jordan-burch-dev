import { NextResponse } from 'next/server'

const GITHUB_API_URL = 'https://api.github.com/graphql'
const CACHE_TIME = 12 * 60 * 60 * 1000 // 12 hours in milliseconds

let cachedData: any = null
let lastFetchTime: number = 0

async function fetchGitHubContributions(username: string, year: number) {
  // Return empty data if we're in a build environment
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    return {
      totalContributions: 0,
      weeks: [],
    }
  }

  // Add check for GitHub token
  if (!process.env.GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN is not set')
    return {
      totalContributions: 0,
      weeks: [],
    }
  }

  const fromDate = new Date(year, 0, 1)
  const toDate = new Date(year, 11, 31)

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          username,
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        },
      }),
    })

    if (!response.ok) {
      console.error('GitHub API response not OK:', await response.text())
      return {
        totalContributions: 0,
        weeks: [],
      }
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API Errors:', data.errors)
      return {
        totalContributions: 0,
        weeks: [],
      }
    }

    return data.data.user.contributionsCollection.contributionCalendar
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return {
      totalContributions: 0,
      weeks: [],
    }
  }
}

export async function GET(request: Request) {
  // Return empty data if we're in a build environment
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    return NextResponse.json({
      totalContributions: 0,
      weeks: [],
    })
  }

  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const year = parseInt(searchParams.get('year') || '2024', 10)

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const currentTime = Date.now()

  // Check if we have valid cached data
  if (cachedData && currentTime - lastFetchTime < CACHE_TIME) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, max-age=43200, s-maxage=43200', // 12 hours
        'CDN-Cache-Control': 'public, max-age=43200, s-maxage=43200',
      },
    })
  }

  const contributionData = await fetchGitHubContributions(username, year)
  cachedData = contributionData
  lastFetchTime = currentTime

  return NextResponse.json(contributionData, {
    headers: {
      'Cache-Control': 'public, max-age=43200, s-maxage=43200', // 12 hours
      'CDN-Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  })
}
