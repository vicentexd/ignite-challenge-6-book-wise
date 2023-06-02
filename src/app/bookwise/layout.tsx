import { HeaderNav } from "@/components/HeaderNav";
import { NavBar } from "@/components/NavBar";
import { BookDetailProvider } from "@/hook/useBookDetails";
import { SignInModalProvider } from "@/hook/useSignInModal";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../api/auth/[...nextauth]/route";

async function getSession() {
  const session = await getServerSession(buildNextAuthOptions());

  return session;
}

export default async function BookWiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex flex-col flex-1 gap-3 overflow-hidden sm:flex-row sm:gap-24">
      <SignInModalProvider>
        <HeaderNav />
        <NavBar session={session} />
      </SignInModalProvider>
      <BookDetailProvider>
        {children}
      </BookDetailProvider>
    </div>
  );
}