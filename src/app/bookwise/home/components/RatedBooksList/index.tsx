'use client'

import { BookData, CardPreview } from "@/components/CardPreview"
import { motion, useMotionValue, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from "react"

type Props = {
  books: BookData[]
}

export function RatedBooksList({ books }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

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
        ref={ref}
        dragTransition={{
          bounceDamping: 100,
          bounceStiffness: 500,
        }}
        initial={{ x: 0 }}
        dragConstraints={{
          left: -sliderConstraints,
          right: 0,
        }}
        className="flex flex-row max-w-[95vw] sm:max-w-[50vw] gap-4 pb-2 2xl:flex-col"
      >
        {books.map((book) => (
          <CardPreview book={book} imageSize="sm" key={book.id} />
        ))}
      </motion.div>

    </motion.div>
  )
}