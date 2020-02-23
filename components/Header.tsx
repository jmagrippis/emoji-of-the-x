import React from 'react'
import Link from 'next/link'

export const Header = () => (
  <header className="w-full flex items-center p-4 bg-green-300 text-xl">
    <div className="pb-1">👑</div>
    <div className="px-4">Emoji of the</div>
    <nav>
      <Link href="/">
        <a className="text-green-900 font-bold">day</a>
      </Link>
    </nav>
  </header>
)
