"use client"
import { NavBar } from "@/components/NavBar";
import { SignInModalProvider } from "@/hook/useSignInModal";

export default function BookWiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 gap-24">
      <SignInModalProvider>
        <NavBar />
      </SignInModalProvider>
      {children}

    </div>
  )
}