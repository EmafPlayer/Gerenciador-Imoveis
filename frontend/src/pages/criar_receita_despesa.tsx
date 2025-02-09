import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

type userProps = {
    nome: string,
    foto: string,
}

export function CriarReceitaDespesa () {

    const { register, handleSubmit } = useForm();

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const[titulo_despesa, setTitulo_despesa] = useState(0);
    const[tipo_despesa, setTipo_despesa] = useState(0);
    const[tipo_recorrencia, setTipo_recorrencia] = useState(0);
    const[acontecer, setAcontecer] = useState(0);
    
    const[status_titulo, setStatus_titulo] = useState(false);
    const[status_despesa, setStatus_despesa] = useState(false);
    const[status_recorrencia, setStatus_recorrencia] = useState(false);
    const[status_acontecimento, setStatus_acontecimento] = useState(false);

    const titulos_despesa = ["BLA", "BLABLA", "BLABLABLA", "BLABLABLABLA"];
    const tipos_despesa = ["Recorrente", "Pontual"];
    const tipos_recorrencia = ["Anual", "Mensal", "Diária", "Não se aplica"];
    const acontecimentos = ["Não possui vínculo a acontecimentos", "Segunda-feira", "Terça-Feira", "Quarta-feira"];

    const location = useLocation();
    let id_imovel = location.state.id_imovel;

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    const submit = async (data: any) => 
        {
            // try {
                // const params = new URLSearchParams({
                //     id_imovel: id_imovel,
                //     titulo: data.titulo + 1,
                //     valor: data.valor,
                //     vencimento: data.vencimento,
                //     descricao: data.descricao,
                //     tipo_despesa: data.tipo_despesa + 1,
                //     tipo_recorrencia: data.tipo_recorrencia + 1,
                //     acontecer: data.acontecer,
                // }).toString();
        
            //     const response = await api.get(`/v1/inicio/criacao-imoveis?${params}`);
                
            //     console.log(response.data.message);
    
            //     setCriacao(true);
            //     setMensagem(response.data.message);
                
            // } catch (error) {
            //     console.error(error);
            // }
        }

    return (
        <div className="h-screen w-full">
            <NavBar user={user}>
            </NavBar>
            <main className="w-full h-full pt-[115px] bg-[#FFFFFF] p-6">
                <form onSubmit={handleSubmit(submit)} className="bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5">
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[36px] uppercase')} >Cadastro de Receitas ou Despesas</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mt-6">
                        
                        <div className="col-span-5 mb-3">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Títulos das Receitas e Despesas</h4>
                            <button onClick={(e) => {e.preventDefault(); setStatus_titulo(!status_titulo)}} {...register('titulo')} value={titulo_despesa} className="w-[600px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{titulos_despesa[titulo_despesa]}</h6>
                                {status_titulo ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_titulo &&
                                <ul className="absolute translate-y-[6px]">
                                    {titulos_despesa.map((titulo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setTitulo_despesa(index); setStatus_titulo(!status_titulo)}} className="w-[600px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{titulo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="valor" className="text-[18px] text-slate-700 font-outfit">Valor (R$)</label>
                            <input {...register('valor')} type="number" step='0.01' name="valor" id="valor" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="300000.00"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="vencimento" className="text-[18px] text-slate-700 font-outfit">Data de Vencimento</label>
                            <input {...register('vencimento')} type="date" name="vencimento" id="vencimento" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 px-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')}/>
                        </div>

                        <div className="col-span-1 sm:col-span-5 mt-3">
                            <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>
                    </div>

                    <div className="flex items-center gap-32 mt-14">
                        
                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipos de Despesa e Receita</h4>
                            <button onClick={(e) => {e.preventDefault(); setStatus_despesa(!status_despesa)}} {...register('tipo_despesa')} value={tipo_despesa} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipos_despesa[tipo_despesa]}</h6>
                                {status_despesa ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_despesa &&
                                <ul className="absolute translate-y-[6px]">
                                    {tipos_despesa.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setTipo_despesa(index); setStatus_despesa(!status_despesa)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipos de Recorrência</h4>
                            <button onClick={(e) => {e.preventDefault(); setStatus_recorrencia(!status_recorrencia)}} {...register('tipo_recorrencia')} value={tipo_recorrencia} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipos_recorrencia[tipo_recorrencia]}</h6>
                                {status_recorrencia ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_recorrencia &&
                                <ul className="absolute translate-y-[6px]">
                                    {tipos_recorrencia.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setTipo_recorrencia(index); setStatus_recorrencia(!status_recorrencia)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Acontecimentos</h4>
                            <button onClick={(e) => {e.preventDefault(); setStatus_acontecimento(!status_acontecimento)}} {...register('acontecer')} value={tipo_recorrencia} className="w-[350px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{acontecimentos[acontecer]}</h6>
                                {status_acontecimento ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_acontecimento &&
                                <ul className="absolute translate-y-[6px]">
                                    {acontecimentos.map((acontecimento, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setAcontecer(index); setStatus_acontecimento(!status_acontecimento)}} className="w-[350px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{acontecimento}</button></li>
                                    )}
                                </ul>}
                        </div>
                    </div>

                    <div className="text-center sm:text-right mt-16">
                        <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                    </div>
                    <div className="text-center sm:text-right pr-2">
                        {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                    </div>

                </form>
            </main>
        </div>
    )
}