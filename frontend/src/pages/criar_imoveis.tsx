import { useForm } from "react-hook-form"
import { NavBar } from "../components/nav_bar";
import { useState } from "react";
import { api } from '../apis/api';
import { twMerge } from "tailwind-merge";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";


type userProps = {
    nome: string,
    foto: string,
}

export function CriarImoveis () {
    
    const status_imoveis = ["Vago", "Em uso interno", "Alugado", "Loteamento", "Em reforma"];
    
    const { register, handleSubmit } = useForm();
    
    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");
    const[status_botao, setStatus_botao] = useState(0);
    const[ativacao, setAtivacao] = useState(false);

    //const location = useLocation();
    
    //let user = location.state.user;

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    const submit = async (data: any) => 
    {
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
                fornecimento_agua: data.fornecimento_agua,
                fornecimento_luz: data.fornecimento_luz,
                cadastro_iptu: data.cadastro_iptu,
                matricula: data. matricula,
                cartorio_registro: data.cartorio_registro,
                area: data.area,
                area_testada: data.area_testada,
                fracao_ideal: data.fracao_ideal,
                area_total: data.area_total,
                area_construida: data.area_construida,
                tipo_status: String(status_botao + 1),
                descricao: data.descricao
            }).toString();
    
            const response = await api.get(`/v1/inicio/criacao-imoveis?${params}`);
            
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
            <main className="w-full h-full pt-[115px] bg-[#FFFFFF] px-6">
                <form onSubmit={handleSubmit(submit)} className="bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5 mb-12">
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[2rem] font-medium text-[36px] uppercase')} >Cadastro de Imóveis</h1>

                    <div className="grid grid-cols-4 gap-32">
                        <div className="col-span-2 ">
                            <label htmlFor="nome_imovel" className="text-[18px] text-slate-700 font-outfit">Nome do imóvel</label>
                            <input {...register('nome_imovel')} type="text" name="nome_imovel" id="nome_imovel" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Digite o nome do imóvel"/>
                        </div>
                        <div className="">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Status do imóvel</h4>
                            <button onClick={(e) => {e.preventDefault(); setAtivacao(!ativacao)}} value={status_botao} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{status_imoveis[status_botao]}</h6>
                                {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao &&
                                <ul className="absolute translate-y-[6px]">
                                    {status_imoveis.map((status, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setStatus_botao(index); setAtivacao(!ativacao)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{status}</button></li>
                                    )}
                                </ul>}
                        </div>
                        
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mt-6">
                        
                        <div className="col-span-1 sm:col-span-2">
                            <label htmlFor="rua" className="text-[18px] text-slate-700 font-outfit">Rua</label>
                            <input {...register('rua')} type="text" name="rua" id="rua" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Rua Dona Benedita"/>
                        </div>

                        <div className="col-span-1">
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
                        <div className="col-span-1">
                            <label htmlFor="complemento" className="text-[18px] text-slate-700 font-outfit">Complemento</label>
                            <input {...register('complemento')} type="text" name="complemento" id="complemento"
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="Bloco 1, Apto 2"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="latitude" className="text-[18px] text-slate-700 font-outfit">Latitude</label>
                            <input {...register('latitude')} type="number" step='0.0000000000000001' name="latitude" id="latitude" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="-22.952008323405543"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="longitude" className="text-[18px] text-slate-700 font-outfit">Longitude</label>
                            <input {...register('longitude')} type="number" step='0.0000000000000001' name="longitude" id="longitude" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="-43.210758860349436"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="fornecimento_agua" className="text-[18px] text-slate-700 font-outfit">Fornecimendo de Água</label>
                            <input {...register('fornecimento_agua')} type="text" name="fornecimento_agua" id="fornecimento_agua" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="01234567890123"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="fornecimento_luz" className="text-[18px] text-slate-700 font-outfit">Fornecimendo de Luz</label>
                            <input {...register('fornecimento_luz')} type="text" name="fornecimento_luz" id="fornecimento_luz" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="012345678901234"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="cadastro_iptu" className="text-[18px] text-slate-700 font-outfit">Cadastro do IPTU</label>
                            <input {...register('cadastro_iptu')} type="text" name="cadastro_iptu" id="cadastro_iptu" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="012.345.6789-0"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="matricula" className="text-[18px] text-slate-700 font-outfit">Matrícula</label>
                            <input {...register('matricula')} type="text" name="matricula" id="matricula" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="123456"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="cartorio_registro" className="text-[18px] text-slate-700 font-outfit">Registro do Cartório</label>
                            <input {...register('cartorio_registro')} type="text" name="cartorio_registro" id="cartorio_registro" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="1º Cartório de Imóveis"/>
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="area" className="text-[18px] text-slate-700 font-outfit">Área Incorporada</label>
                            <input {...register('area')} type="number" step='0.01' name="area" id="area" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="100"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="area_testada" className="text-[18px] text-slate-700 font-outfit">Área Testada</label>
                            <input {...register('area_testada')} type="number" step='0.01' name="area_testada" id="area_testada" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="10.3"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="fracao_ideal" className="text-[18px] text-slate-700 font-outfit">Fração Ideal</label>
                            <input {...register('fracao_ideal')} type="number" step='0.01' name="fracao_ideal" id="fracao_ideal" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="1"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="area_total" className="text-[18px] text-slate-700 font-outfit">Área Total</label>
                            <input {...register('area_total')} type="number" step='0.01' name="area_total" id="area_total" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="120"/>
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="area_construida" className="text-[18px] text-slate-700 font-outfit">Área Construída</label>
                            <input {...register('area_construida')} type="number" step='0.01' name="area_construida" id="area_construida" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="90"/>
                        </div>
                        
                        <div className="col-span-1 sm:col-span-5">
                                <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                                <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                                className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
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
