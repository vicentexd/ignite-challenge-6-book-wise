import { RatingData } from "@/@types"
import { RatingStars } from "@/components/RatingStars";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image"

type Props = {
  rating: RatingData
}

export function RatingFeed({ rating }: Props) {
  const { user, created_at, rate, description } = rating;

  return (
    <div className="flex flex-col w-full gap-5 p-6 bg-gray-700 rounded-md">
      <div className="flex gap-4">
        <div className="flex items-center justify-center p-px rounded-full h-9 w-9 bg-gradient-to-r from-green-100 to-purple-100">
          <Image className="overflow-hidden rounded-full " alt={user.name} src={user.avatar_url!} width={36} height={36} />
        </div>

        <div className="flex flex-col flex-1">
          <h6 className="font-bold text-gray-100 text-md">{user.name}</h6>
          <p className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(created_at), {
              locale: ptBR,
              addSuffix: true,
            })}
          </p>
        </div>

        <RatingStars starsNumber={rate} />
      </div>

      <p className="text-sm text-gray-300">
        {description}
      </p>
    </div>
  )
}