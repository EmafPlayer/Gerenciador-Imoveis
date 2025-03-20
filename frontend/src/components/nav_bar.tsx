// import { useLocation } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import foto from "../../public/user.jpg"

type UserProps = {
  user: {
      username: string
  }
}


export function NavBar( { user }: UserProps ){

  // const location = useLocation();

  // const estaEmInicio = location.pathname === '/';

  return(
      <nav className="h-[11%] w-full flex items-center justify-between px-3 sm:px-12 bg-[#FF5500] bg-gradient-to-r from-[#FF5500] to-[#ff5500da] fixed z-10">
          <a href="/home" className='flex items-center justify-between gap-5'>
            {/* <img src={FotoCasa} alt="Logo" className="h-[100px] w-[100px]" /> */}
            <div className='text-[50px] text-[#FFFFFF] '><AiOutlineHome/></div>
            <h1 className="text-[#FFFFFF] w-full font-sans text-[25px] sm:text-[30px] pt-1 justify-center uppercase">MGI

            </h1>
          </a>
          <div className="flex items-center justify-between gap-5 pr-0 sm:pr-4">
            <h1 className='text-[#ffffff] font-sans text-[17px] sm:text-[19px]'>{user.username}</h1>
            <img src={foto} alt="Foto Usuário" className='h-[50px] w-[50px] rounded-full' />
          </div>
        </nav>
  )
}