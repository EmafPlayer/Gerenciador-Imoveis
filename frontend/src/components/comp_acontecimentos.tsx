import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { DataEstilizada } from "./data_estilizada";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime);
dayjs.locale('pt-br')


type propsAcontecimento = {
    titulo: string,
    descricao: string,
    data_hora_inicio: Date,
    ultima_alteracao: Date,
    status_acontecimento: 0 | 1 | 2,
}


export function CompAcontecimentos ( ) {

    const [contador, setContador] = useState(0);
    
    const acontecimentos: propsAcontecimento[][] = [
        [
            {
                titulo: "Reunião de Planejamento",
                descricao: "30/01/2025: Discussão sobre estratégias do próximo semestre. 05/02/2025: Realinhamento das coisas. 10/03/2025: Possibilidade de aluguel",
                data_hora_inicio: new Date("2025-01-06T09:00:00"),
                ultima_alteracao: new Date("2025-01-30T11:30:00"),
                status_acontecimento: 1, // Em andamento
            },
            {
                titulo: "Lançamento de Produto",
                descricao: "Apresentação do novo produto para investidores.",
                data_hora_inicio: new Date("2025-04-05T18:00:00"),
                ultima_alteracao: new Date("2025-03-20T10:00:00"),
                status_acontecimento: 0, // Pendente
            },
            {
                titulo: "Treinamento de Equipe",
                descricao: "Sessão de capacitação sobre novas tecnologias.",
                data_hora_inicio: new Date("2025-05-12T14:00:00"),
                ultima_alteracao: new Date("2025-04-25T09:45:00"),
                status_acontecimento: 2, // Concluído
            },
            {
                titulo: "Feira de Negócios",
                descricao: "Participação na feira internacional de tecnologia.",
                data_hora_inicio: new Date("2025-06-20T08:00:00"),
                ultima_alteracao: new Date("2025-05-15T16:20:00"),
                status_acontecimento: 1, // Em andamento
            },
        ],
        [
            {
                titulo: "Workshop de Design",
                descricao: "Evento sobre design de interfaces modernas.",
                data_hora_inicio: new Date("2025-07-08T10:30:00"),
                ultima_alteracao: new Date("2025-06-29T13:15:00"),
                status_acontecimento: 0, // Pendente
            },
            {
                titulo: "Hackathon da Empresa",
                descricao: "Competição de desenvolvimento de software.",
                data_hora_inicio: new Date("2025-08-01T09:00:00"),
                ultima_alteracao: new Date("2025-07-20T11:40:00"),
                status_acontecimento: 1, // Em andamento
            },
            {
                titulo: "Entrega do Projeto X",
                descricao: "Finalização do projeto e entrega ao cliente.",
                data_hora_inicio: new Date("2025-09-15T17:00:00"),
                ultima_alteracao: new Date("2025-09-10T15:30:00"),
                status_acontecimento: 2, // Concluído
            },
            {
                titulo: "Palestra Motivacional",
                descricao: "Convidado especial falando sobre produtividade.",
                data_hora_inicio: new Date("2025-10-05T19:00:00"),
                ultima_alteracao: new Date("2025-09-25T12:10:00"),
                status_acontecimento: 0, // Pendente
            },
        ],
    ];

    function nextPage () {
        if (contador < acontecimentos.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center pt-8">

            <div className="flex items-center justify-around w-full pb-8 pt-4">
                <h1 className="text-[35px] font-kanit">Acontecimentos</h1>
                <div className="flex items-center gap-32 pr-56">
                    <button onClick={lastPage}><BsArrowLeftCircle className="text-[45px]"/></button> 
                    <button onClick={nextPage}><BsArrowRightCircle className="text-[45px]"/></button>
                </div>
                <div>
                    {/* onClick={() => redirectCriarImoveis(user[0])} */}<button className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF]"><GrAdd/></button>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-10 px-14 mb-7">

                {acontecimentos[contador].map((acontecimento, index) => 
                    <div className="bg-[#f0f0f0d3] h-[270px] rounded-xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex">
                        <div className="pl-8 pr-14 border-r-2 border-slate-700 flex items-center">
                            <DataEstilizada data={acontecimento.data_hora_inicio}/>
                        </div>
                        <div className="h-full w-full pl-14 py-2">
                            <div className="h-full flex flex-col justify-between">
                                <div className="flex flex-col items-start">
                                    <h1 className="text-[30px] mb-3">{acontecimento.titulo}</h1>
                                    <h2 className="text-[22px] mb-6">{acontecimento.descricao}</h2>
                                    <div>
                                        <h1 className="text-[18px] font-semibold">Status do Acontecimento:</h1>
                                        <h1 className="text-[17px]">{acontecimento.status_acontecimento == 0 ? 'Planejamento' : 
                                             acontecimento.status_acontecimento == 1 ? 'Em andamento' : 'Finalizado'}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex flex-col items-center gap-2">
                                        <h1 className="text-[20px] font-outfit">{dayjs().to(acontecimento.ultima_alteracao)}</h1>
                                        <h1 className="text-[12px]">Última Alteração</h1>
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