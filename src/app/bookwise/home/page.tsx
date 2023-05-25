
import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CardPreview } from "@/components/CardPreview";
import { CardRating } from "@/components/CardRating";
import { LinkButton } from "@/components/Link";
import { PageHeader } from "@/components/PageHeader";
import { api } from "@/lib/axios";
import { Book, Rating, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

async function getSession() {
  const session = await getServerSession(buildNextAuthOptions())

  console.log('session', session);

  return session
}

async function getLastRating() {
  try {
    const data = await api.post('/ratings/user-last-reading');

    console.log('data', JSON.stringify(data, null, 2));

    return data
  } catch (error) {
    console.log('error', error.message)
    console.log('AAAAAAAAAAAAA')
    return null
  }
}

export default async function Home() {
  const session = await getSession();
  const lastRating = await getLastRating();

  // const [session, lastRating] = await Promise.all([sessionData, lastRatingData])

  console.log('lastRating', JSON.stringify(lastRating, null, 2));

  return (
    <div className="flex flex-1 flex-col items-start pt-12 pr-16 ">
      <PageHeader name="Início" page="home" />
      {session && (
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-100" >Sua última leitura</span>

            <LinkButton color="purple" size="sm" text="Ver todas" />
          </div>
        </div>
      )}
    </div>
  )
}
