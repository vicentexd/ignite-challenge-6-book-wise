import { Book, Rating, User } from '@prisma/client';
import React from 'react';
import { RatingStars } from '../RatingStars';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'

export type DataCard = Rating & {
  book: Book;
  user: User;
}

type Props = {
  data: DataCard
  cardColor?: 'light' | 'dark'
  showUser?: boolean;
  showRatingDateOnCardTop?: boolean;
}

export function CardRating({ data, showRatingDateOnCardTop = false, showUser = false, cardColor = 'dark' }: Props) {
  const { book, user } = data;

  return (
    <div className={`flex flex-col gap-8 p-6 relative rounded-md ${cardColor === 'dark' ? 'bg-gray-700' : 'bg-gray-600'}`} >
      {showRatingDateOnCardTop && (
        <div className='absolute left-0 -top-8'>
          <p className='text-sm text-gray-300'>{formatDistanceToNow(new Date(data.created_at), {
            locale: ptBR,
            addSuffix: true,
          })}</p>
        </div>
      )}

      <div className='absolute top-6 right-6'>
        <RatingStars starsNumber={data.rate} />
      </div>

      {showUser && (
        <div className='flex items-center gap-4'>
          <div className="flex items-center justify-center p-px rounded-full h-9 w-9 bg-gradient-to-r from-green-100 to-purple-100">
            <Image className="w-auto h-auto overflow-hidden rounded-full " alt={user.name} src={user.avatar_url!} width={36} height={36} />
          </div>

          <div className='flex flex-col justify-between'>
            <h6 className='text-gray-200 text-md'>{user.name}</h6>
            <p className='text-sm text-gray-400'>{formatDistanceToNow(new Date(data.created_at), {
              locale: ptBR,
              addSuffix: true,
            })}</p>
          </div>
        </div>
      )}

      <div className='flex gap-5'>
        <Image className='min-w-[108px] max-h-[152px] w-auto h-auto rounded-sm' alt={book.name} src={`${book.cover_url}`} height={152} width={108} />


        <div className='flex flex-col gap-5'>
          {!showUser && !showRatingDateOnCardTop && (
            <p className='text-sm text-gray-300'>{formatDistanceToNow(new Date(data.created_at), {
              locale: ptBR,
              addSuffix: true,
            })}</p>
          )}

          <div className='flex flex-col justify-between'>
            <h4 className='font-bold text-gray-100 text-md'>{book.name}</h4>
            <p className='text-gray-400 text-md'>{book.author}</p>
          </div>

          <p className='text-gray-300 text-md'>{data.description}</p>
        </div>
      </div>
    </div>
  );
}