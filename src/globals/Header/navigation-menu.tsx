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

/**
 * Navigation item link structure
 * @property {('reference' | 'custom' | null)} [type] - Type of link (reference to internal page or custom URL)
 * @property {string} label - Display text for the navigation item
 * @property {boolean} [newTab] - Whether to open the link in a new tab
 * @property {Object} [reference] - Reference to internal page/post
 * @property {string} [url] - Custom URL for the link
 */
type NavItem = {
  link: {
    type?: 'reference' | 'custom' | null
    label: string
    newTab?: boolean | null
    reference?: {
      value: number | { id: string }
      relationTo: 'pages' | 'posts'
    } | null
    url?: string
  }
  id?: string
  subItems?: {
    link: {
      type?: 'reference' | 'custom' | null
      label: string
      newTab?: boolean | null
      reference?: {
        value: number | { id: string }
        relationTo: 'pages' | 'posts'
      } | null
      url?: string
    }
    description?: string
  }[]
}

type HeaderNavProps = {
  navItems: NavItem[]
}

/**
 * Resolves the URL for a navigation link based on its type
 * @param link - Navigation link object
 * @returns Resolved URL string
 */
const resolveLinkUrl = (link: NavItem['link']) => {
  if (link.type === 'reference' && link.reference) {
    const value =
      typeof link.reference.value === 'object'
        ? (link.reference.value as any).id
        : link.reference.value
    return `/${link.reference.relationTo}/${value}`
  }
  return link.url || '#'
}

/**
 * HeaderNav Component
 *
 * Renders a navigation menu with support for dropdown menus and nested items.
 * The first dropdown menu uses a special layout with a featured item,
 * while subsequent dropdowns use a two-column grid layout.
 *
 * @component
 * @param {Object} props
 * @param {NavItem[]} props.navItems - Array of navigation items to display
 *
 * @example
 * ```tsx
 * const navItems = [
 *   {
 *     link: { label: 'Services', type: 'custom', url: '/services' },
 *     subItems: [
 *       { link: { label: 'Web Dev', url: '/services/web' }, description: 'Web development services' }
 *     ]
 *   }
 * ]
 *
 * return <HeaderNav navItems={navItems} />
 * ```
 */
export function HeaderNav({ navItems }: HeaderNavProps) {
  return (
    <NavigationMenu className="mx-6">
      <NavigationMenuList>
        {navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.subItems && item.subItems.length > 0 ? (
              <>
                <NavigationMenuTrigger>{item.link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {index === 0 ? (
                    // First dropdown uses a featured item layout with a large card on the left and list on the right
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {item.subItems.map((subItem, subIndex) =>
                        subIndex === 0 ? (
                          // Featured item with large text and gradient background
                          <li key={subIndex} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={resolveLinkUrl(subItem.link)}
                                target={subItem.link.newTab ? '_blank' : undefined}
                                rel={subItem.link.newTab ? 'noopener noreferrer' : undefined}
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {subItem.link.label}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ) : (
                          // Regular list items displayed on the right side
                          <ListItem
                            key={subIndex}
                            href={resolveLinkUrl(subItem.link)}
                            title={subItem.link.label}
                            target={subItem.link.newTab ? '_blank' : undefined}
                            rel={subItem.link.newTab ? 'noopener noreferrer' : undefined}
                          >
                            {subItem.description}
                          </ListItem>
                        ),
                      )}
                    </ul>
                  ) : (
                    // All other dropdowns use a simple two-column grid layout
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          href={resolveLinkUrl(subItem.link)}
                          title={subItem.link.label}
                          target={subItem.link.newTab ? '_blank' : undefined}
                          rel={subItem.link.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  )}
                </NavigationMenuContent>
              </>
            ) : (
              // Simple link with hover effect for non-dropdown items
              <Link
                href={resolveLinkUrl(item.link)}
                legacyBehavior
                passHref
                target={item.link.newTab ? '_blank' : undefined}
                rel={item.link.newTab ? 'noopener noreferrer' : undefined}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.link.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * ListItem Component
 *
 * A styled list item component for use in navigation dropdowns.
 * Renders a link with a title and optional description.
 *
 * @component
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Title of the list item
 * @param {React.ReactNode} props.children - Description or additional content
 * @param {React.Ref<HTMLAnchorElement>} ref - Forwarded ref for the anchor element
 */
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
