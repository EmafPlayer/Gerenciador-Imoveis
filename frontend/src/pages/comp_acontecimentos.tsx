import { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { DataEstilizada } from "../components/data_estilizada";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { AiFillPlusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import carregarAcontecimentos from "../apis/carregar_acontecimentos";
import { useMediaQuery } from "react-responsive";
import { Opcoes } from "../components/opcoes";
import { FaFileAlt, FaPencilAlt } from "react-icons/fa";
import { ModificarDescricaoAcontecimento } from "../components/popup_modificar_descricao";
import { IoAddCircle } from "react-icons/io5";
import { UploadArquivos } from "../components/upload_arquivos";
import { apiArquivos } from "../apis/api";
import { twMerge } from "tailwind-merge";

dayjs.extend(relativeTime);
dayjs.locale('pt-br')


type propsAcontecimento = {
    id_acontecimento: number,
    titulo: string,
    descricao: string,
    data_inicio: Date,
    ultima_alteracao: Date,
    status_acontecimento: 0 | 1 | 2,
    arquivos: {
        endereco: string,
        descricao: string
    } []
}

export function CompAcontecimentos (  ) {

    const [contador, setContador] = useState(0);
    const [acontecimentos, setAcontecimentos] = useState<propsAcontecimento[][]>([]);
    const [id_acontecimento, setIdAcontecimento] = useState(0);
    const [adicionar_arquivo, setAdicionarArquivo] = useState(false);

    const rule = localStorage.getItem("rule_user");

    const [modificar_descricao, setModificarDescricao] = useState(false);

    const isMidScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })

    const navigate = useNavigate();

    const location = useLocation();

    const id_imovel = location.state.id_imovel;

    const redirectCriarAcontecimento = () => {
        navigate('/criar-acontecimento', { state: { id_imovel: id_imovel } });
    };
    
    useEffect (() => {

        const fetchData = async () => {

            const response = await carregarAcontecimentos(id_imovel);
            
            if(response?.acontecimentos)
                setAcontecimentos(response.acontecimentos);

        }

        fetchData();

    }, [])

    function nextPage () {
        if (contador < acontecimentos.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }


    if(acontecimentos){

        return (
            <div className="h-screen w-full">
                <Opcoes stateImovel={false} stateCotacoes={false} stateDespesas={false} stateAcontecimentos={true} id_imovel={id_imovel}/>
                <div className="w-full flex flex-col items-center justify-center pt-[75px] sm:pt-[140px]">

                    <div className="flex items-center justify-between w-full pb-8 pt-4 px-4 lg:px-20">
                        <h1 className="text-[28px] sm:text-[35px] font-kanit">Acontecimentos</h1>
                        <div className="flex items-center gap-3 sm:gap-12 lg:gap-32 lg:pr-20">
                            <button onClick={lastPage}><BsArrowLeftCircle className="text-[32px] lg:text-[45px]"/></button> 
                            <button onClick={nextPage}><BsArrowRightCircle className="text-[32px] lg:text-[45px]"/></button>
                        </div>
                        { rule == "admin" &&
                            <div>
                                <button data-toggle="tooltip" data-placement="top" title="Criar Acontecimento" onClick={() => redirectCriarAcontecimento()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex items-center gap-3 transition ease-in-out delay-100 hover:scale-110"><AiFillPlusCircle className="text-[20px]"/>
                                    {isMidScreen && <h1 className="font-outfit font-semibold">Criar Acontecimento</h1>}
                                </button> 
                            </div>
                        }
                    </div>

                    <div className="w-full grid grid-cols-1 gap-10 px-4 lg:px-14 mb-7">

                        {acontecimentos.length != 0 && acontecimentos[contador].map((acontecimento) => 
                            <div className="bg-[#f0f0f0d3]  rounded-xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex flex-col divide-y divide-slate-400">
                                <div className={twMerge("pb-6  divide-slate-800", isLowScreen ? "flex divide-x-2 " : "flex flex-col divide-y-2")}>
                                    <div className="lg:pl-8 lg:pr-14 flex items-center">
                                        <DataEstilizada data={new Date(acontecimento.data_inicio)}/>
                                    </div>
                                    <div className="h-full w-full pt-8 lg:pt-0 lg:pl-14 py-2">
                                        <div className="h-full flex flex-col justify-between">
                                            <div className="flex flex-col items-start">
                                                <h1 className="text-[35px] mb-3 font-semibold font-outfit">{acontecimento.titulo}</h1>
                                                <div className="flex gap-8 lg:gap-3 w-full">
                                                    <div className="text-[20px] text-wrap mb-6 overflow-y-auto overscroll-contain h-16 w-[80%] lg:w-[95%]">{acontecimento.descricao}</div>
                                                    { rule == "admin" && <button onClick={() => {setIdAcontecimento(acontecimento.id_acontecimento); setModificarDescricao(true)}} className="rounded-lg bg-[#0258d9ee] flex justify-center items-center h-[37px] w-[37px] transition ease-in-out delay-100 hover:scale-125"><FaPencilAlt className="text-[18px] text-slate-100"/></button>}
                                                </div>
                                                <div>
                                                    <h1 className="text-[21px] font-semibold">Status do Acontecimento:</h1>
                                                    <h1 className="text-[19px]">{acontecimento.status_acontecimento == 0 ? 'Planejamento' : 
                                                        acontecimento.status_acontecimento == 1 ? 'Em andamento' : 'Finalizado'}</h1>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end pt-5 sm:pt-0">
                                                <div className="flex flex-col items-center gap-2">
                                                    <h1 className="text-[20px] font-outfit">{dayjs().to(acontecimento.ultima_alteracao)}</h1>
                                                    <h1 className="text-[14px]">Última Alteração</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={twMerge("pt-8 lg:pt-5 pb-3 lg:pb-0 lg:px-9 w-full", !isLowScreen ? "flex flex-col justify-between" : "flex items-center")}>
                                    
                                    <div className={twMerge("flex items-center gap-8", !isLowScreen && "w-full justify-between flex-row-reverse mb-6")}>

                                        { rule == "admin" &&
                                            <div className={isLowScreen ? "flex" : ""}>
                                                <button onClick={() => {setIdAcontecimento(acontecimento.id_acontecimento); setAdicionarArquivo(true)}} className="rounded-lg bg-[#0258d9ee] flex justify-center items-center h-[37px] w-[37px] transition ease-in-out delay-100 hover:scale-125"><IoAddCircle className="text-[18px] text-slate-100"/></button>
                                            </div>
                                        }
                                        
                                        <h1 className={twMerge("text-[20px] font-semibold lg:mr-12", !isLowScreen && "text-center")}>Arquivos:</h1>
                                    
                                    </div>

                                        
                                    
                                        
                                    <div className={isLowScreen ? "flex items-center gap-6" : "grid grid-cols-5 gap-6" }>
                                        {acontecimento.arquivos.length != 0 && acontecimento.arquivos.map((arquivo) => 
                                            <div className="bg-[#3A0C3D] w-10 h-10 rounded-md flex items-center justify-center transition ease-in-out delay-200 duration-300 hover:scale-125">
                                                <a href={apiArquivos + arquivo.endereco} target="_blank" data-toggle="tooltip" data-placement="top" title={arquivo.descricao} className=""> <FaFileAlt className="text-white text-[22px]"/> </a>
                                            </div>
                                        )}
                                    </div>
                                        

                                </div>
                            </div>
                        )}

                    </div>

                </div>

                
                {modificar_descricao && <ModificarDescricaoAcontecimento setModal={setModificarDescricao} id_acontecimento={id_acontecimento}/>}
                {adicionar_arquivo && <UploadArquivos setModal={setAdicionarArquivo} id_acontecimento={id_acontecimento} />}
            </div>

        )
    }
}