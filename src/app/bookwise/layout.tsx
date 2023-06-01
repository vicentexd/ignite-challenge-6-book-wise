"use client";
import { HeaderNav } from "@/components/HeaderNav";
import { NavBar } from "@/components/NavBar";
import { SignInModalProvider } from "@/hook/useSignInModal";

export default function BookWiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-3 sm:gap-24 overflow-hidden">
      <SignInModalProvider>
        <HeaderNav />
        <NavBar />
      </SignInModalProvider>
      {children}
    </div>
  );
}