'use client'
import { ChangeEvent, useState } from 'react'
import { Button } from "@/components/Button";
import { RatingStars } from "@/components/RatingStars";
import { TextArea } from "@/components/TextArea";
import { Check, X } from "@phosphor-icons/react";
import { User } from "@prisma/client"
import Image from "next/image";

type Props = {
  user: User;
}

export function RatingInput({ user }: Props) {

  const [text, setText] = useState('');
  const [ratingNote, setRatingNote] = useState(0);

  const handleText = (el: ChangeEvent<HTMLTextAreaElement>) => {
    el.preventDefault()
    setText(el.target.value)
  }

  const handleRatingNote = (el: number) => {
    setRatingNote(el)
  }

  const handleCleanInput = () => {
    setText('');
    setRatingNote(0)
  }

  return (
    <div className="flex flex-col w-full gap-6 p-6 bg-gray-700 rounded-md">
      <div className="flex gap-4">
        <div className="flex items-center justify-center p-px rounded-full h-9 w-9 bg-gradient-to-r from-green-100 to-purple-100">
          <Image className="overflow-hidden rounded-full " alt={user.name} src={user.avatar_url!} width={36} height={36} />
        </div>

        <h6 className="flex flex-1 font-bold text-gray-100 text-md ">{user.name}</h6>

        <RatingStars starsNumber={ratingNote} size="md" onChange={handleRatingNote} />
      </div>

      <TextArea value={text} onChange={handleText} placeholder="Escreva sua avaliação" textLimit={450} />

      <div className="flex justify-end gap-2">
        <Button onClick={handleCleanInput}>
          <X className="text-2xl text-purple-100" />
        </Button>

        <Button>
          <Check className="text-2xl text-green-100" />
        </Button>
      </div>
    </div>
  )
}