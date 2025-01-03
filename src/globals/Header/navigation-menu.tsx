'use client'
import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/cn'

export function HeaderNav() {
  return (
    <NavigationMenu className="mx-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Custom Development</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Tailored solutions for your unique business needs.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/services/web-development" title="Web Development">
                Responsive and performant web applications
              </ListItem>
              <ListItem href="/services/mobile-apps" title="Mobile Apps">
                Native and cross-platform mobile solutions
              </ListItem>
              <ListItem href="/services/consulting" title="Consulting">
                Expert advice on your tech stack and architecture
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {portfolio.map((project) => (
                <ListItem key={project.title} title={project.title} href={project.href}>
                  {project.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

const portfolio = [
  {
    title: 'E-commerce Platform',
    href: '/portfolio/e-commerce',
    description: 'A scalable online store built with Next.js and Stripe',
  },
  {
    title: 'Task Management App',
    href: '/portfolio/task-management',
    description: 'A productivity tool with real-time collaboration features',
  },
  {
    title: 'Healthcare Portal',
    href: '/portfolio/healthcare-portal',
    description: 'A secure patient management system for clinics',
  },
  {
    title: 'Social Media Dashboard',
    href: '/portfolio/social-media-dashboard',
    description: 'An analytics dashboard for social media marketers',
  },
]
