import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import carregarDespesas from "../apis/carregar_despesas";
import { useMediaQuery } from "react-responsive";
import { AiFillCheckSquare } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";


type propsDespesa = {
    id: number,
    titulo_despesa: string,
    titulo_acontecimento: string,
    descricao: string,
    valor: number,
    tipo_despesa: 0 | 1,
    recorrencia: 0 | 1 | 2 | 3,
    receitas_despesas: 0 | 1,
    vencimento: Date,
    pago: boolean,
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompDespesas ( { id_imovel }: TipoParametro ) {

    const [contador_receitas, setContador_receitas] = useState(0);
    const [contador_despesas, setContador_despesas] = useState(0);
    const [ativacao, setAtivacao] = useState(false);
    const [valorBotao, setValorBotao] = useState(0);
    var [despesas, setDespesas] = useState<propsDespesa[][]>([]);
    var [receitas, setReceitas] = useState<propsDespesa[][]>([]);
    
    const isMidScreen = useMediaQuery({ query: '(min-width: 1024px)' })

    const navigate = useNavigate();

    const redirectCriarCotacao = () => {
        navigate('/criar-receita_despesa', { state: { id_imovel } });
    };

    useEffect (() => {

        const fetchData = async () => {

            const response = await carregarDespesas(id_imovel);

            console.log(response?.despesas);
            console.log(response?.receitas);

            if(response?.despesas)
                setDespesas(response.despesas);
            if(response?.receitas)
                setReceitas(response.receitas);
            else
                console.warn("Tabela não encontrada ou dados inválidos:");

        }

        fetchData()

    }, [])

    const statusBotao = ['Receitas e Despesas', 'Receitas', 'Despesas'];

    function nextPage () {
        if(valorBotao == 1){ 
            if (contador_receitas < receitas.length - 1)
                setContador_receitas(contador_receitas + 1);
        }
        else{
            if (contador_despesas < despesas.length - 1)
                setContador_despesas(contador_despesas + 1);
        }
    }
    
    function lastPage () {
        if(valorBotao == 1){ 
            if (contador_receitas > 0)
                setContador_receitas(contador_receitas - 1);
        }
        else{
            if (contador_despesas > 0)
                setContador_despesas(contador_despesas - 1);
        }    
    }

    const modificarStatusDespesa = async (index1: number, index2: number) => {

        await api.post(`/v1/inicio/update-pago/${despesas[index1][index2].id}`, {
            pago: !despesas[index1][index2].pago
        });

    }

    const modificarStatusReceita = async (index1: number, index2: number) => {

        await api.post(`/v1/inicio/update-pago/${receitas[index1][index2].id}`, {
            pago: !receitas[index1][index2].pago
        });

    }

    if(despesas && receitas){
        return (
            <div className="w-full flex flex-col items-center justify-center  pt-[120px]">

            <div className="flex items-center justify-between w-full pb-6 pt-4 px-3 lg:px-36">
                <div>
                    <button onClick={() => {setAtivacao(!ativacao)}} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                        <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{statusBotao[valorBotao]}</h6>
                        {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                    </button>
                    {ativacao &&
                        <ul className="absolute translate-y-[6px] flex flex-col gap-1">
                            {statusBotao.map((status, index) => 
                                <li><button onClick={() => {setValorBotao(index); setAtivacao(!ativacao)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{status}</button></li>
                            )}
                        </ul>
                    }
                </div>
                { valorBotao != 0 &&
                    <div className="flex items-center gap-8 lg:gap-32 lg:pr-20">
                        <button onClick={lastPage}><BsArrowLeftCircle className="text-[40px]"/></button>
                        <button onClick={nextPage}><BsArrowRightCircle className="text-[40px]"/></button>
                    </div>
                }
                <div>
                    <button data-toggle="tooltip" data-placement="top" title="Criar Receita ou Despesa" onClick={() => redirectCriarCotacao()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex items-center gap-3"><AiFillPlusCircle className="text-[30px] lg:text-[20px]"/>
                    { ((valorBotao == 0 && !isMidScreen) || (isMidScreen)) && <h1 className="font-outfit font-semibold">Criar Receita ou Despesa</h1>}
                    </button> 
                </div>
            </div>

            {valorBotao == 0 ? 
                <div className="w-full overflow-x-auto px-4 lg:px-10">
                    <table className="border-[0.2px] border-solid border-[#414040] rounded-md shadow-md table-auto divide-y divide-[#000000] w-full mb-10">
                        <thead className="w-full ">
                            <tr>
                                <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Título</th>
                                <th className="px-2 py-4 w-[24%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Descrição</th>
                                <th className="px-2 py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Acontecimento</th>
                                <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Despesa/Receita</th>
                                <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Recorrência</th>
                                <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Receita ou Despesa</th>
                                <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Data de Vencimento</th>
                                <th className="px-2 py-4 w-[8%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Valor (R$)</th>
                                <th className="px-2 py-4 w-[6%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Pago?</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#fefefe] divide-y divide-[#b9b8b8]">
                            {receitas.length != 0 && receitas.map((receita, index1) => 
                                receita.map((item, index2) => (
                                    <tr>
                                        <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo_despesa}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.descricao}</td>
                                        <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo_acontecimento ? item.titulo_acontecimento : 'Não vinculado'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.recorrencia == 0 ? 'Anual' : 
                                                                                                                                item.recorrencia == 1 ? 'Mensal' : 
                                                                                                                                item.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">Receita</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{new Date (item.vencimento).toLocaleDateString("pt-BR")}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8] text-sky-800">{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td className="px-2 text-center border-x-[0.4px] border-solid border-[#b9b8b8]"><div className="flex justify-center items-center"><button onClick={() => {modificarStatusReceita(index1, index2)}} className="transition duration-100 hover:scale-110"><AiFillCheckSquare className={twMerge("text-[30px]", item.pago ? 'text-emerald-600' : 'text-red-600')}/></button></div></td>
                                        
                                    </tr>  
                                ))        
                            )}
                            {despesas.length != 0 && despesas.map((despesa, index1) => 
                                despesa.map((item, index2) => (
                                    <tr>
                                        <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo_despesa}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.descricao}</td>
                                        <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo_acontecimento ? item.titulo_acontecimento : 'Não vinculado'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.recorrencia == 0 ? 'Anual' : 
                                                                                                                                item.recorrencia == 1 ? 'Mensal' : 
                                                                                                                                item.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">Despesa</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{new Date (item.vencimento).toLocaleDateString("pt-BR")}</td>
                                        <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8] text-amber-700">{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                        <td className="px-2 text-center border-x-[0.4px] border-solid border-[#b9b8b8]"><div className="flex justify-center items-center"><button onClick={() => {modificarStatusDespesa(index1, index2)}} className="transition duration-100 hover:scale-110"><AiFillCheckSquare className={twMerge("text-[30px]", item.pago ? 'text-emerald-600' : 'text-red-600')}/></button></div></td>
                                    </tr>  
                                ))        
                            )}
                        </tbody>
                    </table>
                </div>

            : 
            
            valorBotao == 1 ? 
            
            <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-3 lg:gap-x-8 gap-y-4 px-3 lg:px-32 mb-5 lg:mb-0">
                {receitas.length != 0 && receitas[contador_receitas].map((receita, index) => 
                    <div className="bg-[#f0f0f0d3] h-[310px] rounded-xl px-1 lg:px-4 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 w-full">
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-[30px] font-outfit font-medium text-center">{receita.titulo_despesa}</h1>
                            <div className="">
                                <div className="flex justify-around items-center mb-5">
                                    <div className="">
                                        <h4 className="text-[14px] lg:text-[17px] font-semibold">Tipo da Receita:</h4>
                                        <h1 className="text-[13px] lg:text-[16px]">{receita.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</h1>
                                    </div>
                                    <div className="">
                                        <h4 className="text-[14px] lg:text-[17px] font-semibold">Tipo de Recorrência:</h4>
                                        <h1 className="text-[13px] lg:text-[16px]">{receita.recorrencia == 0 ? 'Anual' : 
                                            receita.recorrencia == 1 ? 'Mensal' : 
                                            receita.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</h1>
                                    </div>
                                </div>
                                <div className=" flex justify-around items-center">
                                    <div className="">
                                        <h1 className="text-[14px] lg:text-[17px] font-semibold">Vencimento:</h1>
                                        <h1 className="text-[13px] lg:text-[16px]">{new Date (receita.vencimento).toLocaleDateString("pt-BR")}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-[14px] lg:text-[17px] font-semibold">Acontecimento:</h1>
                                        <h1 className="text-[13px] lg:text-[16px]">{receita.titulo_acontecimento ? receita.titulo_acontecimento : 'Não vinculado'}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-8">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-[28px] font-serif text-sky-800" text->{receita.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                    <h1 className="text-[12px] text-sky-800">REAIS (BRL - R$)</h1>
                                </div>
                                <div className="flex justify-center items-center"><button onClick={() => {modificarStatusReceita(contador_receitas, index)}} className="transition duration-100 hover:scale-110"><AiFillCheckSquare className={twMerge("text-[30px]", receita.pago ? 'text-emerald-600' : 'text-red-600')}/></button></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            : 
            
            <div className="w-full grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-3 lg:gap-x-8 gap-y-4 px-3 lg:px-32 mb-5 lg:mb-0">
                {despesas.length != 0 && despesas[contador_despesas].map((despesa, index) => 
                    <div className="bg-[#f0f0f0d3] h-[310px] rounded-xl px-1 lg:px-4 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 w-full">
                        <div className="flex flex-col justify-between h-full">
                            <h1 className="text-[30px] font-outfit font-medium text-center">{despesa.titulo_despesa}</h1>
                            <div className="">
                                <div className="flex justify-around items-center mb-5">
                                    <div className="">
                                        <h4 className="text-[14px] lg:text-[17px] font-semibold">Tipo da Despesa:</h4>
                                        <h1 className="text-[13px] lg:text-[16px]">{despesa.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</h1>
                                    </div>
                                    <div className="">
                                        <h4 className="text-[14px] lg:text-[17px] font-semibold">Tipo de Recorrência:</h4>
                                        <h1 className="text-[13px] lg:text-[16px]">{despesa.recorrencia == 0 ? 'Anual' : 
                                            despesa.recorrencia == 1 ? 'Mensal' : 
                                            despesa.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</h1>
                                    </div>
                                </div>
                                <div className=" flex justify-around items-center">
                                    <div className="">
                                        <h1 className="text-[14px] lg:text-[17px] font-semibold">Vencimento:</h1>
                                        <h1 className="text-[13px] lg:text-[16px]">{new Date (despesa.vencimento).toLocaleDateString("pt-BR")}</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-[14px] lg:text-[17px] font-semibold">Acontecimento:</h1>
                                        <h1 className="text-[13px] lg:text-[16px]">{despesa.titulo_acontecimento ? despesa.titulo_acontecimento : 'Não vinculado'}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-8">
                                <div className="flex flex-col items-center">
                                    <h1 className="text-[28px] font-serif text-amber-700" text->{despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                    <h1 className="text-[12px] text-amber-700">REAIS (BRL - R$)</h1>
                                </div>
                                <div className="flex justify-center items-center"><button onClick={() => {modificarStatusDespesa(contador_despesas, index)}} className="transition duration-100 hover:scale-110"><AiFillCheckSquare className={twMerge("text-[30px]", despesa.pago ? 'text-emerald-600' : 'text-red-600')}/></button></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>}

            

            </div>
        )
    }
}