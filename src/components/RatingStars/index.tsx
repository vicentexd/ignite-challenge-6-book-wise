"use client"
import { useEffect, useState } from "react";
import { Star } from '@phosphor-icons/react';

type Props = {
  starsNumber?: number;
  onChange?: (stars: number) => void;
  size?: 'sm' | 'md'
}

export function RatingStars({ onChange, starsNumber, size = 'sm' }: Props) {
  const [filledStars, setFilledStars] = useState(starsNumber ?? 0);

  const handleChangeFilledStars = (rate: number) => {
    if (!onChange) return

    setFilledStars(rate);
  }

  useEffect(() => {
    setFilledStars(starsNumber ?? 0)
  }, [starsNumber])

  return (
    <div className="flex items-center gap-1">
      <Star
        onMouseEnter={!onChange ? undefined : () => handleChangeFilledStars(1)}
        onMouseLeave={!onChange ? undefined : () => handleChangeFilledStars(starsNumber ?? 0)}
        onClick={!onChange ? undefined : () => onChange(1)}
        weight={filledStars > 0 ? 'fill' : 'regular'}
        className={`text-purple-100 ${size === 'md' ? 'text-2xl' : 'text-lg'} ${onChange && 'cursor-pointer'}`}
      />

      <Star
        onMouseEnter={!onChange ? undefined : () => handleChangeFilledStars(2)}
        onMouseLeave={!onChange ? undefined : () => handleChangeFilledStars(starsNumber ?? 0)}
        onClick={!onChange ? undefined : () => onChange(2)}
        weight={filledStars > 1 ? 'fill' : 'regular'}
        className={`text-purple-100 ${size === 'md' ? 'text-2xl' : 'text-lg'} ${onChange && 'cursor-pointer'}`}
      />

      <Star
        onMouseEnter={!onChange ? undefined : () => handleChangeFilledStars(3)}
        onMouseLeave={!onChange ? undefined : () => handleChangeFilledStars(starsNumber ?? 0)}
        onClick={!onChange ? undefined : () => onChange(3)}
        weight={filledStars > 2 ? 'fill' : 'regular'}
        className={`text-purple-100 ${size === 'md' ? 'text-2xl' : 'text-lg'} ${onChange && 'cursor-pointer'}`}
      />

      <Star
        onMouseEnter={!onChange ? undefined : () => handleChangeFilledStars(4)}
        onMouseLeave={!onChange ? undefined : () => handleChangeFilledStars(starsNumber ?? 0)}
        onClick={!onChange ? undefined : () => onChange(4)}
        weight={filledStars > 3 ? 'fill' : 'regular'}
        className={`text-purple-100 ${size === 'md' ? 'text-2xl' : 'text-lg'} ${onChange && 'cursor-pointer'}`}
      />

      <Star
        onMouseEnter={!onChange ? undefined : () => handleChangeFilledStars(5)}
        onMouseLeave={!onChange ? undefined : () => handleChangeFilledStars(starsNumber ?? 0)}
        onClick={!onChange ? undefined : () => onChange(5)}
        weight={filledStars > 4 ? 'fill' : 'regular'}
        className={`text-purple-100 ${size === 'md' ? 'text-2xl' : 'text-lg'} ${onChange && 'cursor-pointer'}`}
      />
    </div>
  )
}