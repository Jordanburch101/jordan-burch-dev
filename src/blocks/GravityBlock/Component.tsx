'use client'

import { useEffect, useRef } from 'react'
import {
  SiNextdotjs,
  SiTypescript,
  SiPayloadcms,
  SiSqlite,
  SiTailwindcss,
  SiReact,
  SiGraphql,
  SiRadixui,
  SiVercel,
  SiEslint,
  SiReacthookform,
  SiLucide,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiGit,
} from 'react-icons/si'
import { GiAtom } from 'react-icons/gi'
import { TbArrowMerge } from 'react-icons/tb'
import { BiCloudUpload } from 'react-icons/bi'

import Gravity, { MatterBody } from '@/components/ui/gravity'
import ScrambleIn, { ScrambleInHandle } from '@/components/ui/scramble-in'

const iconColors: { [key: string]: string } = {
  SiJavascript: 'text-yellow-400',
  SiPython: 'text-blue-500',
  SiHtml5: 'text-orange-500',
  SiCss3: 'text-blue-400',
  SiGit: 'text-red-500',
  SiNextdotjs: 'text-black dark:text-white',
  SiTypescript: 'text-blue-600',
  SiTailwindcss: 'text-cyan-400',
  SiReact: 'text-cyan-400',
  SiGraphql: 'text-pink-600',
}

export const GravityBlock = () => {
  const icons = [
    { icon: SiNextdotjs, size: 32 },
    { icon: SiTypescript, size: 32 },
    { icon: SiPayloadcms, size: 32 },
    { icon: SiSqlite, size: 32 },
    { icon: SiTailwindcss, size: 32 },
    { icon: SiReact, size: 32 },
    { icon: SiGraphql, size: 32 },
    { icon: GiAtom, size: 32 },
    { icon: SiRadixui, size: 32 },
    { icon: SiVercel, size: 32 },
    { icon: SiEslint, size: 32 },
    { icon: SiReacthookform, size: 32 },
    { icon: SiLucide, size: 32 },
    { icon: TbArrowMerge, size: 32 },
    { icon: BiCloudUpload, size: 32 },
    { icon: SiHtml5, size: 32 },
    { icon: SiCss3, size: 32 },
    { icon: SiJavascript, size: 32 },
    { icon: SiPython, size: 32 },
    { icon: SiGit, size: 32 },
  ]

  const titles = [
    '[01] Next.js 15 - App Router & Server Components',
    '[02] TypeScript - Type-safe Development',
    '[03] Payload CMS - Headless Content Management',
    '[04] SQLite & LibSQL - Database Layer',
    '[05] Tailwind CSS - Utility-first Styling',
    '[06] React 19 - UI Framework',
    '[07] GraphQL - API Query Language',
    '[08] Matter.js - 2D Physics Engine',
    '[09] Radix UI - Accessible Components',
    '[10] Vercel - Deployment & Hosting',
    '[11] ESLint - Code Quality Tools',
    '[12] React Hook Form - Form Management',
    '[13] Lucide React - Icon System',
    '[14] Tailwind Merge - Class Merging',
    '[15] Vercel Blob - Asset Storage',
  ]

  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([])

  useEffect(() => {
    titles.forEach((_, index) => {
      const delay = index * 50
      setTimeout(() => {
        scrambleRefs.current[index]?.start()
      }, delay)
    })
  }, [])

  return (
    <div className="w-full container grid grid-cols-2 gap-4">
      {/* Left side - Scramble Text */}
      <div className="flex flex-col text-sm md:text-lg lg:text-lg xl:text-xl justify-start items-start overflow-y-auto py-16 px-8 font-mono">
        {titles.map((model, index) => (
          <ScrambleIn
            key={index}
            ref={(el) => {
              scrambleRefs.current[index] = el
            }}
            text={model}
            scrambleSpeed={25}
            scrambledLetterCount={5}
            autoStart={false}
          />
        ))}
      </div>

      {/* Right side - Gravity Icons */}
      <div className="relative overflow-hidden h-[490px]">
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          {icons.map((IconData, index) => {
            const Icon = IconData.icon
            const randomX = Math.random() * 60 + 20
            const randomY = Math.random() * 20 + 5
            const bodyType = Math.random() > 0.7 ? 'rectangle' : 'circle'

            return (
              <MatterBody
                key={index}
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                bodyType={bodyType}
                x={`${randomX}%`}
                y={`${randomY}%`}
              >
                <div
                  className={`p-4 ${
                    bodyType === 'circle' ? 'rounded-full' : 'rounded-md'
                  } bg-white border border-border shadow-md`}
                >
                  <Icon size={IconData.size} className={iconColors[Icon.name] || 'text-gray-700'} />
                </div>
              </MatterBody>
            )
          })}
        </Gravity>
      </div>
    </div>
  )
}
