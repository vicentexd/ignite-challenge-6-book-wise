import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const getMostRatingsBooks = await prisma.book.findMany({
    orderBy: {
      ratings: {
        _count: 'desc'
      }
    },
    include: {
      ratings: {
        include: {
          user: true,
        }
      },
      categories: {
        include: {
          category: true
        }
      },
    },
    take: 4,
  })

  return NextResponse.json({ books: getMostRatingsBooks })
}
