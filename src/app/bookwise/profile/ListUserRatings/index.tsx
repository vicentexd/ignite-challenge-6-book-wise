"use client";

import { CardRating, DataCard } from "@/components/CardRating";
import { SearchInput } from "@/components/SearchInput";
import { fetchWrapper } from "@/lib/fetch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  userId: string | undefined;
};

export function ListUserRatings({ userId }: Props) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<DataCard[]>([]);
  const [maxLength, setMaxLength] = useState(0);
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const queryUserId = searchParams.get('userId')

  async function fetchData(pageNumber = 1, search = '') {
    try {

      if (!userId && !queryUserId) return null;

      const { ratings, count } = await fetchWrapper<{
        ratings: DataCard[] | null;
        count: number;
      }>(
        `ratings/user-last-ratings?userId=${queryUserId || userId}&page=${pageNumber}&search=${search}`,
        {
          method: "GET",
        }
      );

      if (ratings) {
        setList((prev) => [...prev, ...ratings]);
      }

      setMaxLength(count);
    } catch (error) {
      return null;
    }
  }

  const handleUpdateData = async () => {
    await fetchData(page + 1);
    setPage((prev) => prev + 1);
  };

  const handleUpdateSearch = async (value: string) => {
    setList([])
    setSearch(value)
    setPage(1)
    await fetchData(1, value)
  }

  useEffect(() => {
    fetchData();
  }, []);


  console.log(page)

  return (
    <div className="flex flex-col">
      <SearchInput
        placeholder="Buscar livro avaliado"
        onChange={(e) => handleUpdateSearch(e.target.value)}
        value={search}
      />
      <InfiniteScroll
        dataLength={list.length}
        next={handleUpdateData}
        hasMore={list.length !== maxLength}
        loader={<h4 className="text-green-100">Loading...</h4>}
        className="flex flex-col gap-12 pt-12"
        scrollableTarget={"scrollIdProfile"}
      >

        {list.map((rating) => (
          <CardRating key={rating.id} data={rating} showRatingDateOnCardTop />
        ))}
      </InfiniteScroll>
    </div>
  );
}