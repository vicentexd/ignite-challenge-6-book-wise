"use client"

import { BookData } from "@/@types";
import { X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { BookCard } from "./components/BookCard";
import { RatingFeed } from "./components/RatingFeed";
import { useSession } from "next-auth/react";
import { RatingInput } from "./components/RatingInput";
import { useState } from "react";
import { useSignInModal } from "@/hook/useSignInModal";

type Props = {
  handleModal: () => void,
  visible: boolean,
  book: BookData;
}

export function ModalBook({ book, handleModal, visible }: Props) {
  const { data } = useSession();
  const { handleSignModal } = useSignInModal();
  const [toggleInputRating, setToggleInputRating] = useState(false);

  const userAlreadyRatedBook = data?.user ? book?.ratings?.some(rating => rating.user_id === data?.user.id) : false

  const handleInputRating = () => {
    if (!data?.user) {
      handleSignModal()
    } else {
      setToggleInputRating(prev => !prev)
    }
  }

  const handleCloseModal = () => {
    setToggleInputRating(false)
    handleModal()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
          className='fixed top-0 left-0 right-0 z-40 flex justify-end w-full h-full max-h-full overflow-x-hidden overflow-y-auto bg-black bg-opacity-25'
        >
          <motion.div
            animate={{ x: 1 }}
            transition={{ duration: 0.3 }}
            initial={{ x: 500 }}
            exit={{ x: 500 }}
            className="relative z-50 flex-col items-start justify-center w-full h-full px-12 py-16 overflow-x-auto bg-gray-800 xl:w-2/5">

            <X onClick={handleCloseModal} className="absolute text-2xl text-gray-400 top-6 right-12" />

            <BookCard book={book} />

            <div className="flex flex-col gap-4 mt-10 ">
              <div className="flex items-center justify-between">
                <h6 className="text-sm text-gray-200">Avaliações</h6>

                <AnimatePresence>
                  {!userAlreadyRatedBook && !toggleInputRating && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      onClick={handleInputRating}
                    >
                      <span className="font-bold text-purple-100 text-md hover:opacity-80">Avaliar</span>
                    </motion.button>
                  )}
                </AnimatePresence>

              </div>

              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {data?.user && !userAlreadyRatedBook && toggleInputRating && (
                    <RatingInput closeInput={handleInputRating} user={data.user} />
                  )}
                </AnimatePresence>

                {book.ratings.map(rating => (
                  <RatingFeed key={rating.id} rating={rating} />
                ))}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}