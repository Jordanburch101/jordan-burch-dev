"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/utilities/cn"

interface ContributionData {
  date: string
  count: number
}

interface ContributionGraphProps {
  data: ContributionData[]
  year: number
  totalContributions: number
}

const DAYS: string[] = ["", "Mon", "", "Wed", "", "Fri", ""]
const MONTHS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const LEVELS: number[] = [0, 1, 2, 3, 4]

interface ProcessedDateItem {
  date: Date
  count: number
}

export function ContributionGraph({ data, year, totalContributions }: ContributionGraphProps) {
  const startDate = new Date(year, 0, 1)
  const endDate = new Date(year, 11, 31)
  const dates: ProcessedDateItem[] = []
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const found = data.find(item => item.date === d.toISOString().split('T')[0])
    dates.push({
      date: new Date(d),
      count: found?.count || 0
    })
  }

  const getContributionLevel = (count: number): number => {
    if (count === 0) return 0
    if (count === 1) return 1
    if (count <= 3) return 2
    if (count <= 5) return 3
    return 4
  }

  const getContributionColor = (level: number): string => {
    const colors: string[] = [
      "bg-[#ebedf0]", // Level 0 - Light gray
      "bg-[#9be9a8]", // Level 1 - Light green
      "bg-[#40c463]", // Level 2 - Medium green
      "bg-[#30a14e]", // Level 3 - Dark green
      "bg-[#216e39]", // Level 4 - Darker green
    ]
    return colors[level]
  }

  return (
    <Card className="p-6 bg-white border-gray-200">
      <div className="space-y-4">
        <h2 className="text-2xl font-normal text-gray-900">
          {totalContributions} contributions in {year}
        </h2>
        
        <div className="flex">
          <div className="grid grid-rows-7 gap-[2px] mr-2 text-right">
            {DAYS.map((day, index) => (
              <div key={index} className="h-[10px] text-xs text-gray-500 leading-[10px]">
                {day}
              </div>
            ))}
          </div>
          
          <div className="w-full overflow-x-auto">
            <div className="inline-flex min-w-full flex-col">
              <div className="flex mb-2">
                {MONTHS.map((month, index) => (
                  <div key={index} className="flex-1 text-xs text-gray-500 text-center">
                    {month}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-rows-7 grid-flow-col gap-[2px]">
                {dates.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-[10px] h-[10px] rounded-sm",
                      getContributionColor(getContributionLevel(item.count))
                    )}
                    title={`${item.count} contributions on ${item.date.toDateString()}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <button className="hover:text-gray-700 transition-colors">
            Learn how we count contributions
          </button>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {LEVELS.map(level => (
                <div
                  key={level}
                  className={cn(
                    "w-[10px] h-[10px] rounded-sm",
                    getContributionColor(level)
                  )}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

