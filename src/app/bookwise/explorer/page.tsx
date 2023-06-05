import { PageHeader } from "@/components/PageHeader";
import { ListAllBooks } from "./components/ListAll";


export default async function Explore() {
  return (
    <div className="flex min-h-screen items-start w-full pt-5 flex-col gap-3 max-w-[100vw] sm:max-w-[50vw] 2xl:max-w-full max-h-[100vh]">
      <PageHeader name="Explorar" page="explorer" />
      <div className="flex flex-col w-full h-full gap-10 pr-3 overflow-y-auto">
        <ListAllBooks />
      </div>
    </div>
  )
}
