"use client"
import { CaretRight } from "@phosphor-icons/react";
import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  size: 'md' | 'sm',
  color: 'white' | 'purple',
  text: string,
}


export function LinkButton({ color = 'white', size = 'md', text, ...rest }: Props) {
  return (
    <Link {...rest} className={`flex flex-row items-center justify-center gap-3 rounded-sm py-1 px-2 ${color === 'white' ? 'hover:bg-gray-200 ' : 'hover:bg-purple-100'} hover:bg-opacity-5  duration-300`} >
      <h6
        className={
          `${size === 'md' ? 'text-md' : 'text-sm'} font-bold ${color === 'white' ? 'text-gray-200' : 'text-purple-100'} duration-300`
        }
      >
        {text}
      </h6>

      <CaretRight className={`text-xl ${color === 'white' ? 'text-gray-200' : 'text-purple-100'}`} />
    </Link>
  )

}