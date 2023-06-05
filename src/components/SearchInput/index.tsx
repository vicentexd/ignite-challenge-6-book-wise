"use client"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { useState } from "react"

export function SearchInput({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(prev => !prev)
  }

  return (
    <div className="flex items-center w-full">
      <div className="relative w-full ">
        <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none">
          <MagnifyingGlass className={`text-xl ${isFocus ? 'text-green-200 ' : 'text-gray-500 '}`} />
        </div>
        <input onFocus={handleFocus} onBlur={handleFocus} type="text" {...rest} className="block w-full px-5 py-3 text-sm text-gray-200 bg-gray-800 border border-gray-500 rounded-lg outline-none placeholder:text-gray-400 focus:ring-green-200 focus:border-green-200" />
      </div>
    </div>
  )
}