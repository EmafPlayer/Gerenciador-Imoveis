import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import buscarImobiliarias from "../apis/buscar_imobiliarias";
import { api } from "../apis/api";

type userProps = {
    nome: string,
    foto: string,
}

type returnImobiliaria = {
    nome_fantasia: string,
}

export function CriarCorretor () { 
    
    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");
    const[status_imobiliaria, setStatus_imobiliaria] = useState(0);
    const[ativacao, setAtivacao] = useState(false);

    const [imobiliarias, setImobiliarias] = useState<returnImobiliaria[]>([]);

    const { register, handleSubmit } = useForm();

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataImobiliarias = await buscarImobiliarias();

            console.log(dataImobiliarias?.imobiliarias)

            if (dataImobiliarias?.imobiliarias) {
                setImobiliarias(dataImobiliarias.imobiliarias);
            } else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }
        };

        fetchData();
    }, []);


    const submit = async (data: any) => 
    {
        try {
            const params = new URLSearchParams({
                id_imobiliaria: String(status_imobiliaria + 1),
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
            }).toString();
    
            const response = await api.get(`/v1/inicio/criacao-corretor?${params}`);
            
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
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[36px] uppercase')} >Cadastro de Corretor</h1>

                    <div className="grid grid-cols-4 items-center gap-32">
                        <div className="col-span-2">
                            <label htmlFor="nome" className="text-[18px] text-slate-700 font-outfit">Nome do Corretor</label>
                            <input {...register('nome')} type="text" name="nome" id="nome" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome do corretor"/>
                        </div>
                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Imobiliárias</h4>
                            <button onClick={(e) => {e.preventDefault(); setAtivacao(!ativacao)}} value={status_imobiliaria + 1} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{imobiliarias.length != 0 ? imobiliarias[status_imobiliaria].nome_fantasia : 'Não há Imobiliárias cadastradas'}</h6>
                                {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao &&
                                <ul className="absolute translate-y-[6px]">
                                    {imobiliarias.length != 0 && imobiliarias.map((imobiliaria, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setStatus_imobiliaria(index); setAtivacao(!ativacao)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{imobiliaria.nome_fantasia}</button></li>
                                    )}
                                </ul>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    
                        <div className="col-span-1 sm:col-span-1 mt-6">
                            <label htmlFor="email" className="text-[18px] text-slate-700 font-outfit">E-mail</label>
                            <input {...register('email')} type="text" name="email" id="email" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="exemplo@gmail.com"/>
                        </div>

                        <div className="col-span-1 sm:col-span-1 mt-6">
                            <label htmlFor="telefone" className="text-[18px] text-slate-700 font-outfit">Telefone</label>
                            <input {...register('telefone')} type="text" name="telefone" id="telefone" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="(00) 91234-5678"/>
                        </div>

                    </div>

                    <div className="text-center sm:text-right mt-24">
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