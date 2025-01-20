import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { TbRulerMeasure } from "react-icons/tb";


export function ExibirImoveis () {

    const imovel = [
        {
            "id": 1,
            "nome": "Casa de Tiago",
            "endereço": "Av. Beberibe, Porto da madeira, 3530",
            "foto": "Casa1.jpg",
            "latitude": -8.00285832655661,
            "longitude": -34.90021374951911,
            "valor": 300000.00,
            "descricao": "Este incrível apartamento de 3 quartos, localizado no coração da cidade, combina conforto, praticidade e estilo. Com 120m² de área privativa, o imóvel oferece uma ampla sala de estar integrada com varanda, perfeita para momentos de lazer e convívio. ",
        }
    ];

    const location = useLocation();

    const [stateImovel, setStateImovel] = useState(true);
    const [stateCotacoes, setStateCotacoes] = useState(false);
    const [stateDespesas, setStateDespesas] = useState(false);
    const [stateImbiliarias, setStateImobiliarias] = useState(false);

    function botaoImovel () {
        setStateImovel(true);
        setStateCotacoes(false);
        setStateDespesas(false);
        setStateImobiliarias(false);
    }

    function botaoCotacoes () {
        setStateImovel(false);
        setStateCotacoes(true);
        setStateDespesas(false);
        setStateImobiliarias(false);
    }

    function botaoDespesas () {
        setStateImovel(false);
        setStateCotacoes(false);
        setStateDespesas(true);
        setStateImobiliarias(false);
    }

    function botaoImobiliarias () {
        setStateImovel(false);
        setStateCotacoes(false);
        setStateDespesas(false);
        setStateImobiliarias(true);
    }
    
    let user = location.state.user;

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
    })


    return (
        <div className="h-screen w-full">
            <NavBar user={user}/>
            <body className="h-full w-full bg-[#FFFFFF] pt-[105px] px-16">
            
            <ul className="flex items-center justify-around pt-10">
                <li><button onClick={() => botaoImovel()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateImovel ? 'border-b-[#FF5500]' : '' )}>Imóveis</button></li>
                <li><button onClick={() => botaoCotacoes()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateCotacoes ? 'border-b-[#FF5500]' : '' )}>Cotações</button></li>
                <li><button onClick={() => botaoDespesas()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateDespesas ? 'border-b-[#FF5500]' : '' )}>Despesas</button></li>
                <li><button onClick={() => botaoImobiliarias()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateImbiliarias ? 'border-b-[#FF5500]' : '' )}>Imobiliárias</button></li>
            </ul>
            {stateImovel && 
                <div className="flex items-center gap-16 pt-8">
                    <img src={`../../public/${imovel[0].foto}`} alt="foto do imóvel" className="h-[700px] w-[1100px] rounded-3xl shadow-md"/>
                    <div className=" bg-[#dededed3] h-[700px] w-[600px] rounded-3xl p-8 border-4 border-[#dbdbdb] shadow-md">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <h1 className="text-[50px] pb-4 font-outfit">{imovel[0].nome}</h1>
                                <h2 className="text-[18px] font-outfit">{imovel[0].descricao}</h2>
                                <h3 className="pt-4 text-[15px] font-outfit opacity-[70%]">{imovel[0].endereço}</h3>
                                <h2 className="text-[15px] pt-10">Aluguel</h2>
                                <div className="flex items-end">
                                    <h1 className="text-[35px] text-zinc-700 font-bold">R$ {imovel[0].valor}</h1>
                                    <h4 className="text-[20px] pb-2">/mes</h4>
                                </div>
                                <div className="pt-10 gap-3 flex items-center">
                                    <TbRulerMeasure className="text-[30px]"/>
                                    <h5>100 m²</h5>
                                </div>
                            </div>
                            <div className="justify-end flex">
                                <div className="w-[200px] h-[160px] pt-1">
                                    {isLoaded ? (
                                    <GoogleMap mapContainerClassName="rounded-xl"
                                        mapContainerStyle={{width: '100%', height: '100%'}}
                                        center={{
                                        lat: imovel[0].latitude,
                                        lng: imovel[0].longitude
                                        }}
                                        zoom={18}
                                    >
                                        <Marker position={{
                                        lat: imovel[0].latitude,
                                        lng: imovel[0].longitude
                                        }}/>
                                    </GoogleMap>
                                    ) : (
                                    <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
                
            </body>
        </div>
    )


}