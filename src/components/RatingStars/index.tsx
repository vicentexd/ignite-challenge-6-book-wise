"use client"
import { useState } from "react";
import { Star } from '@phosphor-icons/react';

type Props = {
  starsNumber?: number;
  onChange?: (stars: number) => void;
}

export function RatingStars({ onChange, starsNumber }: Props) {
  const [filledStars, setFilledStars] = useState(starsNumber ?? 0);

  return (
    <div className="flex items-center gap-1">
      <Star weight={filledStars > 0 ? 'fill' : 'regular'} className="text-purple-100" />
      <Star weight={filledStars > 1 ? 'fill' : 'regular'} className="text-purple-100" />
      <Star weight={filledStars > 2 ? 'fill' : 'regular'} className="text-purple-100" />
      <Star weight={filledStars > 3 ? 'fill' : 'regular'} className="text-purple-100" />
      <Star weight={filledStars > 4 ? 'fill' : 'regular'} className="text-purple-100" />
    </div>
  )
}