import { useEffect, useState } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api'
import { DetalhesImovel } from "../components/popup_detalhes_imovel";
import { FaClipboardList, FaFileImage } from "react-icons/fa";
import { UploadFotos } from "../components/upload_fotos";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import carregarImovel from "../apis/carregar_imovel";
import { IoKey, IoPeopleSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { CompChaves } from "../components/popup_chaves";
import { Visitas } from "../components/visitas";
import { Opcoes } from "../components/opcoes";
import { useLocation } from "react-router-dom";
import { api, apiFotos } from "../apis/api";
import { useLoaded } from "../../keys"
import { TfiAnnouncement } from "react-icons/tfi";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { Warning } from "../components/warning";


type propsImovel = {
    id: number,
    nome: string,
    fotos: {endereco: string}[],
    descricao: string,
    fornecimento_agua: string,
    fornecimento_luz: string,
    cadastro_iptu: string,
    matricula: string,
    cartorio_registro: string,
    area: number,
    area_testada: number,
    fracao_ideal: number,
    area_total: number,
    area_construida: number,
    rua: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string,
    latitude: number,
    longitude: number,
    tipo_imovel: 1 | 2 | 3,
    valor_aluguel: number,
    valor_venda: number,
    anunciado: number

}

export function CompImovel ( ) {

    const { isLoaded } =  useLoaded();

    const [detalhes, setDetalhes] = useState(false);
    const [contador, setContador] = useState(0);
    const [imovel, setImovel] = useState<propsImovel>();
    const [chaves, setChaves] = useState(false);
    const [visitas, setVisitas] = useState(false);
    const [anuncio, setAnuncio] = useState(false);
    const [warning, setWarning] = useState(false);

    const rule = localStorage.getItem("rule_user")

    const[modal, setModal] = useState(false);

    const location = useLocation();

    const id_imovel = location.state.id_imovel;

    const isHighScreen = useMediaQuery({ query: '(min-width: 1536px)' })

    useEffect (()=> {
        
        const fetchData = async () => {

            const response = await carregarImovel(id_imovel);

            if(response?.imovel){
                setImovel(response.imovel);
                setAnuncio(response.imovel.anunciado == 1 ? true : false)
            }
            //console.warn("Tabela não encontrada ou dados inválidos:");

        }

        fetchData();

    }, []);

    function nextPage () {
        if (contador < imovel.fotos.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    const alterarAnuncio = async () => {

        if(rule == "admin") {

            try{

                var anunciado = anuncio ? 0 : 1;
    
                const response = await api.put(`/v1/inicio/modificar-status-anuncio/${id_imovel}/${anunciado}`);
    
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
    
                setWarning(true);

            } catch {

            }

        }

    }

    if(imovel){
        return (
            <main className="h-screen">
                <Opcoes stateImovel={true} stateCotacoes={false} stateDespesas={false} stateAcontecimentos={false} id_imovel={id_imovel}/>
                <div className={twMerge("gap-16 pt-[100px] sm:pt-[150px] px-4", isHighScreen ? 'flex items-center justify-center' : 'flex flex-col items-center')}>
                    {imovel.fotos.length == 0 ? 
                    
                    <div className="h-[700px] w-full sm:w-[950px] rounded-3xl shadow-md bg-slate-300"></div>
                    
                    :
                    
                    <div className="flex items-center gap-2 sm:gap-5">
                        <button onClick={lastPage}><BsArrowLeftCircle className="text-[25px] sm:text-[45px] transition ease-in-out delay-100 hover:scale-110"/></button>
                        <img src={apiFotos +imovel.fotos[contador].endereco} alt="foto do imóvel" className=" h-[300px] sm:h-[400px] md:h-[500px] xl:h-[700px] w-[300px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[950px] rounded-3xl shadow-md"/>
                        <button onClick={nextPage}><BsArrowRightCircle className="text-[25px] sm:text-[45px] transition ease-in-out delay-100 hover:scale-110"/></button>
                    </div>
                    }
                    <div className="px-5 sm:px-0">
                        <div className=" bg-[#dededed3] h-[650px] w-full lg:w-[650px] rounded-3xl px-4 sm:px-8 py-4 sm:py-8 border-4 border-[#dbdbdb] shadow-md mb-6 lg:mb-0">
                            <div className="h-full flex flex-col justify-between">
                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <h1 data-toggle="tooltip" data-placement="top" title={imovel.nome} className="text-[40px] lg:text-[50px] font-outfit truncate">{imovel.nome}</h1>
                                        <button onClick={() => {alterarAnuncio()}} data-toggle="tooltip" data-placement="top" title={imovel.anunciado ? "Já foi anunciado" : "Ainda não foi anunciado"} className={twMerge("p-2 rounded-lg", imovel.anunciado ? "bg-emerald-600" : "bg-red-600")}><TfiAnnouncement className="text-[20px] text-white"/></button>
                                    </div>
                                    <h3 className="pt-3 pb-5 text-[21px] font-outfit opacity-[70%]">{imovel.rua}, {imovel.numero} - {imovel.bairro} - {imovel.cidade}, {imovel.estado}</h3>
                                    <h2 className="text-[15px] lg:text-[18px] font-outfit overflow-auto overscroll-contain h-[80px] mb-10 sm:mb-0">{imovel.descricao}</h2>
                                    <div className="flex justify-around pb-6 sm:pb-0">
                                        <div>
                                            <h2 className="text-[18px]">Aluguel</h2>
                                            <div className="flex items-end">
                                                <h1 className="text-[22px] sm:text-[30px] text-zinc-700 font-bold">{imovel.valor_aluguel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                                <h4 className="text-[15px] pb-1 sm:pb-2">/mês</h4>
                                            </div>
                                        </div>
                                        <div className="">
                                            <h2 className="text-[18px]">Venda</h2>
                                            <h1 className="text-[22px] sm:text-[30px] text-zinc-700 font-bold">{imovel.valor_venda.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-10">
                                    <div className="flex justify-around items-center">
                                        <button onClick={() => setDetalhes(true)} data-toggle="tooltip" data-placement="top" title="Destalhes do imóvel" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[23px] lg:text-[30px] transition duration-100 hover:scale-110"><FaClipboardList/></button>
                                        {rule == "admin" && <button onClick={(e) => {setModal(true); e.preventDefault();}} data-toggle="tooltip" data-placement="top" title="Upload Fotos" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[23px] lg:text-[30px] transition duration-100 hover:scale-110"><FaFileImage/></button>}
                                        <button onClick={() => setChaves(true)} data-toggle="tooltip" data-placement="top" title="Chaves" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[23px] lg:text-[30px] transition duration-100 hover:scale-110"><IoKey /></button>
                                        <button onClick={() => setVisitas(true)} data-toggle="tooltip" data-placement="top" title="Visitas" className="bg-[#3A0C3D] rounded-lg  p-3 text-white text-[23px] lg:text-[30px] transition duration-100 hover:scale-110"><IoPeopleSharp /></button>
                                    </div>
                                    <div className="w-full h-[140px] bg-slate-300 rounded-lg">
                                        {isLoaded ? (
                                            <GoogleMap mapContainerClassName="rounded-xl"
                                                mapContainerStyle={{width: '100%', height: '100%'}}
                                                center={{
                                                    lat: imovel.latitude,
                                                    lng: imovel.longitude
                                                }}
                                                zoom={16}
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
                    {chaves && <CompChaves setModal={setChaves} id_imovel={id_imovel}/>}
                    {visitas && <Visitas setModal={setVisitas} id_imovel={id_imovel}/>}
                </div>
                <ToastContainer />
                {warning && <Warning setModal={setWarning}/>}
            </main>
        )
    }
    
}