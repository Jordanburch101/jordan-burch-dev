import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { GitHubContributions } from '@/components/contribution-graph/GitHubContributions'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  const username = 'Jordanburch101'
  const year = 2025

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/Jordanburch101',
      label: 'GitHub',
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      href: 'https://twitter.com/yourusername',
      label: 'Twitter',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://linkedin.com/in/yourusername',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: 'mailto:your@email.com',
      label: 'Email',
    },
  ]

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white text-gray-800 relative">
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
      <div className="container pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Column 1 - Social Links & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - GitHub Contributions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">GitHub Activity</h3>
            <Suspense fallback={<div className="text-gray-600">Loading contributions...</div>}>
              <GitHubContributions username={username} year={year} />
            </Suspense>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Jordan Burch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
