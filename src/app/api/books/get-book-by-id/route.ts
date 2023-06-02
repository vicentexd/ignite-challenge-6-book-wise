import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId')


  if (!bookId) {
    return new Response(undefined, {
      status: 400,
    })
  }

  const getBook = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      categories: {
        include: {
          category: true
        }
      },
      ratings: {
        include: {
          user: true
        },
        orderBy: {
          created_at: 'desc'
        }
      }
    }
  })

  return NextResponse.json({ book: getBook })
}
