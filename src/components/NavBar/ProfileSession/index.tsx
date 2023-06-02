'use client'

import { useSignInModal } from "@/hook/useSignInModal";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

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
    <div className="flex items-start gap-3 p-1">
      {!data ? (
        <>
          <h6 className="font-bold text-gray-100 text-md">Fazer Login</h6>
          <motion.button layoutId='modalSignIn' onClick={handleSignModal} >
            <SignIn weight="bold" className="text-xl text-green-100" size={22} />
          </motion.button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-px rounded-full h-9 w-9 bg-gradient-to-r from-green-100 to-purple-100">
            <Image className="overflow-hidden rounded-full " alt={data.user.name} src={data.user.avatar_url!} width={36} height={36} />
          </div>
          <h6 className="text-sm text-gray-100">{data.user.name}</h6>
          <button onClick={handleSignOut}>
            <SignOut className="text-xl text-danger" size={22} />
          </button>
        </div>
      )}
    </div>
  )
}