"use client"

import Image from "next/image";

import logoImg from '@/assets/Logo.png';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { SignInButton } from "@/components/SignInButton";

export default function Login() {
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    await signIn('google', {
      callbackUrl: '/bookwise/home'
    });
  }

  const handleSignInWithGitHub = async () => {
    await signIn('github', {
      callbackUrl: '/bookwise/home'
    });
  }

  const handleSignInWithVisitor = () => {
    router.push('/bookwise/home')
  }

  return (
    <div className="flex flex-1 flex-row  max-w-screen-2xl items-center justify-center">
      <div className="flex basis-2/5 rounded-md overflow-hidden items-center justify-center h-screen bg-cover bg-no-repeat bg-[url(../assets/Hero.png)]">
        <Image src={logoImg} className="h-16" alt="Hero image" />
      </div>

      <div className="flex basis-3/5 items-center justify-center">
        <div className=" flex flex-col gap-10 w-96">
          <div>
            <h2 className="text-lg font-bold text-gray-100">Boas vindas!</h2>
            <p className="text-md text-gray-200">Faça seu login ou acesse como visitante.</p>
          </div>

          <div className="flex flex-col gap-4">
            <SignInButton onClick={handleSignInWithGoogle} text="Entrar com Google" type="google" />
            <SignInButton onClick={handleSignInWithGitHub} text="Entrar com GitHub" type="gitHub" />
            <SignInButton onClick={handleSignInWithVisitor} text="Entrar como visitante" type="visitor" />
          </div>
        </div>
      </div>
    </div>
  )
}
