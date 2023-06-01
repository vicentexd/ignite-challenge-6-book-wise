"use client";

import { CardRating, DataCard } from "@/components/CardRating";
import { fetchWrapper } from "@/lib/fetch";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  userId: string | undefined;
};

export function ListRatings({ userId }: Props) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<DataCard[]>([]);
  const [maxLength, setMaxLength] = useState(0);

  async function fetchData(
    pageNumber = 1,
    user: string | undefined = undefined
  ) {
    const { ratings, count } = await fetchWrapper<{
      ratings: DataCard[] | null;
      count: number;
    }>(`ratings/last-ratings?userId=${user}&page=${pageNumber}`, {
      method: "GET",
    });

    if (ratings) {
      setList((prev) => [...prev, ...ratings]);
    }

    setMaxLength(count);
  }

  const handleUpdateData = async () => {
    await fetchData(page + 1, userId);

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={handleUpdateData}
      hasMore={list.length !== maxLength}
      loader={<h4 className="text-green-100">Loading...</h4>}
      className="flex flex-col gap-4"
      scrollableTarget={"scrollId"}
    >
      {list.map((rating) => (
        <CardRating key={rating.id} data={rating} showUser />
      ))}
    </InfiniteScroll>
  );
}