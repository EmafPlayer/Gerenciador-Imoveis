import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { useForm } from "react-hook-form";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";


type userProps = {
    nome: string,
    foto: string,
}

export function CriarAcontecimento () {

    const { register, handleSubmit } = useForm();

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const[status_acontecimento, setStatus_acontecimento] = useState(0);
    const[ativacao, setAtivacao] = useState(false);

    const location = useLocation();
    let id_imovel = location.state.id_imovel;

    const status_acontecimentos = ["Planejamento", "Em andamento", "Finalizado"];

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    const submit = async (data: any) => 
    {
        try {
            const params = new URLSearchParams({
                id_imovel: id_imovel,
                titulo: data.titulo,
                status_acontecimento: String(status_acontecimento + 1),
                descricao: data.descricao,
                data_inicio: data.data_inicio,
            }).toString();
    
            const response = await api.get(`/v1/inicio/criacao-acontecimento?${params}`);
            
            console.log(response.data.message);

            setCriacao(true);
            setMensagem(response.data.message);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen w-full">
            <NavBar user={user}>
            </NavBar>
            <main className="w-full h-full pt-[115px] bg-[#FFFFFF] p-6">
                <form onSubmit={handleSubmit(submit)} className="bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5">
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[32px] lg:text-[36px] uppercase')} >Cadastro de Acontecimento</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 items-center gap-6 2xl:gap-32">
                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="titulo" className="text-[18px] text-slate-700 font-outfit">Título do Acontecimento</label>
                            <input {...register('titulo')} type="text" name="titulo" id="titulo" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome do corretor"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="data_inicio" className="text-[18px] text-slate-700 font-outfit">Data de inicio</label>
                            <input {...register('data_inicio')} type="date" name="data_inicio" id="data_inicio" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 px-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')}/>
                        </div>
                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Status do Acontecimento</h4>
                            <button onClick={(e) => {e.preventDefault(); setAtivacao(!ativacao)}} value={status_acontecimento + 1} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{status_acontecimentos[status_acontecimento]}</h6>
                                {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {status_acontecimentos.map((acontecimento, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setStatus_acontecimento(index); setAtivacao(!ativacao)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{acontecimento}</button></li>
                                    )}
                                </ul>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-0 lg:mt-6">
                    
                        <div className="col-span-1 sm:col-span-5 mt-6">
                            <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>

                    </div>

                    <div className="text-center sm:text-right mt-12 lg:mt-24">
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