import { useEffect, useRef, useState } from "react";
import { NavBar } from "../components/nav_bar";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from '@react-google-maps/api'
import CarregarImoveis from "../apis/carregar_imoveis";
import { api, apiFotos } from "../apis/api";
import { useMediaQuery } from 'react-responsive';
import { twMerge } from "tailwind-merge";
import { FaPencilAlt } from "react-icons/fa";
import { ModificarStatusImovel } from "../components/modificar_status_imovel";
import { isLoaded } from "../../keys"

//

type userProps = {
  username: string,
}

type imovelProps = {
  id: number,
  nome: string,
  rua: string,
  bairro: string,
  numero: string,
  foto: string | File,
  latitude: number,
  longitude: number,
  valor: number,
  tipo_cotacao: 0 | 1 | 2 ;
  status_imovel: string;
}

export function Inicio() {

  const [contador, setContador] = useState(0);
  const [imovel, setImovel] = useState(0);
  const [id_imovel, setId_imovel] = useState(0);
  const [casas, setCasas] = useState<imovelProps[][]>([]);
  const seedersChamado = useRef(false);
  const [rule, setRule] = useState("");

  const [modificar_status, setModificarStatus] = useState(false);

  const isMidScreen = useMediaQuery({ query: '(min-width: 1024px)' })
  const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })

  const user: userProps = {
    username: localStorage.getItem("nome_usuario") ?? "",
  };

  useEffect (() => {
    
    const fetchData = async () => {
      
      try {
        const responseRule = await api.get(`v1/inicio/return-rule/${user.username}`);
        localStorage.setItem("rule_user", responseRule.data.rule);
        setRule(responseRule.data.rule);
      } catch(error) {

      }

      const dataImoveis = await CarregarImoveis();

      if (!seedersChamado.current) {
        seedersChamado.current = true;
        await api.post('/v1/inicio/run-seeders');
      }


      if(dataImoveis?.imoveis)
        setCasas(dataImoveis.imoveis);
    }

    fetchData();

  }, []);

  const navigate = useNavigate();

  const redirectCriarImoveis = () => {
    navigate('/criar-imoveis');
  };

  const redirectExibirImoveis = () => {
    navigate(`/exibir-imovel`, { state: {id_imovel: id_imovel} });
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
    <div className="h-full sm:h-screen w-full">
      <NavBar user={user}>
      </NavBar>
      <body className="h-full w-full p-6 lg:pl-16 pt-[70px] sm:pt-[95px]">
        <div className="bg-[#FFFFFF]"></div>
        <div className="flex h-full">
          <div className={twMerge("", casas.length == 0 ? "w-full px-14" : "w-full xl:w-[70%] 2xl:w-[50%]" )}>
            <div className="flex items-center justify-between w-full pt-14 pb-6 sm:pb-10">
              <h1 className="text-[35px] font-sans">Imóveis</h1>
              <div className={twMerge("flex items-center pr-0 sm:pr-7", casas.length == 0 ? "gap-32" : "gap-4" )}>
                <button onClick={lastPage}><BsArrowLeftCircle className={casas.length == 0 ? "text-[40px]" : "text-[30px]"}/></button>
                <button onClick={nextPage}><BsArrowRightCircle className={casas.length == 0 ? "text-[40px]" : "text-[30px]"}/></button>
              </div>
              { rule == "admin" &&
                <div>
                  <button data-toggle="tooltip" data-placement="top" title="Cadastrar imóvel" onClick={() => redirectCriarImoveis()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF] transition ease-in-out delay-100 hover:scale-110"><GrAdd/></button>
                </div>
              }
            </div>
            <div className="grid grid-rows-3 gap-5 w-full mb-10 lg:mb-0">
              {casas[contador] ? (
                casas[contador].map((casa, index) => 
                  <button key={index} onClick={() => setImovel(index)} onMouseOver={() => setId_imovel(casa.id)} className="bg-[#DEDEDE] h-[31rem] md:h-[13rem] w-full cursor-default px-5 py-2 hover:bg-slate-300 rounded-xl shadow-md border-2 border-[#a1a1a1d3] border-3">
                    <div className={twMerge("w-full", !isLowScreen ? 'flex-col' : 'flex justify-between')}>
                      <div className={twMerge("", !isLowScreen? 'justify-around flex flex-col items-center' : 'flex ' )}>
                        <img src={apiFotos + casa.foto} className="h-[200px] sm:h-[165px]  mb-5 sm:mb-0 w-full sm:w-[250px] rounded-xl shadow-md"/>
                        <div className="pl-0 sm:pl-8 pt-1">
                          <h1 className="text-[25px] text-slate-800 text-center sm:text-left pb-2 font-serif">{casa.nome}</h1>
                          <h1 className="text-[18px] text-slate-600 font-sans pb-5 sm:pb-8">{!isMidScreen ? ( <>{casa.rua}, {casa.numero},<br/> {casa.bairro}</>) : (<> {casa.rua}, {casa.numero}, {casa.bairro}</>)}</h1>
                          <div className="flex justify-center sm:justify-start items-center gap-2">
                            <h1 className="bg-slate-500 py-2 px-10 sm:px-3 text-[15px] text-center font-medium text-white rounded-md">{casa.status_imovel}</h1>
                            {rule == "admin" && <button onClick={() => {setModificarStatus(true);}} className="rounded-lg bg-[#0258d9b4] flex justify-center items-center h-[37px] w-[37px] transition ease-in-out delay-100 hover:scale-125"><FaPencilAlt className="text-[18px] text-slate-100"/></button>}
                          </div>
                        </div>
                      </div>
                      <div className={twMerge(" pt-5 lg:pt-3 ", isLowScreen ? 'flex flex-col items-center justify-between' : 'flex items-center justify-around')}>
                        <div className="flex items-end">
                            <h1 className="text-[30px] text-zinc-700 font-medium">{casa.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                            <h4 className="text-[18px] pb-2">{casa.tipo_cotacao == 1 ? "/mês" : ""}</h4>
                        </div>
                        <button onClick={() => redirectExibirImoveis()} className="text-[45px] text-slate-600 font-extralight transition hover:scale-125"><IoChevronForwardCircleOutline/></button>
                      </div>
                    </div>
                  </button>
                )
              ) : casas.length == 0 ? "" :
              (
              <p>Carregando imóveis...</p>
              )}
            </div>
          </div>
          { (isMidScreen && casas.length != 0) &&
            <div className="w-[30%] xl:w-[30%] 2xl:w-[50%] px-9 pt-12">
              <div className="bg-slate-300 w-full h-full rounded-lg">
                {isLoaded && casas[contador] && casas.length > 0 ? (
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
          }
        </div>
        
      </body>

      {modificar_status && <ModificarStatusImovel setModal={setModificarStatus} id_imovel={id_imovel} />}
    </div>

  )
}

