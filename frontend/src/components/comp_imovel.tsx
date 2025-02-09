import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { TbRulerMeasure } from "react-icons/tb";
import { DetalhesImovel } from "../components/detalhes_imovel";
import { FaClipboardList } from "react-icons/fa";

type propsImovel = {
    id: number;
    nome: string;
    foto: string;
    valor: number;
    descricao: string;
    fornecimento_agua: string;
    fornecimento_luz: string;
    cadastro_iptu: string;
    matricula: string;
    cartorio_registro: string;
    area: number;
    area_testada: number;
    fracao_ideal: number;
    area_total: number;
    area_construida: number;
    endereco: string;
    latitude: number;
    longitude: number;
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompImovel ( { id_imovel }: TipoParametro ) {

    const [detalhes, setDetalhes] = useState(false);

    const imovel: propsImovel = {
        id: 1,
        nome: "Casa de Tiago",
        foto: "Casa1.jpg",
        valor: 300000.00,
        descricao: "Este incrível apartamento de 3 quartos, localizado no coração da cidade, combina conforto, praticidade e estilo. Com 120m² de área privativa, o imóvel oferece uma ampla sala de estar integrada com varanda, perfeita para momentos de lazer e convívio. ",
        fornecimento_agua: "Companhia de Saneamento Local",
        fornecimento_luz: "Companhia de Energia Elétrica Regional",
        cadastro_iptu: "123456789",
        matricula: "987654321",
        cartorio_registro: "Cartório de Registro de Imóveis - Zona Sul",
        area: 200.5,
        area_testada: 15.5,
        fracao_ideal: 0.15,
        area_total: 1500.75,
        area_construida: 120.4,
        endereco: "Av. Exemplo, 123 - Bairro Centro, Cidade Exemplo - Estado",
        latitude: -23.550520,
        longitude: -46.633308,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
    }) 

    return (
        <div className="flex items-center justify-center gap-16 pt-8">
            <img src={`../../public/${imovel.foto}`} alt="foto do imóvel" className="h-[700px] w-[1100px] rounded-3xl shadow-md"/>
            <div className=" bg-[#dededed3] h-[700px] w-[600px] rounded-3xl p-8 border-4 border-[#dbdbdb] shadow-md">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <h1 className="text-[50px] pb-4 font-outfit">{imovel.nome}</h1>
                        <h2 className="text-[18px] font-outfit">{imovel.descricao}</h2>
                        <h3 className="pt-4 text-[15px] font-outfit opacity-[70%]">{imovel.endereco}</h3>
                        <h2 className="text-[15px] pt-10">Aluguel</h2>
                        <div className="flex items-end">
                            <h1 className="text-[35px] text-zinc-700 font-bold">{imovel.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                            <h4 className="text-[20px] pb-2">/mes</h4>
                        </div>
                        <div className="pt-10 gap-3 flex items-center">
                            <TbRulerMeasure className="text-[30px]"/>
                            <h5>100 m²</h5>
                        </div>
                    </div>
                    <div className="justify-around flex items-center">
                        <button onClick={() => setDetalhes(true)} className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[30px]"><FaClipboardList/></button>
                        <div className="w-[200px] h-[160px] pt-1">
                            {isLoaded ? (
                            <GoogleMap mapContainerClassName="rounded-xl"
                                mapContainerStyle={{width: '100%', height: '100%'}}
                                center={{
                                lat: imovel.latitude,
                                lng: imovel.longitude
                                }}
                                zoom={18}
                            >
                                <Marker position={{
                                lat: imovel.latitude,
                                lng: imovel.longitude
                                }}/>
                            </GoogleMap>
                            ) : (
                            <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {detalhes && <DetalhesImovel 
                setModal={setDetalhes} 
                data={{
                    fornecimento_agua: imovel.fornecimento_agua,
                    fornecimento_luz: imovel.fornecimento_luz,
                    cadastro_iptu: imovel.cadastro_iptu,
                    matricula: imovel.matricula,
                    cartorio_registro: imovel.cartorio_registro,
                    area: imovel.area,
                    area_testada: imovel.area_testada,
                    fracao_ideal: imovel.fracao_ideal,
                    area_total: imovel.area_total,
                    area_construida: imovel.area_construida,
                }}
            />}
        </div>
    )
}