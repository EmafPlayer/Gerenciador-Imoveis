import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { TbRulerMeasure } from "react-icons/tb";
import { DetalhesImovel } from "../components/detalhes_imovel";
import { FaClipboardList, FaFileImage } from "react-icons/fa";
import { UploadFotos } from "./upload_fotos";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import carregarImovel from "../apis/carregar_imovel";

type propsImovel = {
    id: number;
    nome: string;
    fotos: {endereco: string}[];
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
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string,
    latitude: number;
    longitude: number;
    tipo:boolean;
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompImovel ( { id_imovel }: TipoParametro ) {

    const [detalhes, setDetalhes] = useState(false);
    const [contador, setContador] = useState(0);
    const [imovel, setImovel] = useState<propsImovel>();

    const[modal, setModal] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
    }) 

    useEffect (()=> {
        
        const fetchData = async () => {

            const response = await carregarImovel(id_imovel);

            console.log(response?.imovel);

            if(response?.imovel){
                setImovel(response.imovel);
            }else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }

        }

        fetchData();

    }, []);

    console.log(imovel);

    function nextPage () {
        if (contador < imovel.fotos.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    if(!imovel){
    } else {
        return (
            <div className="flex items-center justify-center gap-16 pt-8">
                {imovel.fotos.length == 0 ? 
                
                <div className="h-[700px] w-[1000px] rounded-3xl shadow-md bg-slate-300"></div>
                
                :
                
                <div className="flex items-center gap-7">
                    <button onClick={lastPage}><BsArrowLeftCircle className="text-[45px]"/></button>
                    <img src={`http://127.0.0.1:8000/api/v1/inicio/${imovel.fotos[contador].endereco}`} alt="foto do imóvel" className="h-[700px] w-[1000px] rounded-3xl shadow-md"/>
                    <button onClick={nextPage}><BsArrowRightCircle className="text-[45px]"/></button>
                </div>
                }
                <div className=" bg-[#dededed3] h-[700px] w-[600px] rounded-3xl p-8 border-4 border-[#dbdbdb] shadow-md">
                    <div className="h-full flex flex-col justify-between">
                        <div>
                            <h1 className="text-[50px] font-outfit">{imovel.nome}</h1>
                            <h3 className="pt-3 pb-5 text-[15px] font-outfit opacity-[70%]">{imovel.rua}, {imovel.numero} - {imovel.bairro} - {imovel.cidade}, {imovel.estado}</h3>
                            <h2 className="text-[18px] font-outfit overflow-auto overscroll-contain h-36">{imovel.descricao}</h2>
                            <h2 className="text-[15px]">{imovel.tipo == false ? "Aluguel" : "Venda"}</h2>
                            <div className="flex items-end">
                                <h1 className="text-[35px] text-zinc-700 font-bold">{imovel.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                <h4 className="text-[20px] pb-2">{imovel.tipo == false ? "/mes" : ""}</h4>
                            </div>
                            <div className="pt-10 gap-3 flex items-center">
                                <TbRulerMeasure className="text-[30px]"/>
                                <h5>100 m²</h5>
                            </div>
                        </div>
                        <div className="justify-around flex items-center">
                            <button onClick={() => setDetalhes(true)} data-toggle="tooltip" data-placement="top" title="Destalhes do imóvel" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[30px]"><FaClipboardList/></button>
                            <div className="flex items-end">
                                <button onClick={(e) => {setModal(true); e.preventDefault();}} data-toggle="tooltip" data-placement="top" title="Upload Fotos" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[30px]"><FaFileImage/></button>
                            </div>
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
    
                {modal && <UploadFotos setModal={setModal} id_imovel={id_imovel}/>}
            </div>
        )
    }
    
}