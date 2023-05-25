"use client"
import { Binoculars, House, User } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion'


type Props = {
  name: string;
  page: 'home' | 'explorer' | 'profile'
}

export function PageHeader({ page, name }: Props) {

  const getIcon = () => {
    if (page === 'home') {
      return (
        <House className={`text-green-100`} size={32} />
      )
    }

    if (page === 'explorer') {
      return (
        <Binoculars className={`text-green-100`} size={32} />
      )
    }

    return (
      <User className={`text-green-100`} size={32} />
    )
  }

  return (
    <div className="flex items-center gap-3">
      {getIcon()}
      <h1 className="text-2xl text-gray-100 font-bold">{name}</h1>
    </div>
  )
}