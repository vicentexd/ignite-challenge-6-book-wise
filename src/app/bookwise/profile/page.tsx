import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageHeader } from "@/components/PageHeader";
import { Category, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { ListUserRatings } from "./components/ListUserRatings";
import { UserInfo } from "./components/UserInfo";



export type DataInfo = {
  user: User,
  totalPages: number,
  booksReading: number,
  authors: number,
  mostReadCategory: Category
}

async function getSession() {
  const session = await getServerSession(buildNextAuthOptions());
  return session;
}


export default async function Profile() {
  const session = await getSession();

  return (
    <div className="flex flex-col flex-1 min-h-screen gap-3 pt-12 md:pr-16">
      <PageHeader name="Perfil" page="profile" />

      <div
        id="scrollIdProfile"
        className="flex w-full flex-col max-h-[80vh] overflow-x-auto 2xl:flex-row-reverse 2xl:justify-end 2xl:gap-12"
      >
        <UserInfo sessionUserId={session?.user.id ?? undefined} />
        {session && (
          <div className="flex flex-col min-w-full 2xl:w-2/3 2xl:min-w-min">
            <ListUserRatings userId={session?.user.id} />
          </div>
        )}
      </div>
    </div>
  )
}
