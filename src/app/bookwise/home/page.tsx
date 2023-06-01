import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CardRating, DataCard } from "@/components/CardRating";
import { LinkButton } from "@/components/Link";
import { PageHeader } from "@/components/PageHeader";
import { fetchWrapper } from "@/lib/fetch";
import { getServerSession } from "next-auth";
import { ListRatings } from "./components/ListRatings";
import { BookData, CardPreview } from "@/components/CardPreview";

async function getSession() {
  const session = await getServerSession(buildNextAuthOptions());

  return session;
}

async function getMostRatedBooks() {
  const response = await fetchWrapper<{ books: BookData[] }>(
    "books/get-most-rated"
  );

  return response;
}

async function getLastUserRating(userId: string | undefined) {
  try {
    if (!userId) return null;

    const data = await fetchWrapper<DataCard | null>(
      `ratings/user-last-reading?userId=${userId}`,
      {
        method: "GET",
      }
    );
    if (data && Object.keys(data).length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const session = await getSession();

  const { books: getRatedBooks } = await getMostRatedBooks();

  const lastUserRating = await getLastUserRating(session?.user.id);

  return (
    <div className="flex items-start w-full pt-5 flex-col gap-3 max-w-[100vw] sm:max-w-[50vw] 2xl:max-w-full max-h-[100vh]">
      <PageHeader name="Início" page="home" />
      <div
        id="scrollId"
        className="flex flex-col max-h-[95vh] overflow-auto gap-4 pr-2 max-w-full 2xl:flex-row-reverse 2xl:gap-8"
      >
        <div className="flex flex-row w-full">
          {getRatedBooks && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-100">Livros populares</span>
                <LinkButton color="purple" size="sm" text="Ver todas" />
              </div>

              <div className="flex flex-row overflow-x-auto max-w-[95vw] sm:max-w-[50vw] gap-4 pb-2 2xl:flex-col">
                {getRatedBooks.map((book) => (
                  <CardPreview book={book} imageSize="sm" key={book.id} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {session && lastUserRating && (
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-100">
                  Sua última leitura
                </span>
                <LinkButton color="purple" size="sm" text="Ver todas" />
              </div>
              <CardRating data={lastUserRating} cardColor="light" />
            </div>
          )}

          <div className="pb-5 ">
            <span className="text-sm text-gray-100">
              Avaliações mais recentes
            </span>
            <ListRatings userId={session?.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
