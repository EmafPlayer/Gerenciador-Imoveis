import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { useState } from "react";
import { api } from '../apis/api';
import { twMerge } from "tailwind-merge";


export function CriarImoveis () {

    const { register, handleSubmit } = useForm();
    
    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const[nome, setNome] = useState(false);
    const[rua, setRua] = useState(false);
    const[bairro, setBairro] = useState(false);
    const[numero, setNumero] = useState(false);
    const[cep, setCep] = useState(false);
    const[cidade, setCidade] = useState(false);
    const[estado, setEstado] = useState(false);
    const[latitude, setLatitude] = useState(false);
    const[longitude, setLongitude] = useState(false);
    
    const location = useLocation();
    
    let user = location.state.user;

    const stateData = (data: any, func: any) =>
    {
        if(data === '')
            func(true);
        else 
            func(false);
    }
    
    const validate = (data: any) => 
    {
        stateData(data.nome_imovel, setNome)
        stateData(data.rua, setRua)
        stateData(data.bairro, setBairro)
        stateData(data.numero, setNumero)
        stateData(data.cep, setCep)
        stateData(data.cidade, setCidade)
        stateData(data.estado, setEstado)
        stateData(data.latitude, setLatitude)
        stateData(data.longitude, setLongitude)

    }

    const submit = async (data: any) => 
    {
        validate(data)
        
        if(!nome && !rua && !bairro && !numero && !cep && !cidade && !estado && !latitude && !longitude){

            try {
                const params = new URLSearchParams({
                    nome_imovel: data.nome_imovel,
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
        
                const response = await api.get(`/v1/inicio/criacao-imoveis?${params}`);
                
                console.log(response.data.message);
    
                setCriacao(true);
                setMensagem(response.data.message);
                
            } catch (error) {
                console.error(error);
            }
        }
    }



    return (
        <div className="h-screen w-full">
            <NavBar user={user}>
            </NavBar>
            <body className="relative h-full w-full z-0 pt-[95px]">
            <div className="absolute inset-0 bg-[url('../../public/fundo.svg')] bg-cover bg-center opacity-40"></div>
            <main className="w-full relative z-10 p-6">
                <form onSubmit={handleSubmit(submit)} className="bg-slate-200 font-bold text-[28px] shadow-md rounded-md p-8 mt-5">
                    <h1 className={twMerge('text-center sm:text-left text-slate-800 mb-[2rem] font-medium text-[36px] uppercase', nome ? "" : "py-4")} >Cadastro de Imóveis</h1>

                    <div className=" grid grid-cols-4">
                        <div className="col-span-2">
                            <label htmlFor="nome_imovel" className="text-[18px] text-slate-700">Nome do imóvel</label>
                            <input {...register('nome_imovel')} type="text" name="nome_imovel" id="nome_imovel"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', nome ? "" : "mt-2 mb-3" )} placeholder="Digite o nome do imóvel"/>
                            {nome && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mt-6">
                        
                        <div className="col-span-2">
                            <label htmlFor="rua" className="text-[18px] text-slate-700">Rua</label>
                            <input {...register('rua')} type="text" name="rua" id="rua"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]', rua ? "" : "mt-2 mb-3" )} placeholder="Rua Dona Benedita"/>
                            {rua && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="bairro" className="text-[18px] text-slate-700">Bairro</label>
                            <input {...register('bairro')} type="text" name="bairro" id="bairro"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', bairro ? "" : "mt-2 mb-3")} placeholder="Vila Rosalia"/>
                            {bairro && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        
                        <div className="col-span-1">
                            <label htmlFor="numero" className="text-[18px] text-slate-700">Número</label>
                            <input {...register('numero')} type="text" name="numero" id="numero"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', numero ? "" : "mt-2 mb-3")} placeholder="123"/>
                            {numero && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
    
                        <div className="col-span-1">
                            <label htmlFor="cep" className="text-[18px] text-slate-700">CEP</label>
                            <input {...register('cep')} type="text" name="cep" id="cep"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', cep ? "" : "mt-2 mb-3")} placeholder="12345-678"/>
                            {cep && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="cidade" className="text-[18px] text-slate-700">Cidade</label>
                            <input {...register('cidade')} type="text" name="cidade" id="cidade"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', cidade ? "" : "mt-2 mb-3")} placeholder="Recife"/>
                            {cidade && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="estado" className="text-[18px] text-slate-700">Estado</label>
                            <input {...register('estado')} type="text" name="estado" id="estado"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', estado ? "" : "mt-2 mb-3")} placeholder="Pernambuco"/>
                            {estado && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="complemento" className="text-[18px] text-slate-700">Complemento</label>
                            <input {...register('complemento')} type="text" name="complemento" id="complemento"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', estado ? "" : "mt-2 mb-3")} placeholder="Bloco 1, Apto 2"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="latitude" className="text-[18px] text-slate-700">Latitude</label>
                            <input {...register('latitude')} type="number" step='0.0000000000000001' name="latitude" id="latitude"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', latitude ? "" : "mt-2 mb-3")} placeholder="-22.952008323405543"/>
                            {latitude && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="longitude" className="text-[18px] text-slate-700">Longitude</label>
                            <input {...register('longitude')} type="number" step='0.0000000000000001' name="longitude" id="longitude"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]', longitude ? "" : "mt-2 mb-3")} placeholder="-43.210758860349436"/>
                            {longitude && <h1 className="text-[#F50047] pl-1 pt-2 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                    </div>
                    
                    <div className="text-center sm:text-right mt-12">
                        <button className="bg-[#23C55E] text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:bg-[#23c55ebe] hover:text-[#ffffff] active:bg-[#4DBA87]">Cadastrar</button>
                    </div>
                    <div className="text-center sm:text-right pr-2">
                        {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                    </div>
                </form>

            </main>
            </body>
        </div>
    )

}
