"use client";

import { BookData } from "@/@types";
import { ButtonCategory } from "@/components/ButtonCategory";
import { CardPreview } from "@/components/CardPreview";
import { SearchInput } from "@/components/SearchInput";
import { useBookDetail } from "@/hook/useBookDetails";
import { fetchWrapper } from "@/lib/fetch";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";


export function ListAllBooks() {
  const [list, setList] = useState<BookData[]>([]);
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [maxLength, setMaxLength] = useState(0);
  const [search, setSearch] = useState('')
  const { handleModalBook } = useBookDetail();

  async function fetchData(search: string = '', category: string = '') {
    try {
      console.log(category, search)
      const { books, count } = await fetchWrapper<{ books: BookData[], count: number }>(
        `books?search=${search}&category=${category}`
      );
      console.log('-------------', books)
      if (books) {
        setList((prev) => [...prev, ...books]);
      }
      setMaxLength(count);
    } catch (error) {
      return null;
    }
  }

  async function getAllCategory() {
    try {
      const { categories } = await fetchWrapper<{ categories: Category[] }>(
        `categories`
      );
      
      if (categories) {
        setListCategory([...categories]);
      }
    } catch (error) {
      return null;
    }
  }

  const handleUpdateSearch = async (value: string) => {
    setList([])
    setSearch(value)
    await fetchData(value, category)
  }

  const handleUpdateCategory = async (value: string) => {
    setList([])
    setCategory(value)
    await fetchData(search, value)
  }


  useEffect(() => {
    fetchData();
    getAllCategory()
  }, []);

  return (
    <div className="flex flex-col gap-5">
      { listCategory.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-3">
            <ButtonCategory 
            //  className={`${!category && 'bg-purple-200'}`}
             active={!category}
             onClick={() => handleUpdateCategory('')}
            >
              Todos
            </ButtonCategory>
            {
              listCategory.map(ctg => 
                <ButtonCategory 
                  key={ctg.id} 
                  onClick={() => handleUpdateCategory(ctg.id)} 
                  active={ctg.id === category}
                >
                  {ctg.name}
                </ButtonCategory>
            )}
          </div>
        )
      }
      <div className="w-full">  
        <SearchInput
          placeholder="Buscar livro avaliado"
          onChange={(e) => handleUpdateSearch(e.target.value)}
          value={search}
        />
      </div>
      
      
      <div className="flex flex-wrap gap-5 pb-5">
        {list.map(book => 
            <CardPreview book={book} key={book.id} onClick={() => handleModalBook(book)}/>
        )}
      </div>    
    </div>
  );
}