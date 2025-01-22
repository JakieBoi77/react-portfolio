import React from 'react'
import HyperText from './magicui/hyper-text'
import Link from 'next/link'
import { navItems } from '@/data'

const Header = () => {
  return (
    <div className="relative flex items-center justify-center pt-4">
      <div className="p-2 w-full flex flex-row space-between">
        <Link href="https://finlaytech.ca">
          <HyperText startOnView={true} className="hidden sm:inline text-xl">
            Jake Finlay
          </HyperText>
          <HyperText startOnView={true} animateOnHover={false} className="sm:hidden text-xl">
            JF
          </HyperText>
        </Link>

      </div>
      <nav className="flex flex-row gap-3 p-2">
        {navItems.map((navItem, index) => {
          return (
            <Link key={index} href={navItem.link} className="font-bold font-mono text-xs sm:text-xl">
              {navItem.name.toUpperCase()}
            </Link>
          );
        })}
      </nav>
    </div>
  )
}

export default Header