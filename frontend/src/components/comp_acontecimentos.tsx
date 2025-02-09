import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { DataEstilizada } from "./data_estilizada";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale('pt-br')


type propsAcontecimento = {
    titulo: string,
    descricao: string,
    data_hora_inicio: Date,
    ultima_alteracao: Date,
    status_acontecimento: 0 | 1 | 2,
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompAcontecimentos ( { id_imovel }: TipoParametro ) {

    const [contador, setContador] = useState(0);

    const navigate = useNavigate();

    const redirectCriarAcontecimento = () => {
        navigate('/criar-acontecimento', { state: { id_imovel } });
    };
    
    const acontecimentos: propsAcontecimento[][] = [
        [
            {
                titulo: "Reunião de Planejamento",
                descricao: "Um dos contos presentes no livro “Laços de Família”, de Clarice Lispector, acompanha a epifania da personagem Ana ao fugir de seus afazeres domésticos. Ela, que se via sentenciada a cuidar da casa e dos filhos, assemelha-se a muitas mulheres brasileiras, que exercem essa e outras tarefas diariamente, sem valorização e, até mesmo, sem remuneração. Nesse sentido, cabe analisar as causas socioeconômicas da invisibilidade do trabalho de cuidado no Brasil contemporâneo. Em primeira perspectiva, a sociedade limita a mulher e sua função social ao ambiente caseiro e à realização de cuidados especiais. Isso ocorre porque, de acordo com o corpo social estabelecido, a essência cuidadosa é algo inerente ao feminino, muitas vezes associada à maternidade. Todavia, essa característica é construída e imposta às mulheres, que são frequentemente moldadas — assim como elucidado por Simone de Beauvoir: “Não se nasce mulher, torna-se”. Esse cenário é instigado pela cultura patriarcal e machista da nação, que atribui o cuidado e o lar somente ao sexo feminino. Desse modo, esse trabalho é visto como uma obrigação da mulher, e não como um trabalho de fato, o que, por conseguinte, gera a desvalorização de tão importante exercício. Ademais, o cuidado não é percebido com valor de mercado. Isso, porque não é uma atividade altamente lucrativa e produtiva, do ponto de vista mercadológico, o que, segundo Byung Chul-Han em “A Sociedade do cansaço”, são fatores valorizados nos dias atuais. Esse panorama se dá pela lógica capitalista que norteia as relações de trabalho no mundo hoje, priorizando o lucro de indústrias e empresas em detrimento do cuidado com pessoas — majoritariamente exercido por mulheres. Consequentemente, há a má remuneração dessa ocupação, o que afeta a igualdade de gênero na inserção no mercado de trabalho e atrapalha a emancipação feminina. Portanto, fazem-se evidentes as matrizes da invisibilidade do trabalho de cuidado em solo nacional. Logo, não se deve hesitar: são necessárias medidas para a erradicação da problemática. É responsabilidade, então, do Ministério da Educação — órgão federal que gere o ensino brasileiro — alterar a estrutura machista e patriarcal nas salas de aula. Isso pode ser feito por meio da inserção na Base Nacional Comum Curricular de formas de empoderamento feminino como assunto obrigatório na formação cidadã. Essa mudança deve ser alcançada com a finalidade de valorizar o trabalho exercido por mulheres, principalmente os mais invisíveis, como o de cuidado. Outrossim, cabe ao Governo Federal aumentar o salário mínimo atual, com o objetivo de garantir uma remuneração adequada a todos, bem como às mulheres, que se ocupam com o cuidado, favorecendo suas independências financeiras. Quem sabe, assim, todas as “Anas” que cuidam do Brasil tornar-se-ão visíveis, valorizadas e prestigiadas.",
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

            <div className="flex items-center justify-between w-full pb-8 pt-4 px-20">
                <h1 className="text-[35px] font-kanit">Acontecimentos</h1>
                <div className="flex items-center gap-32 pr-20">
                    <button onClick={lastPage}><BsArrowLeftCircle className="text-[45px]"/></button> 
                    <button onClick={nextPage}><BsArrowRightCircle className="text-[45px]"/></button>
                </div>
                <div>
                <button onClick={() => redirectCriarAcontecimento()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex items-center gap-3"><AiFillPlusCircle className="text-[20px]"/>
                        <h1 className="font-outfit font-semibold">Criar Acontecimento</h1>
                    </button> 
                </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-10 px-14 mb-7">

                {acontecimentos[contador].map((acontecimento, index) => 
                    <div className="bg-[#f0f0f0d3] h-[300px] rounded-xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex">
                        <div className="pl-8 pr-14 border-r-2 border-slate-700 flex items-center">
                            <DataEstilizada data={acontecimento.data_hora_inicio}/>
                        </div>
                        <div className="h-full w-full pl-14 py-2">
                            <div className="h-full flex flex-col justify-between">
                                <div className="flex flex-col items-start">
                                    <h1 className="text-[30px] mb-3">{acontecimento.titulo}</h1>
                                    <div className="text-[22px] mb-6 overflow-auto overscroll-contain h-16">{acontecimento.descricao}</div>
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