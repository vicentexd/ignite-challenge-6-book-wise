import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const saveUserRatingBodySchema = z.object({
  rate: z.number(),
  description: z.string(),
  userId: z.string(),
  bookId: z.string(),
})

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { description, rate, userId, bookId } = saveUserRatingBodySchema.parse(body);

  const createRating = await prisma.rating.create({
    data: {
      description,
      rate,
      user_id: userId,
      book_id: bookId,
    }
  })

  return NextResponse.json({ ...createRating }, {
    status: 201,
  })
}
