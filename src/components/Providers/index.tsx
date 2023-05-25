'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '@/app/api/auth/[...nextauth]/route'

type Props = {
  children: React.ReactNode
}



export function Providers({ children }: Props) {

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
