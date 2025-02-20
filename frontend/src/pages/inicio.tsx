import { useEffect, useState } from "react";
import { NavBar } from "../components/nav_bar";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import CarregarImoveis from "../apis/carregar_imoveis";
import foto from "../../../backend/public/storage/fotos/Casa2.jpg"
import { api } from "../apis/api";

//

type userProps = {
  nome: string,
  foto: string,
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
  tipo: boolean;
}

export function Inicio() {

  const [contador, setContador] = useState(0);
  const [imovel, setImovel] = useState(0);
  const [id_imovel, setId_imovel] = useState(0);
  const [casas, setCasas] = useState<imovelProps[][]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
  })

  localStorage.setItem("nome_usuario", "Emanuel");
  localStorage.setItem("foto_usuario", "Emanu.jpg");

  const user: userProps = {
    nome: localStorage.getItem("nome_usuario") ?? "",
    foto: localStorage.getItem("foto_usuario") ?? ""
  };

  useEffect (() => {
    
    const fetchData = async () => {
      
      const dataImoveis = await CarregarImoveis();

      console.log(dataImoveis?.imoveis);

      if(dataImoveis?.imoveis){
        setCasas(dataImoveis.imoveis);
      } else {
        console.warn("Tabela não encontrada ou dados inválidos:");
      }

    }

    fetchData();

  }, []);

  const navigate = useNavigate();

  const redirectCriarImoveis = () => {
    navigate('/criar-imoveis');
  };

  const redirectExibirImoveis = () => {
    navigate(`/exibir-imoveis/${id_imovel}`);
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
      <NavBar user={user}>
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
                <button onClick={() => redirectCriarImoveis()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF]"><GrAdd/></button>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-5 w-full">
              {casas[contador] ? (
                casas[contador].map((casa, index) => 
                  <button key={index} onClick={() => setImovel(index)} onMouseOver={() => setId_imovel(casa.id)} className="bg-[#DEDEDE] h-[13rem] w-full cursor-default px-5 py-2 hover:bg-slate-300 rounded-xl shadow-md border-2 border-[#a1a1a1d3] border-3 flex items-center justify-between">
                    <div className="w-full flex justify-between">
                      <div className="flex">
                        <img src={`http://127.0.0.1:8000/api/v1/inicio/${casa.foto}`} className="h-[165px] w-[250px] rounded-xl shadow-md"/>
                        <div className="pl-8 pt-4">
                          <h1 className="text-[25px] text-slate-800 text-left pb-2 font-serif">{casa.nome}</h1>
                          <h1 className="text-[18px] text-slate-600 font-sans">{casa.rua}, {casa.numero}, {casa.bairro}</h1>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-[70px]">
                        <div className="pt-">
                          <div className="flex items-end">
                              <h1 className="text-[35px] text-zinc-700 font-medium">{casa.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                              <h4 className="text-[20px] pb-2">{casa.tipo == false ? "/mes" : ""}</h4>
                          </div>
                          <h2 className="text-[15px]">{casa.tipo == false ? "Aluguel" : "Venda"}</h2>
                        </div>
                        <button onClick={() => redirectExibirImoveis()} className="text-[30px] font-extralight"><IoChevronForwardCircleOutline/></button>
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
          {}
          <div className="w-[50%] px-9 pt-14">
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
        
      </body>
    </div>

  )
}

