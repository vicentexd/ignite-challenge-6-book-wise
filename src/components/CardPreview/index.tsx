import { Book, Rating, User } from '@prisma/client';
import React from 'react';
import { RatingStars } from '../RatingStars';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'


type Props = {
  book: Book & {
    ratings: Rating[]
  };
  imageSize?: 'sm' | 'md',
}

export function CardPreview({ book, imageSize = 'md' }: Props) {
  const averageRating = Math.round(book.ratings.reduce((acc, cur) => acc + cur.rate, 0) / book.ratings.length)

  return (
    <div className={`flex flex-col gap-8 p-6 relative rounded-md bg-gray-700`} >


      <div className='flex flex-row gap-5'>
        <Image className='rounded-sm' alt={book.name} src={`${book.cover_url}`} height={imageSize === 'md' ? 152 : '94'} width={imageSize === 'md' ? 108 : '64'} />

        <div className='flex flex-col justify-between'>
          <div className='flex flex-col justify-between'>
            <h4 className='text-md font-bold text-gray-100'>{book.name}</h4>
            <p className='text-md text-gray-400'>{book.author}</p>
          </div>

          <RatingStars starsNumber={averageRating} />
        </div>
      </div>
    </div>
  );
}