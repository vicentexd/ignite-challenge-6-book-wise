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
        <div className="absolute px-5 inset-y-0 right-0 flex items-center pointer-events-none">
          <MagnifyingGlass className={`text-xl ${isFocus ? 'text-green-200 ' : 'text-gray-500 '}`} />
        </div>
        <input onFocus={handleFocus} onBlur={handleFocus} type="text" {...rest} className=" outline-none py-3 px-5 bg-gray-800 border border-gray-500 text-gray-200 placeholder:text-gray-400 text-sm rounded-sm focus:ring-green-200 focus:border-green-200 block w-full " />
      </div>
    </div>
  )
}