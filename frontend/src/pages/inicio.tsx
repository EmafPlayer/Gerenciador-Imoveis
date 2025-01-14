import { useState } from "react";
import { NavBar } from "../components/nav_bar";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export function Inicio() {

  const [contador, setContador] = useState(0);

  const user = [
    {
      "nome": "Emanuel",
      "foto": "Emanu.jpg"
    }
  ];

  const casas = [
    [
      {
        "nome": "3 rooms, modern apartament",
        "endereço": "Av. Beberibe, Porto da madeira, 3530",
        "foto": "Casa1.jpg",
        "latitude": -8.00285832655661,
        "longitude": -34.90021374951911,
        "valor": 300000.00
      },
      {
        "nome": "Beachfront Villa",
        "endereço": "Rua dos Pescadores, Praia Grande, 120",
        "foto": "Casa2.jpg",
        "latitude": -8.15234832455632,
        "longitude": -34.90273453421312,
        "valor": 600000.00
      },
      {
        "nome": "Cozy Mountain Cabin",
        "endereço": "Estrada do Pico, Serra Azul, 45",
        "foto": "Casa3.jpg",
        "latitude": -8.53287498765432,
        "longitude": -35.12456324567891,
        "valor": 1000000.00
      }
    ],
    [
      {
        "nome": "a",
        "endereço": "Estrada do Pico, Serra Azul, 45",
        "foto": "Casa4.jpg",
        "latitude": -8.53287498765432,
        "longitude": -35.12456324567891,
        "valor": 900000.00
      }
    ]

  ];

  const navigate = useNavigate();

  const redirect = (user: any) => {
    navigate('/criar-imoveis', { state: { user } });
  };

  function nextPage () {
    if (contador < casas.length - 1)
      setContador(contador + 1);
  }

  function lastPage () {
    if (contador > 0)
        setContador(contador - 1);
  }

  return (
    <div className="h-screen w-full">
      <NavBar user={user[0]}>
      </NavBar>
      <body className="relative h-full w-full pl-16 z-0 pt-[95px]">
        <div className="absolute inset-0 bg-[url('../../public/fundo.svg')] bg-cover bg-center opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between w-[50%]">
            <h1 className="text-[35px] pt-14 pb-10 font-serif">Imóveis</h1>
            <div className="flex items-center gap-4 pr-10">
              <button onClick={lastPage}><BsArrowLeftCircle className="text-[30px]"/></button>
              <button onClick={nextPage}><BsArrowRightCircle className="text-[30px]"/></button>
            </div>
            <div>
              <button onClick={() => redirect(user[0])} className="bg-blue-400 p-2 text-[#ffffff]"><IoAdd/></button>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-5 w-[50%]">
          {casas[contador].map((casa) => 
            <div className="bg-[#ffffff] h-[13rem] w-full p-5 hover:bg-slate-100 rounded-xl shadow-md border-2 border-[#a1a1a1d3] border-3 flex items-center justify-between">
              <div className="w-full flex justify-between">
                <div className="flex">
                  <img src={`../../public/${casa.foto}`} alt="Foto da casa" className="h-[165px] w-[250px] rounded-xl shadow-md"/>
                  <div className="pl-8 pt-4">
                    <h1 className="text-[25px] text-slate-800 pb-2 font-serif">{casa.nome}</h1>
                    <h1 className="text-[18px] text-slate-600 font-sans">{casa.endereço}</h1>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-[70px] pb-2">
                  <h1 className="text-[22px] font-normal pr-6">R$ {casa.valor}</h1>
                  <button className="text-[30px] font-extralight"><IoChevronForwardCircleOutline/></button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
        
      </body>
    </div>

  )
}

