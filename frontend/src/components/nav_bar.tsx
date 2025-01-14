import { NavLink } from './nav_link';
import { useLocation } from 'react-router-dom';
import FotoCasa from '../../public/Foto-Casa.png'
import { AiOutlineHome } from "react-icons/ai";

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
      <nav className="h-[11%] w-full flex items-center justify-between px-12 bg-[#995935] bg-gradient-to-r from-[#995935] to-[#996B46] fixed z-10">
          <a href="/" className='flex items-center justify-between gap-5'>
            {/* <img src={FotoCasa} alt="Logo" className="h-[100px] w-[100px]" /> */}
            <div className='text-[50px] text-[#FFFFFF] '><AiOutlineHome/></div>
            <h1 className="text-[#FFFFFF] w-full font-sans text-[24px] pt-1 justify-center uppercase">Move-IN</h1>
          </a>
          <div className="flex items-center justify-between gap-5 pr-4">
            <h1 className='text-[#ffffff] font-sans text-[19px]'>{user.nome}</h1>
            <img src={`../../public/${user.foto}`} alt="Foto Usuário" className='h-[50px] w-[50px] rounded-full' />
          </div>
        </nav>
  )
}