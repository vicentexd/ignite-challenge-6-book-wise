
import logoImg from '@/assets/Logo.png'
import Image from 'next/image'
import { NavItem } from './NavItem/Index'
import { ProfileSection } from './ProfileSession'


export function NavBar() {
  return (
    <nav className="w-80 h-screen p-10 flex-col flex items-center justify-between rounded-lg bg-cover bg-no-repeat bg-[url(../assets/navBarbackground.png)]">
      <div>
        <Image src={logoImg} alt='Book Wise' height={48} />
      </div>

      <ul className='flex gap-4 flex-col flex-1 mt-16'>
        <NavItem name='Início' page='home' />
        <NavItem name='Explorar' page='explorer' />
        <NavItem name='Perfil' page='profile' />
      </ul>

      <div>
        <ProfileSection />
      </div>
    </nav>
  )
}