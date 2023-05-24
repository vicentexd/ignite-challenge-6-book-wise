'use client'

import { SignIn } from "@phosphor-icons/react";
import { useSession } from "next-auth/react"

export function ProfileSection() {
  const session = useSession();

  return (
    <div className="flex p-1 gap-3 items-start">
      {session.status === 'unauthenticated' ? (
        <>
          <h6 className="text-md font-bold text-gray-100">Fazer Login</h6>
          <SignIn weight="bold" className="text-green-100 text-xl" size={22} />
        </>
      ) : (
        <div>

        </div>
      )}
    </div>
  )
}