
import logoImg from "@/assets/Logo.png";
import Image from "next/image";
import { NavItem } from "./NavItem/Index";
import { ProfileSection } from "./ProfileSession";
import { Session, getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";



type Props = {
  session: Session | null;
}

export function NavBar({ session }: Props) {

  return (
    <nav className="hidden sm:flex w-80 h-auto p-10 flex-col items-center justify-between bg-cover bg-no-repeat bg-[url(../assets/navBarbackground.png)] ">
      <div>
        <Image src={logoImg} alt="Book Wise" height={48} />
      </div>

      <ul className="flex flex-col flex-1 gap-4 mt-16">
        <NavItem name="Início" page="home" />
        <NavItem name="Explorar" page="explorer" />
        {session?.user && <NavItem name="Perfil" page="profile" />}
      </ul>

      <div>
        <ProfileSection data={session} />
      </div>
    </nav>
  );
}