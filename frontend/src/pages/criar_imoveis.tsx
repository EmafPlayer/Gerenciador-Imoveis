import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { useState } from "react";


export function CriarImoveis () {

    const { register, handleSubmit } = useForm();

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

    const stateData = (data, func) =>
    {
        if(data === '')
            func(true);
        else 
            func(false);
    }
    
    const validate = (data: any) => 
    {
        stateData(data.nome, setNome)
        stateData(data.rua, setRua)
        stateData(data.bairro, setBairro)
        stateData(data.numero, setNumero)
        stateData(data.cep, setCep)
        stateData(data.cidade, setCidade)
        stateData(data.estado, setEstado)
        stateData(data.latitude, setLatitude)
        stateData(data.longitude, setLongitude)

    }

    const submit = (data: any) => 
    {
        validate(data)
    }

    return (
        <div className="h-screen w-full">
            <NavBar user={user}>
            </NavBar>
            <body className="bg-slate-100 h-full w-full p-6 z-0 pt-[98px]">
            <main className="w-full">
                <form onSubmit={handleSubmit(submit)} className="bg-slate-50 font-bold text-[28px] shadow-md rounded-md p-8 mt-5">
                    <h1 className=" text-center sm:text-left text-slate-800 mb-[2rem] font-medium text-[36px]">Cadastro de Imóveis</h1>

                    <div className=" grid grid-cols-4">
                        <div className="col-span-2">
                            <label htmlFor="nome_imovel" className="text-[18px] text-slate-700">Nome do imóvel</label>
                            <input {...register('nome')} type="text" name="nome_imovel" id="nome_imovel"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Digite o nome do imóvel"/>
                            {nome && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 mt-6">
                        
                        <div className="col-span-2">
                            <label htmlFor="rua" className="text-[18px] text-slate-700">Rua</label>
                            <input {...register('rua')} type="text" name="rua" id="rua"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Rua Dona Benedita"/>
                            {rua && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="bairro" className="text-[18px] text-slate-700">Bairro</label>
                            <input {...register('bairro')} type="text" name="bairro" id="bairro"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Vila Rosalia"/>
                            {bairro && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        
                        <div className="col-span-1">
                            <label htmlFor="numero" className="text-[18px] text-slate-700">Número</label>
                            <input {...register('numero')} type="text" name="numero" id="numero"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="123"/>
                            {numero && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
    
                        <div className="col-span-1">
                            <label htmlFor="cep" className="text-[18px] text-slate-700">CEP</label>
                            <input {...register('cep')} type="text" name="cep" id="cep"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="12345-678"/>
                            {cep && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="cidade" className="text-[18px] text-slate-700">Cidade</label>
                            <input {...register('cidade')} type="text" name="cidade" id="cidade"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Recife"/>
                            {cidade && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="estado" className="text-[18px] text-slate-700">Estado</label>
                            <input {...register('estado')} type="text" name="estado" id="estado"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Pernambuco"/>
                            {estado && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="complemento" className="text-[18px] text-slate-700">Complemento</label>
                            <input type="text" name="complemento" id="complemento"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="Bloco 1, Apto 2"/>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="latitude" className="text-[18px] text-slate-700">Latitude</label>
                            <input {...register('latitude')} type="text" name="latitude" id="latitude"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="-22.952008323405543"/>
                            {latitude && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="longitude" className="text-[18px] text-slate-700">Longitude</label>
                            <input {...register('longitude')} type="text" name="longitude" id="longitude"
                            className="bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px] mt-2 " placeholder="-43.210758860349436"/>
                            {longitude && <h1 className="text-[#F50047] pl-1 pt-3 text-[12px]">*Esse campo é obrigatório</h1>}
                        </div>
                    </div>
                    
                    <div className="text-center sm:text-right mt-12">
                        <button className="bg-[#23C55E] text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:bg-[#23c55ebe] hover:text-[#ffffff] active:bg-[#4DBA87]">Cadastrar</button>
                    </div>
                </form>

            </main>
            </body>
        </div>
    )

}
