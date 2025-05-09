import { useEffect, useState } from "react";
import { AiFillCloseSquare, AiFillPlusCircle } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom";
import carregarDespesas from "../apis/carregar_despesas";
import { useMediaQuery } from "react-responsive";
import { AiFillCheckSquare } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Opcoes } from "../components/opcoes";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";


type propsReceitaDespesa = {
    id: number,
    titulo_despesa: string,
    titulo_acontecimento: string,
    descricao: string,
    valor: number,
    tipo_despesa: 0 | 1,
    recorrencia: 0 | 1 | 2 | 3,
    receita_despesa: 0 | 1,
    vencimento: Date,
    pago: boolean,
}

export function CompDespesas (  ) {

    const [contador_receitas, setContador_receitas] = useState(0);
    const [contador_despesas, setContador_despesas] = useState(0);
    const [ativacao, setAtivacao] = useState(false);
    const [valorBotao, setValorBotao] = useState(0);
    const [despesas, setDespesas] = useState<propsReceitaDespesa[][]>([]);
    const [receitas, setReceitas] = useState<propsReceitaDespesa[][]>([]);
    const [receitas_despesas, setReceitasDespesas] = useState<propsReceitaDespesa[]>([]);
    
    const rule = localStorage.getItem("rule_user");

    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })

    const location = useLocation();

    const id_imovel = location.state.id_imovel;

    const navigate = useNavigate();

    const redirectCriarCotacao = () => {
        navigate('/criar-receita_despesa', { state: { id_imovel } });
    };

    useEffect (() => {

        const fetchData = async () => {

            const response = await carregarDespesas(id_imovel);

            if(response?.despesas)
                setDespesas(response.despesas);
            if(response?.receitas)
                setReceitas(response.receitas);
            if(response?.receitas_despesas)
                setReceitasDespesas(response.receitas_despesas);

        }

        fetchData()

    }, [])

    const statusBotao = ['Receitas e Despesas', 'Receitas', 'Despesas'];


    const recarregarPagina = () => {
        window.location.reload();
    };

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

        if(rule == "admin") {

            try {
    
                await api.put(`/v1/inicio/update-pago/${despesas[index1][index2].id}`, {
                    pago: !despesas[index1][index2].pago
                });
    
                toast.success("Status modificado com sucesso", {
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
    
            } catch(error){
            }    
        }

    }

    const modificarStatusReceita = async (index1: number, index2: number) => {

        if(rule == "admin") {
            
            try{
    
                await api.put(`/v1/inicio/update-pago/${receitas[index1][index2].id}`, {
                    pago: !receitas[index1][index2].pago
                });
    
                toast.success("Status modificado com sucesso", {
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
    
            } catch(error) {
            }   

        }

    }

    const modificarStatusReceitaDespesa = async (index: number) => {

        if(rule == "admin") {
            
            try{
    
                await api.put(`/v1/inicio/update-pago/${receitas_despesas[index].id}`, {
                    pago: !receitas_despesas[index].pago
                });
    
                toast.success("Status modificado com sucesso", {
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
    
            } catch(error) {
    
            }

        }            

    }

    const deletarReceitaDespesa = async ( index_receita_despesa: number ) => {

        try{

            await api.delete(`/v1/inicio/deletar-receita-despesa/${receitas_despesas[index_receita_despesa].id}`);
            
            toast.error("Despesa deletada com sucesso", {
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
            
        } catch(error) {
            
        }

    }

    const deletarReceita = async ( index_receita_1: number, index_receita_2: number ) => {

        try{

            await api.delete(`/v1/inicio/deletar-receita-despesa/${receitas[index_receita_1][index_receita_2].id}`);
            
            toast.error("Despesa deletada com sucesso", {
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
            
        } catch(error) {
            
        }

    }

    const deletarDespesa = async ( index_receita_1: number, index_receita_2: number ) => {

        try{

            await api.delete(`/v1/inicio/deletar-receita-despesa/${despesas[index_receita_1][index_receita_2].id}`);
            
            toast.error("Despesa deletada com sucesso", {
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
            
        } catch(error) {
            
        }

    }

    if(despesas && receitas){
        return (

            <div className="w-full h-screen">
                <Opcoes stateImovel={false} stateCotacoes={false} stateDespesas={true} stateAcontecimentos={false} id_imovel={id_imovel}/>
                <div className="w-full flex flex-col items-center justify-center pt-[70px] sm:pt-[120px]">

                    <div className="flex items-center justify-between w-full pb-6 sm:pb-8 pt-4 px-3 lg:px-16">
                        <div>
                            <button onClick={() => {setAtivacao(!ativacao)}} className={twMerge("w-[230px] sm:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5", !isLowScreen && valorBotao != 0 ? "w-[150px]" : "w-[230px] ")}>
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{statusBotao[valorBotao]}</h6>
                                {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao &&
                                <ul className="absolute translate-y-[6px] flex flex-col gap-1">
                                    {statusBotao.map((status, index) => 
                                        <li><button onClick={() => {setValorBotao(index); setAtivacao(!ativacao)}} className={twMerge("sm:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2", !isLowScreen && valorBotao != 0 ? "w-[150px]" : "w-[230px] ")}>{status}</button></li>
                                    )}
                                </ul>
                            }
                        </div>
                        { valorBotao != 0 &&
                            <div className="flex items-center gap-4 lg:gap-32 lg:pr-20">
                                <button onClick={lastPage}><BsArrowLeftCircle className="text-[30px] sm:text-[40px]"/></button>
                                <button onClick={nextPage}><BsArrowRightCircle className="text-[30px] sm:text-[40px]"/></button>
                            </div>
                        }
                        <div className={twMerge("flex items-center gap-3", isLowScreen ? "" : "flex-row-reverse")}>
                            { rule == "admin" &&
                                <button data-toggle="tooltip" data-placement="top" title="Criar Receita ou Despesa" onClick={() => redirectCriarCotacao()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-[11px] sm:p-2 rounded-md text-[#FFFFFF] flex items-center gap-3 transition ease-in-out delay-100 hover:scale-110"><AiFillPlusCircle className="text-[25px] sm:text-[30px] lg:text-[20px]"/>
                                { (isLowScreen) && <h1 className="font-outfit font-semibold">Criar Receita ou Despesa</h1>}
                                </button> 
                            }
                            <button className="bg-yellow-500 p-[11px] sm:p-2 rounded-md hover:bg-blue-200 transition ease-in-out delay-100 hover:scale-125" onClick={recarregarPagina}><TbReload className="text-[23px] text-white hover:text-slate-500"/></button>
                        </div>
                    </div>

                    {valorBotao == 0 ? 
                        <div className="w-full overflow-x-auto overflow-y-auto h-[370px] sm:h-[640px] px-4 lg:px-10">
                            <table className="border-[0.2px] border-solid border-[#414040] rounded-md shadow-md table-auto divide-y divide-[#000000] w-[1600px] sm:w-full mb-10">
                                <thead className="w-full ">
                                    <tr>
                                        <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Título</th>
                                        <th className="px-2 py-4 w-[24%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Descrição</th>
                                        <th className="px-2 py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Acontecimento</th>
                                        <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Despesa/Receita</th>
                                        <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Recorrência</th>
                                        <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Data de Vencimento</th>
                                        <th className="px-2 py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Receita ou Despesa</th>
                                        <th className="px-2 py-4 w-[8%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Valor (R$)</th>
                                        <th className="px-2 py-4 w-[6%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Pago/Recebido?</th>
                                        {rule === "admin" && 
                                            <th className="px-2 py-4 w-[2%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Deletar</th>}
                                    </tr>
                                </thead>
                                <tbody className="bg-[#fefefe] divide-y divide-[#b9b8b8]">
                                    {receitas_despesas.length != 0 && receitas_despesas.map((receita_despesa, index) => 
                                        <tr>
                                            <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{receita_despesa.titulo_despesa}</td>
                                            <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{receita_despesa.descricao}</td>
                                            <td className="px-2 py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{receita_despesa.titulo_acontecimento ? receita_despesa.titulo_acontecimento : 'Não vinculado'}</td>
                                            <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{receita_despesa.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</td>
                                            <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{receita_despesa.recorrencia == 0 ? 'Anual' : 
                                                                                                                                    receita_despesa.recorrencia == 1 ? 'Mensal' : 
                                                                                                                                    receita_despesa.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</td>
                                            <td className="px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{new Date (receita_despesa.vencimento).toLocaleDateString("pt-BR")}</td>
                                            <td className={twMerge("px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8] font-bold", receita_despesa.receita_despesa ? 'text-amber-700' : 'text-sky-800')}>{receita_despesa.receita_despesa ? 'Despesa' : 'Receita'}</td>
                                            <td className={twMerge("px-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]", receita_despesa.receita_despesa ? 'text-amber-700' : 'text-sky-800')}>{receita_despesa.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                            <td className="px-2 text-center border-x-[0.4px] border-solid border-[#b9b8b8]"><div className="flex justify-center items-center"><button onClick={() => {modificarStatusReceitaDespesa(index)}} className="transition duration-100 hover:scale-125">{receita_despesa.pago ? <AiFillCheckSquare className={twMerge("text-[30px] text-emerald-600")}/> : <AiFillCloseSquare className={twMerge("text-[30px] text-red-600")}/> }</button></div></td>
                                            {rule === "admin" && 
                                                <td className="px-2 text-center border-x-[0.4px] border-solid border-[#b9b8b8]">
                                                    <div className="flex justify-center items-center">
                                                        <button onClick={() => {deletarReceitaDespesa(index)}} className="rounded-lg bg-[#db001de5] flex justify-center items-center p-2 transition ease-in-out delay-100 hover:scale-125"><RiDeleteBin2Fill className="text-[18px] text-slate-100"/></button>
                                                    </div>
                                                </td>
                                            }
                                        </tr>     
                                    )}
                                </tbody>
                            </table>
                        </div>

                    : 
                    
                    valorBotao == 1 ? 
                    
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 lg:gap-x-8 gap-y-4 px-7 sm:px-3 lg:px-20 mb-5 lg:mb-0">
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
                                        <div className="flex justify-center items-center"><button onClick={() => {modificarStatusReceita(contador_receitas, index)}} className="transition duration-100 hover:scale-125">{receita.pago ? <AiFillCheckSquare className={twMerge("text-[30px] text-emerald-600")}/> : <AiFillCloseSquare className={twMerge("text-[30px] text-red-600")}/> }</button></div>
                                        {rule === "admin" && <button onClick={() => {deletarReceita(contador_receitas, index)}} className="rounded-lg bg-[#db001de5] flex justify-center items-center p-2 transition ease-in-out delay-100 hover:scale-125"><RiDeleteBin2Fill className="text-[18px] text-slate-100"/></button>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    : 
                    
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 lg:gap-x-8 gap-y-4 px-7 sm:px-3 lg:px-20 mb-5 lg:mb-0">
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
                                        <div className="flex justify-center items-center"><button onClick={() => {modificarStatusDespesa(contador_despesas, index)}} className="transition duration-100 hover:scale-125">{despesa.pago ? <AiFillCheckSquare className={twMerge("text-[30px] text-emerald-600")}/> : <AiFillCloseSquare className={twMerge("text-[30px] text-red-600")}/> }</button></div>
                                        {rule === "admin" && <button onClick={() => {deletarDespesa(contador_despesas, index)}} className="rounded-lg bg-[#db001de5] flex justify-center items-center p-2 transition ease-in-out delay-100 hover:scale-125"><RiDeleteBin2Fill className="text-[18px] text-slate-100"/></button>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>}

                </div>
                <ToastContainer />
            </div>

        )
    }
}