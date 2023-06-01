import Image from "next/image";
import { RatingStars } from "../RatingStars";
import { BookData } from "@/@types";


type Props = {
  book: BookData;
  imageSize?: "sm" | "md";
  onClick?: (book: BookData) => void;
};

export function CardPreview({ book, imageSize = "md", onClick }: Props) {
  const averageRating = Math.round(
    book.ratings.reduce((acc, cur) => acc + cur.rate, 0) / book.ratings.length
  );

  return (
    <div
      className={`flex flex-col gap-8 p-6 relative rounded-md bg-gray-700 min-w-[380px] ${onClick && 'cursor-pointer'}`}
      onClick={onClick ? () => onClick(book) : undefined}
    >
      <div className="flex flex-row gap-5">
        <Image
          className="rounded-sm"
          alt={book.name}
          src={`${book.cover_url}`}
          height={imageSize === "md" ? 152 : "94"}
          width={imageSize === "md" ? 108 : "64"}
        />

        <div className="flex flex-col justify-between">
          <div className="flex flex-col justify-between">
            <h4 className="font-bold text-gray-100 text-md">{book.name}</h4>
            <p className="text-gray-400 text-md">{book.author}</p>
          </div>

          <RatingStars starsNumber={averageRating} />
        </div>
      </div>
    </div>
  );
}