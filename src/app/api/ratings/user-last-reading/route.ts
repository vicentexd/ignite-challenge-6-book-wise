import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { buildNextAuthOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(buildNextAuthOptions())

  console.log('asdqasduashduashud')

  if (!session) {
    return new Response(undefined, {
      status: 400,
    })
  }

  const getLastRating = await prisma.rating.findFirst({
    where: {
      user_id: session.user.id,
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return NextResponse.json({ getLastRating })
}
