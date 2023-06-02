'use client'
import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { RatingStars } from "@/components/RatingStars";
import { TextArea } from "@/components/TextArea";
import { useBookDetail } from "@/hook/useBookDetails";
import { fetchWrapper } from "@/lib/fetch";
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, X } from "@phosphor-icons/react";
import { User } from "@prisma/client";
import Image from "next/image";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  user: User;
  bookId: string;
}

const ratingFormSchema = z.object({
  rate: z.number().min(1, 'Precisa selecionar pelo menos uma estrela'),
  description: z.string().max(450, 'A avaliação deve ter no máximo 450 caracteres').min(10, 'A avaliação deve ter pelo menos 10 caracteres')
})

type RatingFormData = z.infer<typeof ratingFormSchema>;

export function RatingInput({ user, bookId }: Props) {
  const { handleUpdateBook } = useBookDetail();

  const {
    handleSubmit,
    control,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RatingFormData>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rate: 0,
      description: '',
    }
  })

  const handleCleanInput = () => {
    reset()
  }

  const handleSaveRating = async (data: RatingFormData) => {
    const { description, rate } = data;

    const modelSave = {
      rate,
      description,
      userId: user.id,
      bookId,
    }

    await fetchWrapper('ratings/save-user-rating', {
      method: 'POST',
      body: JSON.stringify(modelSave),
      headers: {
        "Content-Type": "application/json",
      },
    })
    await handleUpdateBook();
  }

  return (
    <form onSubmit={handleSubmit(handleSaveRating)} className="flex flex-col w-full gap-6 p-6 bg-gray-700 rounded-md">
      <div className="flex gap-4">
        <div className="flex items-center justify-center p-px rounded-full h-9 w-9 bg-gradient-to-r from-green-100 to-purple-100">
          <Image className="overflow-hidden rounded-full " alt={user.name} src={user.avatar_url!} width={36} height={36} />
        </div>

        <h6 className="flex flex-1 font-bold text-gray-100 text-md ">{user.name}</h6>

        <Controller
          control={control}
          name='rate'
          render={({ field: { onChange, value } }) => (
            <RatingStars starsNumber={value} size="md" onChange={onChange} />
          )}
        />
      </div>

      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <TextArea value={value} onChange={onChange} placeholder="Escreva sua avaliação" textLimit={450} />
        )}
      />

      <div>
        {Object.entries(errors).map(([key, value]) => (
          <p className='text-sm text-danger' key={key}>{value.message}</p>
        ))}
      </div>


      <div className="flex justify-end gap-2">
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <>
            <Button onClick={handleCleanInput}>
              <X className="text-2xl text-purple-100" />
            </Button>

            <Button type='submit'>
              <Check className="text-2xl text-green-100" />

            </Button>
          </>
        )}
      </div>
    </form>
  )
}