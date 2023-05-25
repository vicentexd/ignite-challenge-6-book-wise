
"use client"

import { X } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { SignInButton } from '../SignInButton';
import { signIn } from 'next-auth/react';

type Props = {
  visible: boolean;
  handleModal: () => void;
}

export function SignInModal({ visible, handleModal }: Props) {

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

  return (
    <AnimatePresence>
      {visible && (
        <div aria-hidden="true" className='fixed left-0 top-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-full max-h-full bg-black bg-opacity-25'>
          <motion.div exit={{ x: -300, opacity: 0 }} layoutId='modalSignIn' className='relative bg-gray-700 rounded-md flex flex-col gap-10 items-center justify-center py-20 px-14 min-w-[516px]'>
            <button onClick={handleModal}>
              <X size={24} className='absolute top-4 right-4 text-gray-400' />
            </button>
            <h5 className='text-md text-gray-200 text-center'>Faça login para deixar sua avaliação</h5>

            <div className="flex flex-col gap-4 w-full">
              <SignInButton onClick={handleSignInWithGoogle} text="Entrar com Google" type="google" />
              <SignInButton onClick={handleSignInWithGitHub} text="Entrar com GitHub" type="gitHub" />
            </div>

          </motion.div>
        </div>

      )}
    </AnimatePresence>
  )
}