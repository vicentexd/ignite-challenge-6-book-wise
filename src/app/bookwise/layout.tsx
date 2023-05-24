import { NavBar } from "@/components/NavBar";

export default function BookWiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-1 gap-24">
      <NavBar />
      {children}
    </div>
  )
}