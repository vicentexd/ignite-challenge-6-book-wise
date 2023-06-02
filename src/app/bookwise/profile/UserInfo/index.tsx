"use client"
import { fetchWrapper } from "@/lib/fetch";
import { BookOpen, BookmarkSimple, Books, IdentificationBadge } from "@phosphor-icons/react";
import { Category, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";


export type DataInfo = {
  user: User, 
  totalPages: number,
  booksReading: number,
  authors: number,
  mostReadCategory: Category
}

export function UserInfo({sessionUserId}: any) {
  const [dataInfo, setDataInfo] = useState<DataInfo | undefined>()
  const searchParams = useSearchParams()

  const queryUserId = searchParams.get('userId')
  
  const getLastUserRating = useCallback(async() => {
    try {
      if (!queryUserId && !sessionUserId) return null;
      const data = await fetchWrapper<DataInfo | null>(
        `ratings/user-info?userId=${queryUserId || sessionUserId}`,
        {
          method: "GET",
        }
      );
      
      if (data && Object.keys(data).length > 0) {
        setDataInfo(data);
      }
    } catch (error) {
      return null;
    }
  },[queryUserId, sessionUserId])

  useEffect(() => {
    getLastUserRating()
  },[getLastUserRating])

  return (
    <>
      {dataInfo && (
        <div className="flex flex-row items-end gap-6 my-8 2xl:items-baseline 2xl:my-0 2xl:flex-col">
          <div className="flex flex-row items-end gap-3 2xl:border-l-2 2xl:border-x-gray-700 2xl:h-auto 2xl:flex-col 2xl:items-baseline 2xl:pl-12">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 p-px rounded-full bg-gradient-to-r from-green-100 to-purple-100">
                <Image className="overflow-hidden rounded-full " alt={dataInfo.user?.name ?? ''} src={dataInfo.user?.avatar_url!} width={48} height={48} />
              </div>
              <p className="text-center text-gray-100 text-md bold">{dataInfo.user?.name}</p>
              <p className="text-sm text-center text-gray-400 bold">
                {`membro desde ${format(new Date(dataInfo.user?.created_at), 'yyyy')}`}
              </p>
            </div>
            <div className="flex flex-col items-center 2xl:flex-row 2xl:gap-5 2xl:justify-start">
              <BookOpen className={`text-green-100`} size={32} />
              <div className="flex flex-col items-center 2xl:flex-col 2xl:items-start">
                <p className="text-gray-100 text-md bold">{dataInfo.totalPages}</p>
                <p className="text-sm text-center text-gray-400 bold">
                  Páginas lidas
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center 2xl:flex-row 2xl:gap-5 2xl:justify-start">
              <Books className={`text-green-100`} size={32} />
              <div className="flex flex-col items-center 2xl:flex-col 2xl:items-start">
                <p className="text-gray-100 text-md bold">{dataInfo.booksReading}</p>
                <p className="text-sm text-center text-gray-400 bold">
                  Livros lidos
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center 2xl:flex-row 2xl:gap-5 2xl:justify-start">
              <IdentificationBadge className={`text-green-100`} size={32} />
              <div className="flex flex-col items-center 2xl:flex-col 2xl:items-start">
                <p className="text-gray-100 text-md bold">{dataInfo.authors}</p>
                <p className="text-sm text-center text-gray-400 bold">
                  Autores lidos
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center 2xl:flex-row 2xl:gap-5 2xl:justify-start">
              <BookmarkSimple className={`text-green-100`} size={32} />
              <div className="flex flex-col items-center 2xl:flex-col 2xl:items-start">
                <p className="text-gray-100 text-md bold">{dataInfo.mostReadCategory?.name || 'N/A'}</p>
                <p className="text-sm text-center text-gray-400 bold">
                  Categoria mais lida
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
   </>
  )
}