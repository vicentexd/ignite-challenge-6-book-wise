import { BookData } from "@/@types";
import { ModalBook } from "@/components/ModalBook";
import { fetchWrapper } from "@/lib/fetch";
import React, { useCallback, useContext, useMemo, useState } from "react";

interface ProviderProps {
  children: React.ReactNode
}

interface BookDetailContextProps {
  book?: BookData | undefined;
  handleUpdateBook: () => Promise<boolean>;
  handleModalBook: (selectedBook: BookData | undefined) => void;
}

const BookDetailContext = React.createContext({} as BookDetailContextProps);

function BookDetailProvider({ children }: ProviderProps) {
  const [book, setBook] = useState<BookData>()

  const handleModalBook = (selectedBook: BookData | undefined) => {
    setBook(selectedBook);
  }

  const handleUpdateBook = useCallback(async () => {
    try {
      if (!book?.id) return false

      const response = await fetchWrapper<{ book: BookData }>(`books/get-book-by-id?bookId=${book?.id}`)

      if (response) {
        setBook(response.book)
        return true

      }
      return false

    } catch (error) {
      console.log('error', error)

      return false
    }
  }, [book])

  const values: BookDetailContextProps = useMemo(() => ({
    handleModalBook,
    book,
    handleUpdateBook,
  }), [book, handleUpdateBook])

  return (
    <BookDetailContext.Provider value={values}>
      <ModalBook book={book!} handleModal={() => handleModalBook(undefined)} visible={!!book} />
      {children}
    </BookDetailContext.Provider>
  )

}

function useBookDetail() {
  const context = useContext(BookDetailContext)

  return context;
}

export { useBookDetail, BookDetailProvider }