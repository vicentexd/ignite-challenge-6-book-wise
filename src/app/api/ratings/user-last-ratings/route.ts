import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId')
  const page = Number(searchParams.get('page'))
  const search = searchParams.get('search')
  

  if (!userId) {
    return new Response(undefined, {
      status: 400,
    })
  } 

  const getLastUserRatings = await prisma.rating.findMany({
    where: {
      user_id: userId,
      book: {
        name: {
          contains: search ?? ''
        }
      }
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
      user_id: userId,
    },
  });

  return NextResponse.json({ ratings: getLastUserRatings, count: count })
}
