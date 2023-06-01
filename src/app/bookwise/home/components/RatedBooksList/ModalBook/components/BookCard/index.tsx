import { BookData } from "@/@types"
import { RatingStars } from "@/components/RatingStars"
import { BookOpen, BookmarkSimple } from "@phosphor-icons/react"
import Image from "next/image"

type Props = {
  book: BookData
}

export function BookCard({ book }: Props) {

  const averageRating = Math.round(
    book.ratings.reduce((acc, cur) => acc + cur.rate, 0) / book.ratings.length
  );

  return (
    <div className="flex flex-col w-full gap-10 px-8 pt-6 pb-4 bg-gray-700 rounded-md">
      <div className="flex flex-col gap-8 xl:flex-row">
        <Image src={book.cover_url} alt={book.name} width={172} height={242} className='self-center w-40 h-auto rounded-sm xl:self-auto' />

        <div className="flex flex-col justify-between pt-1">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-100">{book.name}</h3>
            <h6 className="text-gray-300 text-md">{book.author}</h6>
          </div>

          <div className="flex flex-col gap-1">
            <RatingStars starsNumber={averageRating} />
            <p className="text-sm text-gray-400">{book.ratings.length} {book.ratings.length === 1 ? 'avaliação' : 'avaliações'}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-6 border-t border-gray-600 xl:flex-row">
        <div className="flex items-center gap-4 px-1">
          <BookmarkSimple className="text-2xl text-green-100" />

          <div className="flex flex-col">
            <p className="text-sm text-gray-300">Categoria</p>
            <span className="font-bold text-gray-200 text-md">{book.categories.map(category => category.category.name).join(', ')}</span>
          </div>
        </div>


        <div className="flex items-center gap-4 px-1">
          <BookOpen className="text-2xl text-green-100" />

          <div className="flex flex-col">
            <p className="text-sm text-gray-300">Páginas</p>
            <span className="font-bold text-gray-200 text-md">{book.total_pages}</span>
          </div>
        </div>
      </div>
    </div>
  )
}