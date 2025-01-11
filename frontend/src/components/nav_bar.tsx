import { NavLink } from './nav_link';
import { useLocation } from 'react-router-dom';
import FotoCasa from '../../public/Foto-Casa.png'

type UserProps = {
  user: {
      nome: string
      foto: string
  }
}


export function NavBar( { user }: UserProps ){

  const location = useLocation();

  const estaEmInicio = location.pathname === '/';

  return(
      <nav className="h-[10%] w-full flex items-center justify-between px-12 bg-[#657368] bg-gradient-to-r from-[#657368] to-[#747975] fixed z-10">
          <div className='flex items-center justify-between'>
            <img src={FotoCasa} alt="Logo" className="h-[100px] w-[100px]" />
            <a href="/" className="text-[#FFFFFF] w-full font-sans text-[24px] justify-center">Move-IN</a>
          </div>
          <div className="flex items-center justify-between gap-5 pr-4">
            <h1 className='text-[#ffffff] font-sans text-[19px]'>{user.nome}</h1>
            <img src={`../../public/${user.foto}`} alt="Foto Usuário" className='h-[50px] w-[50px] rounded-full' />
          </div>
        </nav>
  )
}