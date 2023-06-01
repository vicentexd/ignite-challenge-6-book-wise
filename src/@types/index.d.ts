import { Book, CategoriesOnBooks, Category, Rating, User } from "@prisma/client";

export type RatingData = Rating & {
  user: User;
}

export type BookData = Book & {
  ratings: RatingData[];
  categories: (CategoriesOnBooks & {
    category: Category;
  })[];
};