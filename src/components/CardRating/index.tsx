import { Book, Rating, User } from '@prisma/client';
import React from 'react';
import { RatingStars } from '../RatingStars';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'

type Data = Rating & {
  book: Book;
  user: User;
}

type Props = {
  data: Data
  cardColor?: 'light' | 'dark'
  showUser?: boolean;
  showRatingDateOnCardTop?: boolean;
}

export function CardRating({ data, showRatingDateOnCardTop = false, showUser = false, cardColor = 'dark' }: Props) {
  const { book, user } = data;

  return (
    <div className={`flex flex-col gap-8 p-6 relative rounded-md ${cardColor === 'dark' ? 'bg-gray-700' : 'bg-gray-600'}`} >
      {showRatingDateOnCardTop && (
        <div className='absolute -top-8 left-0'>
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
          <div className="h-9 w-9 rounded-full p-px flex items-center justify-center bg-gradient-to-r from-green-100 to-purple-100">
            <Image className="rounded-full overflow-hidden " alt={user.name} src={user.avatar_url!} width={36} height={36} />
          </div>

          <div className='flex flex-col justify-between'>
            <h6 className='text-md text-gray-200'>{user.name}</h6>
            <p className='text-sm text-gray-400'>{formatDistanceToNow(new Date(data.created_at), {
              locale: ptBR,
              addSuffix: true,
            })}</p>
          </div>
        </div>
      )}

      <div className='flex gap-5'>
        <Image className='rounded-sm' alt={book.name} src={`${book.cover_url}`} height={152} width={108} />


        <div className='flex flex-col gap-5'>
          {!showUser && !showRatingDateOnCardTop && (
            <p className='text-sm text-gray-300'>{formatDistanceToNow(new Date(data.created_at), {
              locale: ptBR,
              addSuffix: true,
            })}</p>
          )}

          <div className='flex flex-col justify-between'>
            <h4 className='text-md font-bold text-gray-100'>{book.name}</h4>
            <p className='text-md text-gray-400'>{book.author}</p>
          </div>

          <p className='text-md text-gray-300'>{data.description}</p>
        </div>
      </div>
    </div>
  );
}