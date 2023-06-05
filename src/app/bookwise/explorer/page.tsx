import { PageHeader } from "@/components/PageHeader";
import { SearchInput } from "@/components/SearchInput";

export default function Explore() {
  return (
    <div className="flex min-h-screen items-start w-full pt-5 flex-col gap-3 max-w-[100vw] sm:max-w-[50vw] 2xl:max-w-full max-h-[100vh]">
      <PageHeader name="Explorar" page="explorer" />

      <div className="flex flex-col w-full h-full bg-green-200">
        <div className="self-end w-2/3">
          <SearchInput placeholder="Buscar livro ou autor" />
        </div>


      </div>

    </div>
  )
}
