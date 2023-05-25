'use client'

import { SignIn, SignOut } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion'
import { useSignInModal } from "@/hook/useSignInModal";
import { Session } from "next-auth";

type Props = {
  data: Session | null
}

export function ProfileSection({ data }: Props) {
  const { handleSignModal } = useSignInModal();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/'
    });
  }

  return (
    <div className="flex p-1 gap-3 items-start">
      {!data ? (
        <>
          <h6 className="text-md font-bold text-gray-100">Fazer Login</h6>
          <motion.button layoutId='modalSignIn' onClick={handleSignModal} >
            <SignIn weight="bold" className="text-green-100 text-xl" size={22} />
          </motion.button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full p-px flex items-center justify-center bg-gradient-to-r from-green-100 to-purple-100">
            <Image className="rounded-full overflow-hidden " alt={data.user.name} src={data.user.avatar_url!} width={36} height={36} />
          </div>
          <h6 className="text-sm  text-gray-100">{data.user.name}</h6>
          <button onClick={handleSignOut}>
            <SignOut className="text-danger text-xl" size={22} />
          </button>
        </div>
      )}
    </div>
  )
}