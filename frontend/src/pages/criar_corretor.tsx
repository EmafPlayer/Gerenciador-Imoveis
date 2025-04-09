import { useForm } from "react-hook-form";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import buscarImobiliarias from "../apis/buscar_imobiliarias";
import { api } from "../apis/api";
import { Asteristico } from "../components/asteristico";
import { Bounce, toast, ToastContainer } from "react-toastify";

type userProps = {
    username: string,
}

type returnImobiliaria = {
    id: number,
    nome_fantasia: string,
    nome_oficial: string,
}

export function CriarCorretor () { 

    const[status_imobiliaria, setStatus_imobiliaria] = useState(0);
    const[ativacao, setAtivacao] = useState(false);

    const [imobiliarias, setImobiliarias] = useState<returnImobiliaria[]>([]);

    const { register, handleSubmit } = useForm();

    const rule = localStorage.getItem("rule_user")

    const user: userProps = {
        username: localStorage.getItem("nome_usuario") ?? "",
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataImobiliarias = await buscarImobiliarias();

            if (dataImobiliarias?.imobiliarias) 
                setImobiliarias(dataImobiliarias.imobiliarias);
        };

        fetchData();
    }, []);


    const submit = async (data: any) => 
    {
        if(imobiliarias.length != 0) {
            
            try {
                const params = new URLSearchParams({
                    id_imobiliaria: String(imobiliarias[status_imobiliaria].id),
                    nome: data.nome,
                    email: data.email,
                    telefone: data.telefone,
                }).toString();
        
                const response = await api.post(`/v1/inicio/criacao-corretor`, params);
                
                toast.success(response.data.message, {
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
                
            } catch (error) {
                
            }
            
        }
    }

    if ( rule == "admin" ) {
        
        return (
            <div className="h-screen w-full">
                <NavBar user={user}>
                </NavBar>
                <main className="w-full h-full pt-[115px] bg-[#FFFFFF] p-6">
                    <form onSubmit={handleSubmit(submit)} className="bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5">
                        
                        <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[36px] uppercase')} >Cadastro de Corretor</h1>
    
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center gap-6 lg:gap-32">
                            <div className="col-span-1 lg:col-span-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <label htmlFor="nome" className="text-[18px] text-slate-700 font-outfit">Nome do Corretor</label>
                                    <Asteristico/>
                                </div>
                                <input {...register('nome')} type="text" name="nome" id="nome" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome do corretor"/>
                            </div>
                            <div className="col-span-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Imobiliárias</h4>
                                    <Asteristico/>
                                </div>
                                <button data-toggle="tooltip" data-placement="top" title={imobiliarias.length != 0 ? imobiliarias[status_imobiliaria].nome_oficial : 'Não há Imobiliárias cadastradas'} onClick={(e) => {e.preventDefault(); setAtivacao(!ativacao)}} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                    <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{imobiliarias.length != 0 ? imobiliarias[status_imobiliaria].nome_fantasia : 'Não há Imobiliárias cadastradas'}</h6>
                                    {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                                </button>
                                {ativacao &&
                                    <ul className="relative lg:absolute translate-y-[6px]">
                                        {imobiliarias.length != 0 && imobiliarias.map((imobiliaria, index) => 
                                            <li><button data-toggle="tooltip" data-placement="top" title={imobiliaria.nome_oficial} onClick={(e) => {e.preventDefault(); setStatus_imobiliaria(index); setAtivacao(!ativacao)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{imobiliaria.nome_fantasia}</button></li>
                                        )}
                                    </ul>}
                            </div>
                        </div>
    
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 lg:mt-6">
                        
                            <div className="col-span-1 sm:col-span-1 mt-0 lg:mt-[25.3px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <label htmlFor="email" className="text-[18px] text-slate-700 font-outfit">E-mail</label>
                                </div>
                                <input {...register('email')} type="text" name="email" id="email"
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="exemplo@gmail.com"/>
                            </div>
    
                            <div className="col-span-1 sm:col-span-1 mt-0 lg:mt-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <label htmlFor="telefone" className="text-[18px] text-slate-700 font-outfit">Telefone</label>
                                    <Asteristico/>
                                </div>
                                <input {...register('telefone')} type="text" name="telefone" id="telefone" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="(00) 91234-5678"/>
                            </div>
    
                        </div>
    
                        <div className="text-center sm:text-right mt-12 lg:mt-24">
                            <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                        </div>
    
                    </form>
                </main>
                <ToastContainer />
            </div>
        )

    }

}