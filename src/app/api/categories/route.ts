import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const getCategories = await prisma.category.findMany()

  return NextResponse.json({ categories: getCategories })
}
