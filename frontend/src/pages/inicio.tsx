import { useState } from "react";
import { NavBar } from "../components/nav_bar";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'



export function Inicio() {

  const [contador, setContador] = useState(0);
  const [imovel, setImovel] = useState(0);
  const [id_imovel, setId_imovel] = useState(0);


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
  })

  const user = [
    {
      "nome": "Emanuel",
      "foto": "Emanu.jpg"
    }
  ];


  const casas = [
    [
      {
        "id": 1,
        "nome": "3 rooms, modern apartament",
        "endereço": "Av. Beberibe, Porto da madeira, 3530",
        "foto": "Casa1.jpg",
        "latitude": -8.00285832655661,
        "longitude": -34.90021374951911,
        "valor": 300000.00
      },
      {
        "id": 2,
        "nome": "Beachfront Villa",
        "endereço": "Rua dos Pescadores, Praia Grande, 120",
        "foto": "Casa2.jpg",
        "latitude": -22.70072211276618,
        "longitude": -43.27024814633193,
        "valor": 600000.00
      },
      {
        "id": 3,
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
        "id": 4,
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

  const redirectCriarImoveis = (user: any) => {
    navigate('/criar-imoveis', { state: { user } });
  };

  const redirectExibirImoveis = (user: any) => {
    navigate(`/exibir-imoveis/${id_imovel}`, { state: { user } });
  };

  function nextPage () {
    if (contador < casas.length - 1){
      setContador(contador + 1);
      setImovel(0);
    }
  }

  function lastPage () {
    if (contador > 0){
      setContador(contador - 1);
      setImovel(0);
    }
  }

  return (
    <div className="h-screen w-full">
      <NavBar user={user[0]}>
      </NavBar>
      <body className="h-full w-full pl-16 pt-[95px]">
        <div className="bg-[#FFFFFF]"></div>
        <div className="flex">
          <div className="w-[50%]">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[35px] pt-14 pb-10 font-serif">Imóveis</h1>
              <div className="flex items-center gap-4 pr-7">
                <button onClick={lastPage}><BsArrowLeftCircle className="text-[30px]"/></button>
                <button onClick={nextPage}><BsArrowRightCircle className="text-[30px]"/></button>
              </div>
              <div>
                <button onClick={() => redirectCriarImoveis(user[0])} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF]"><GrAdd/></button>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-5 w-full">
            {casas[contador].map((casa, index) => 
              <button onClick={() => setImovel(index)} onMouseOver={() => setId_imovel(casa.id)} className="bg-[#DEDEDE] h-[13rem] w-full cursor-default p-5 hover:bg-slate-300 rounded-xl shadow-md border-2 border-[#a1a1a1d3] border-3 flex items-center justify-between">
                <div className="w-full flex justify-between">
                  <div className="flex">
                    <img src={`../../public/${casa.foto}`} alt="Foto da casa" className="h-[165px] w-[250px] rounded-xl shadow-md"/>
                    <div className="pl-8 pt-4">
                      <h1 className="text-[25px] text-slate-800 text-left pb-2 font-serif">{casa.nome}</h1>
                      <h1 className="text-[18px] text-slate-600 font-sans">{casa.endereço}</h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-[70px] pb-2">
                    <h1 className="text-[22px] font-normal pr-6">R$ {casa.valor}</h1>
                    <button onClick={() => redirectExibirImoveis(user[0])} className="text-[30px] font-extralight"><IoChevronForwardCircleOutline/></button>
                  </div>
                </div>
              </button>
            )}
            </div>
          </div>
          <div className="w-[50%] px-9 pt-14">
            {isLoaded ? (
              <GoogleMap mapContainerClassName="rounded-xl"
                mapContainerStyle={{width: '100%', height: '100%'}}
                center={{
                  lat: casas[contador][imovel].latitude,
                  lng: casas[contador][imovel].longitude
                }}
                zoom={16}
              >
                <Marker position={{
                  lat: casas[contador][imovel].latitude,
                  lng: casas[contador][imovel].longitude
                }}/>
              </GoogleMap>
            ) : (
              <></>
            )}
          </div>
        </div>
        
      </body>
    </div>

  )
}

