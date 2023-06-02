"use client";
import { HeaderNav } from "@/components/HeaderNav";
import { NavBar } from "@/components/NavBar";
import { BookDetailProvider } from "@/hook/useBookDetails";
import { SignInModalProvider } from "@/hook/useSignInModal";

export default function BookWiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 gap-3 overflow-hidden sm:flex-row sm:gap-24">
      <SignInModalProvider>
        <HeaderNav />
        <NavBar />
      </SignInModalProvider>
      <BookDetailProvider>
        {children}
      </BookDetailProvider>
    </div>
  );
}