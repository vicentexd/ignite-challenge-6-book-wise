import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response(undefined, {
      status: 400,
    })
  }

  const getLastRating = await prisma.rating.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
      user: true
    }
  })

  return NextResponse.json({ ...getLastRating })
}
