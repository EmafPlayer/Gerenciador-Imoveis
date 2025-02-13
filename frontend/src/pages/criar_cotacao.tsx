import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { NavBar } from "../components/nav_bar";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

type userProps = {
    nome: string,
    foto: string,
}

export function CriarCotacao () {

    // data-toggle="tooltip"
    // data-placement="top"
    // title={option.label} o que aparece ao passar o mouse sobre o elemento

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");
    const[status_tipo, setStatus_tipo] = useState(0);
    const[ativacao_tipo, setAtivacao_tipo] = useState(false);
    const[status_corretor, setStatus_corretor] = useState(0);
    const[ativacao_corretor, setAtivacao_corretor] = useState(false);

    const tipo_cotacao = ["Aluguel", "Venda"];
    const corretores = ["Emanuel", "João", "Daniel"];

    const { register, handleSubmit } = useForm();

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
            //     valor: data.valor,
            //     valor_min: data.valor_min,
            //     valor_max: data.valor_max,
            //     data_cotacao: data.data_cotacao,
            //     descricao: data.descricao,
            //     tipo_cotacao: data.tipo_cotacao + 1,
            //     id_corretor: data.id_corretor
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
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[36px] uppercase')} >Cadastro de Cotação</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mt-6">
                        
                        <div className="col-span-1">
                            <label htmlFor="valor" className="text-[18px] text-slate-700 font-outfit">Valor (R$)</label>
                            <input {...register('valor')} type="number" step='0.01' name="valor" id="valor" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="300000.00"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="valor_min" className="text-[18px] text-slate-700 font-outfit">Valor Mínimo (R$)</label>
                            <input {...register('valor_min')} type="number" step='0.01' name="valor_min" id="valor_min" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="200000.00"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="valor_max" className="text-[18px] text-slate-700 font-outfit">Valor Máximo (R$)</label>
                            <input {...register('valor_max')} type="number" step='0.01' name="valor_max" id="valor_max" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="400000.00"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="data_cotacao" className="text-[18px] text-slate-700 font-outfit">Data da Cotação</label>
                            <input {...register('data_cotacao')} type="date" name="data_cotacao" id="data_cotacao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 px-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')}/>
                        </div>

                        <div className="col-span-1 sm:col-span-5 mt-6">
                            <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>

                        <div className="col-span-1 sm:col-span-5 mt-6">
                            <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Site de anuncio</label>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>
                    </div>

                    <div className="flex items-center gap-32 mt-12">
                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipo da cotação</h4>
                            <button onClick={(e) => {e.preventDefault(); setAtivacao_tipo(!ativacao_tipo)}} {...register('tipo_cotacao')} value={status_tipo} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipo_cotacao[status_tipo]}</h6>
                                {ativacao_tipo ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao_tipo &&
                                <ul className="absolute translate-y-[6px]">
                                    {tipo_cotacao.map((status, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setStatus_tipo(index); setAtivacao_tipo(!ativacao_tipo)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{status}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Corretores</h4>
                            <button onClick={(e) => {e.preventDefault(); setAtivacao_corretor(!ativacao_corretor)}} {...register('id_corretor')} value={status_corretor} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{corretores[status_corretor]}</h6>
                                {ativacao_corretor ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao_corretor &&
                                <ul className="absolute translate-y-[6px]">
                                    {corretores.map((corretor, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setStatus_corretor(index); setAtivacao_corretor(!ativacao_corretor)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{corretor}</button></li>
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