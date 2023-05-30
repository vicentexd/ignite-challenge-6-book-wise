import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId')
  const page = Number(searchParams.get('page'))

  const getLastRatings = await prisma.rating.findMany({
    where: {
      user_id: {
        not: userId ?? undefined,
      },
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
      user: true,
    },
    take: 3,
    skip: page === 1 ? 0 : ((page - 1) * 3),
  })

  const count = await prisma.rating.count({
    where: {
      user_id: {
        not: userId ?? undefined,
      },
    }
  });

  return NextResponse.json({ ratings: getLastRatings, count: count })
}
