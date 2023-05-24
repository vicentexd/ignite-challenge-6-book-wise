"use client"
import { Binoculars, House, User } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion'


type Props = {
  name: string;
  page: 'home' | 'explorer' | 'profile'
}

export function NavItem({ page, name }: Props) {
  const pathName = usePathname();

  const isActive = pathName.includes(page);

  const getIcon = () => {
    if (page === 'home') {
      return (
        <House weight={isActive ? 'bold' : 'regular'} className={`${isActive ? 'text-gray-100' : 'text-gray-400'} text-xl`} size={28} />
      )
    }

    if (page === 'explorer') {
      return (
        <Binoculars weight={isActive ? 'bold' : 'regular'} className={`${isActive ? 'text-gray-100' : 'text-gray-400'} text-xl`} size={28} />
      )
    }

    return (
      <User weight={isActive ? 'bold' : 'regular'} className={`${isActive ? 'text-gray-100' : 'text-gray-400'} text-xl`} size={28} />
    )
  }

  return (
    <li key={name}>
      <Link href={`/bookwise/${page}`} className="relative pt-3 items-center flex gap-3 min-w-[120px]">
        {isActive ? (
          <motion.div layoutId="activeItem" className="absolute -left-4 rounded-full w-1 h-6 bg-gradient-to-t from-purple-100 to-green-100" />
        ) : null}

        <div>
          {getIcon()}
        </div>

        <div>
          <h4 className={`${isActive ? 'text-gray-100 font-bold' : 'text-gray-400'} text-xl`}>{name}</h4>
        </div>
      </Link>
    </li>
  )
}