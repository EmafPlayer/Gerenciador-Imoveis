import { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { DataEstilizada } from "./data_estilizada";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import carregarAcontecimentos from "../apis/carregar_acontecimentos";
import { useMediaQuery } from "react-responsive";

dayjs.extend(relativeTime);
dayjs.locale('pt-br')


type propsAcontecimento = {
    titulo: string,
    descricao: string,
    data_inicio: Date,
    ultima_alteracao: Date,
    status_acontecimento: 0 | 1 | 2,
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompAcontecimentos ( { id_imovel }: TipoParametro ) {

    const [contador, setContador] = useState(0);
    const [acontecimentos, setAcontecimentos] = useState<propsAcontecimento[][]>([]);

    const isMidScreen = useMediaQuery({ query: '(min-width: 1024px)' })

    const navigate = useNavigate();

    const redirectCriarAcontecimento = () => {
        navigate('/criar-acontecimento', { state: { id_imovel } });
    };
    
    useEffect (() => {

        const fetchData = async () => {

            const response = await carregarAcontecimentos(id_imovel);
            
            if(response?.acontecimentos)
                setAcontecimentos(response.acontecimentos);
            else
                console.warn("Tabela não encontrada ou dados inválidos:");

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
            <div className="w-full flex flex-col items-center justify-center pt-[140px]">

                <div className="flex items-center justify-between w-full pb-8 pt-4 px-4 lg:px-20">
                    <h1 className="text-[35px] font-kanit">Acontecimentos</h1>
                    <div className="flex items-center gap-12 lg:gap-32 lg:pr-20">
                        <button onClick={lastPage}><BsArrowLeftCircle className="text-[32px] lg:text-[45px]"/></button> 
                        <button onClick={nextPage}><BsArrowRightCircle className="text-[32px] lg:text-[45px]"/></button>
                    </div>
                    <div>
                    <button data-toggle="tooltip" data-placement="top" title="Criar Acontecimento" onClick={() => redirectCriarAcontecimento()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex items-center gap-3"><AiFillPlusCircle className="text-[20px]"/>
                        {isMidScreen && <h1 className="font-outfit font-semibold">Criar Acontecimento</h1>}
                    </button> 
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 gap-10 px-4 lg:px-14 mb-7">

                    {acontecimentos.length != 0 && acontecimentos[contador].map((acontecimento, index) => 
                        <div className="bg-[#f0f0f0d3] h-[300px] rounded-xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex">
                            <div className="pl-4 lg:pl-8 pr-10 lg:pr-14 border-r-2 border-slate-700 flex items-center">
                                <DataEstilizada data={new Date(acontecimento.data_inicio)}/>
                            </div>
                            <div className="h-full w-full pl-14 py-2">
                                <div className="h-full flex flex-col justify-between">
                                    <div className="flex flex-col items-start">
                                        <h1 className="text-[30px] mb-3 font-semibold font-outfit">{acontecimento.titulo}</h1>
                                        <div className="text-[20px] text-wrap mb-6 overflow-y-auto overscroll-contain h-16 w-full">{acontecimento.descricao}</div>
                                        <div>
                                            <h1 className="text-[18px] font-semibold">Status do Acontecimento:</h1>
                                            <h1 className="text-[17px]">{acontecimento.status_acontecimento == 0 ? 'Planejamento' : 
                                                acontecimento.status_acontecimento == 1 ? 'Em andamento' : 'Finalizado'}</h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex flex-col items-center gap-2">
                                            <h1 className="text-[20px] font-outfit">{dayjs().to(acontecimento.ultima_alteracao)}</h1>
                                            <h1 className="text-[14px]">Última Alteração</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        )
    }
}