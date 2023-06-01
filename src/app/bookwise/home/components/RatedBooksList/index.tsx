'use client'

import { BookData } from "@/@types"
import { CardPreview } from "@/components/CardPreview"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import { ModalBook } from "./ModalBook"

type Props = {
  books: BookData[]
}

export function RatedBooksList({ books }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  const [selectedBook, setSelectedBook] = useState<BookData>()
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(
        ref?.current?.scrollWidth ?? 0
      );
    };

    calcSliderChildrenWidth();

    const calcSliderWidth = () => {
      setSliderWidth(ref?.current?.clientWidth ?? 0);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    const calcSliderConstraints = () => {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    };

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);
  }, [ref, sliderChildrenWidth, sliderWidth]);



  return (
    <motion.div className="flex overflow-x-hidden">
      <motion.div
        drag='x'
        onDragStart={() => {
          setIsDragging(true)
        }}
        onDragEnd={() => {
          setIsDragging(false)
        }}
        ref={ref}
        dragTransition={{
          bounceDamping: 100,
          bounceStiffness: 500,
        }}
        initial={{ x: 0 }}
        dragConstraints={{
          left: -(sliderConstraints + 12),
          right: 0,
        }}
        className="flex flex-row max-w-[95vw] sm:max-w-[50vw] gap-4 pb-2 2xl:flex-col"
      >
        {books.map((book) => (
          <CardPreview onClick={!isDragging ? el => setSelectedBook(el) : undefined} book={book} imageSize="sm" key={book.id} />
        ))}
      </motion.div>



      <ModalBook book={selectedBook!} handleModal={() => setSelectedBook(undefined)} visible={!!selectedBook} />
    </motion.div>
  )
}