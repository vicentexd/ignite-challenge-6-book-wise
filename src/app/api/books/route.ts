import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')
	const category = searchParams.get('category')
	console.log('CATEGORYYYYYYY',typeof category)
	
	const query = category ? {
		name: { 
			contains: search ?? ''
		},
		categories:{
			some: {
				categoryId: category
			}
		}
	} : {
		name: { 
			contains: search ?? ''
		},
	}

  const getBooks = await prisma.book.findMany({
		where: query,
    include: {
      ratings: {
        include: {
          user: true,
        },
        orderBy: {
          created_at: 'desc'
        }
      },
      categories: {
        include: {
          category: true
        }
      },
    },
  })

  const count = await prisma.book.count();

  return NextResponse.json({ books: getBooks, count: count })
}
