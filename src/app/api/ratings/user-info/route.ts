import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { findMostFrequentValue } from '../../../../utils/mostFrequentValue';
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId')

  if (!userId) {
    return new Response(undefined, {
      status: 400,
    })
  }

	const findUser = await prisma.user.findFirst({
    where: {
    	id: userId,
    },
  });

  const findAll = await prisma.rating.findMany({
    where: {
      user_id: userId,
    },
    include: {
			book: {
				include: {
					categories: {
						include: {
							category: true
						}
					}
				}
			},
    }
  });
	let totalPagesSum = 0;
	let authors: Array<String> = [];
	let categoryList: Array<String> = [];
	findAll.forEach((rating) => {
		totalPagesSum += rating.book.total_pages;
		const exist = authors.includes(rating.book.author)
		if(!exist){
			authors.push(rating.book.author)
		}
	});

	findAll.forEach((r) => (
		r.book.categories.map(cat => categoryList.push(cat.categoryId))
	))

	const mostFrequentString = findMostFrequentValue(categoryList);

	const findCategory = await prisma.category.findFirst({
    where: {
    	id: mostFrequentString ?? '',
    },
  });

	

  return NextResponse.json({ 
		user: findUser, 
		totalPages: totalPagesSum,
		booksReading: findAll.length,
		authors: authors.length,
		mostReadCategory: findCategory
	})
}

