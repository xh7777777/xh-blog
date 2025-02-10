'use client'
import { useState, useEffect } from 'react'

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const onBtnClick = () => {
    // setIsSearchOpen(!isSearchOpen)
    throw new Error('Not implemented')
  }

  const promiseErrorClick = () => {
    Promise.reject(new Error('Not implemented'))
  }

  return (
    <button aria-label="Show Search" className="icon-bg ml-3 p-2" onClick={promiseErrorClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        height={24}
        width={24}
        viewBox="0 0 24 24"
        className="flex h-6 w-6 items-center justify-center text-gray-900 hover:animate-bounce dark:text-gray-100"
      >
        {mounted && (
          <g data-name="Layer 2">
            <g data-name="music">
              <rect width="24" height="24" opacity="0"></rect>
              <path d="M19 15V4a1 1 0 0 0-.38-.78 1 1 0 0 0-.84-.2l-9 2A1 1 0 0 0 8 6v8.34a3.49 3.49 0 1 0 2 3.18 4.36 4.36 0 0 0 0-.52V6.8l7-1.55v7.09a3.49 3.49 0 1 0 2 3.17 4.57 4.57 0 0 0 0-.51z"></path>
            </g>
          </g>
        )}
      </svg>
    </button>
  )
}

export default SearchButton
