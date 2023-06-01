"use client";
import logoImg from "@/assets/Logo.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Hamburger, List } from "@phosphor-icons/react";

export function HeaderNav() {
  const { data } = useSession();

  return (
    <>
      <div className="flex sm:hidden h-16 w-[100vw] bg-cover bg-no-repeat bg-[url(../assets/navBarbackground.png)] absolute left-0 z-10 px-3 items-center justify-between">
        <div className="flex items-center justify-center">
          <Image src={logoImg} alt="Book Wise" height={32} />
        </div>
        <button>
          <List className={"text-gray-100 text-xl"} size={28} />
        </button>
      </div>
    </>
  );
}