import { useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { api } from "../apis/api";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type userProps = {
    nome: string,
    foto: string,
}

export function CriarImobiliaria () {

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const { register, handleSubmit } = useForm();

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    const submit = async (data: any) => 
    {
        try {
            const params = new URLSearchParams({
                nome_fantasia: data.nome_fantasia,
                nome_oficial: data.nome_oficial,       
                email: data.email,
                site: data.site,
                contato: data.contato,
                rua: data.rua,
                bairro: data.bairro,
                numero: data.numero,
                cep: data.cep,
                cidade: data.cidade,
                estado: data.estado,
                complemento: data.complemento,
                latitude: data.latitude,
                longitude: data.longitude,
            }).toString();
    
            const response = await api.get(`/v1/inicio/criacao-imobiliaria?${params}`);
            
            console.log(response.data.message);

            setCriacao(true);
            setMensagem(response.data.message);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-full w-full">
            <NavBar user={user}>
            </NavBar>
            <main className="w-full h-full pt-[115px] bg-[#FFFFFF] p-6">
                <form onSubmit={handleSubmit(submit)} className={twMerge('bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5', criacao ? 'mb-6' : '')}>
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[2rem] font-medium text-[32px] sm:text-[36px] uppercase')} >Cadastro de Imobiliária</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-6 lg:gap-10">
                        
                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="nome_oficial" className="text-[18px] text-slate-700 font-outfit">Nome oficial da imobiliária</label>
                            <input {...register('nome_oficial')} type="text" name="nome_oficial" id="nome_oficial" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome oficial da imobiliária"/>
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="nome_fantasia" className="text-[18px] text-slate-700 font-outfit">Nome fantasia da imobiliária</label>
                            <input {...register('nome_fantasia')} type="text" name="nome_fantasia" id="nome_fantasia" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome fantasia da imobiliária"/>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6">

                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="email" className="text-[18px] text-slate-700 font-outfit">E-mail</label>
                            <input {...register('email')} type="text" name="email" id="email" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="exemplo@gmail.com"/>
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="site" className="text-[18px] text-slate-700 font-outfit">Site</label>
                            <input {...register('site')} type="text" name="site" id="site" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="https://www.exemplo.com"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="contato" className="text-[18px] text-slate-700 font-outfit">Contato</label>
                            <input {...register('contato')} type="text" name="contato" id="contato" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="(00) 91234-5678"/>
                        </div>


                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="rua" className="text-[18px] text-slate-700 font-outfit">Rua</label>
                            <input {...register('rua')} type="text" name="rua" id="rua" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Rua Dona Benedita"/>
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="bairro" className="text-[18px] text-slate-700 font-outfit">Bairro</label>
                            <input {...register('bairro')} type="text" name="bairro" id="bairro" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Vila Rosalia"/>
                        </div>
                        
                        <div className="col-span-1">
                            <label htmlFor="numero" className="text-[18px] text-slate-700 font-outfit">Número</label>
                            <input {...register('numero')} type="text" name="numero" id="numero" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="123"/>
                        </div>
    
                        <div className="col-span-1">
                            <label htmlFor="cep" className="text-[18px] text-slate-700 font-outfit">CEP</label>
                            <input {...register('cep')} type="text" name="cep" id="cep" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="12345-678"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="cidade" className="text-[18px] text-slate-700 font-outfit">Cidade</label>
                            <input {...register('cidade')} type="text" name="cidade" id="cidade" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Recife"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="estado" className="text-[18px] text-slate-700 font-outfit">Estado</label>
                            <input {...register('estado')} type="text" name="estado" id="estado" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Pernambuco"/>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="complemento" className="text-[18px] text-slate-700 font-outfit">Complemento</label>
                            <input {...register('complemento')} type="text" name="complemento" id="complemento"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Bloco 1, Apto 2"/>
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="latitude" className="text-[18px] text-slate-700 font-outfit">Latitude</label>
                            <input {...register('latitude')} type="number" step='0.0000000000000001' name="latitude" id="latitude" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="-22.952008323405543"/>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                            <label htmlFor="longitude" className="text-[18px] text-slate-700 font-outfit">Longitude</label>
                            <input {...register('longitude')} type="number" step='0.0000000000000001' name="longitude" id="longitude" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="-43.210758860349436"/>
                        </div>
                    </div>

                    <div className="text-center sm:text-right mt-12">
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