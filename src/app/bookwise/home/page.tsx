import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CardRating, DataCard } from "@/components/CardRating";
import { LinkButton } from "@/components/Link";
import { PageHeader } from "@/components/PageHeader";
import { fetchWrapper } from "@/lib/fetch";
import { getServerSession } from "next-auth";
import { ListRatings } from "./components/ListRatings";
import { BookData, CardPreview } from "@/components/CardPreview";



async function getSession() {
  const session = await getServerSession(buildNextAuthOptions())


  return session
}

async function getMostRatedBooks() {
  const response = await fetchWrapper<{ books: BookData[] }>('books/get-most-rated')
  console.log('response', response)

  return response
}

async function getLastUserRating(userId: string | undefined) {
  try {
    if (!userId) return null

    const data = await fetchWrapper<DataCard | null>(`ratings/user-last-reading?userId=${userId}`, {
      method: 'GET'
    });

    return data
  } catch (error) {
    return null
  }
}

export default async function Home() {
  const session = await getSession();

  const { books: getRatedBooks } = await getMostRatedBooks();

  const lastUserRating = await getLastUserRating(session?.user.id);

  return (
    <div className="flex max-h-screen max-w-screen flex-1 flex-col items-start pt-12">
      <PageHeader name="Início" page="home" />

      <div className="flex w-full h-full bg-purple-100 gap-16 flex-col-reverse 2xl:flex-row">
        <section className="flex 2xl:w-2/3 h-full flex-col bg-purple-200">
          {session && lastUserRating && (
            <div className="flex basis-1/3 flex-col gap-4 mt-10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-100" >Sua última leitura</span>

                <LinkButton color="purple" size="sm" text="Ver todas" />
              </div>
              <CardRating data={lastUserRating} cardColor="light" />

            </div>
          )}

          {/* <div className="flex h-full flex-col gap-4 mt-10 justify-start overflow-hidden">
            <span className="text-sm text-gray-100" >Avaliações mais recentes</span>
            <ListRatings userId={session?.user.id} />
          </div> */}
        </section>

        <section className="flex 2xl:w-1/3 bg-green-100 max-w-full">
          {getRatedBooks && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-100" >Livros populares</span>

                <LinkButton color="purple" size="sm" text="Ver todas" />
              </div>


              {/* <ul className="flex overflow-hidden">
                {getRatedBooks.map(book => (
                  <li key={book.id}>
                    <CardPreview book={book} imageSize="sm" key={book.id} />
                  </li>
                ))
                }
              </ul> */}


            </div>
          )}
        </section>
      </div>
    </div>
  )
}
