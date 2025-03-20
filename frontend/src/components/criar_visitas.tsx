import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import buscarCorretores from "../apis/buscar_corretores";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { Asteristico } from "./asteristico";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";
import { api } from "../apis/api";
import { Warning } from "./warning";

type props = {
    setModal: Function,
    id_imovel: number | null
}

type returnImobiliaria = {
    nome_corretor: string,
    nome_imobiliaria: string,
    telefone: string,
}

export function CriarVisitas ( {setModal, id_imovel}: props ) {

    const[corretores, setCorretores] = useState<returnImobiliaria[]>([])
    const[status_corretor, setStatus_corretor] = useState(0);
    const[ativacao_corretor, setAtivacao_corretor] = useState(false);  
    const[checked, setChecked] = useState(false);

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");
    const[warning, setWarning] = useState(false);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const dataCorretores = await buscarCorretores();

            console.log(dataCorretores?.corretores_imobiliarias);

            if (dataCorretores?.corretores_imobiliarias) {
                setCorretores(dataCorretores.corretores_imobiliarias);
            } else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }
        };

        fetchData();
    }, []);

    const submit = async ( data: any ) => {
       
        try{

            const params = new URLSearchParams({
                id_imovel: String(id_imovel),
                id_corretor: String(status_corretor + 1),
                data_visita: data.data_visita,
                proposta: checked ? String(1) : String(0),
                valor_proposta: checked ? data.valor_proposta : "",
                data_proposta: checked ?  data.data_proposta : "",
                descricao: data.descricao
            }).toString();

            const response = await api.post(`/v1/inicio/criacao-visita`, params);

            setMensagem(response.data?.message);
            setCriacao(true);
            setWarning(true);

        }catch (error){
            console.error(error);
        }
    }

    return (
            <div className="bg-gray-500 fixed inset-0 z-10 flex items-center justify-center bg-opacity-75">
                <form onSubmit={handleSubmit(submit)} className="bg-white w-[1024px] p-12">
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-[45px] font-bold">Visitas</h1>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-10 gap-y-8 w-full">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Corretor Responsável</h4>
                                <Asteristico/>
                            </div>
                            <button data-toggle="tooltip" data-placement="top" title={corretores.length != 0 ? `Imobiliária - ${corretores[status_corretor].nome_imobiliaria}` : ""} onClick={(e) => {e.preventDefault(); setAtivacao_corretor(!ativacao_corretor)}} value={status_corretor + 1} className="w-full lg:w-[400px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5 whitespace-pre">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{corretores.length != 0 ? `${corretores[status_corretor].nome_corretor}     -     ${corretores[status_corretor].telefone}` : "Ainda não foi criado"}</h6>
                                {ativacao_corretor ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {ativacao_corretor &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {corretores.length != 0 && corretores.map((corretor, index) => 
                                        <li data-toggle="tooltip" data-placement="top" title={`Imobiliária - ${corretor.nome_imobiliaria}`}><button onClick={(e) => {e.preventDefault(); setStatus_corretor(index); setAtivacao_corretor(!ativacao_corretor)}} className="w-full lg:w-[400px] h-11 text-[16px] font-normal rounded-md mb-1 text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2 whitespace-pre">{` ${corretor.nome_corretor}     -     ${corretor.telefone}`}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-1 flex flex-col justify-end " >
                            <div className="flex items-center gap-2 mb-1">
                                <label htmlFor="data_visita" className="text-[18px] text-slate-700 font-outfit">Data da Visita</label>
                                <Asteristico/>
                            </div>
                            <input {...register('data_visita')} type="date" name="data_visita" id="data_visita" required 
                            className=" bg-[#353941] text-white border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl px-3 transition duration-150 ease-in-out pb-[8px]"/>
                        </div>

                        <div className="col-span-1 flex items-center gap-3 ">
                            <label htmlFor="proposta" className="text-[18px] text-slate-700 font-outfit">Houve proposta?</label>
                            <input type="checkbox" name="proposta" id="proposta" onChange={(e) => setChecked(e.target.checked)} className="accent-[#353941] w-6 h-6 rounded-lg transition duration-300 delay-300 ease-in-out"/>
                        </div>

                        <div className={twMerge("col-span-1 flex flex-col justify-end", !checked && " pointer-events-none opacity-60")}>
                            <div className={twMerge("mb-1", checked && "flex items-center gap-2")}>
                                <label htmlFor="data_proposta" className="text-[18px] text-slate-700 font-outfit">Data da Proposta</label>
                                {checked && <Asteristico/>}
                            </div>
                            <input {...register('data_proposta')} type="date" name="data_proposta" id="data_proposta"  required={checked}
                            className=" bg-[#353941] text-white border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl px-3 transition duration-150 ease-in-out pb-[8px]"/>
                        </div>
                        
                        <div className={twMerge("col-span-1", !checked && " pointer-events-none opacity-60")}>
                            <div className={twMerge("mb-1", checked && "flex items-center gap-2")}>
                                <label htmlFor="valor_proposta" className="text-[18px] text-slate-700 font-outfit">Valor da Proposta (R$)</label>
                                {checked && <Asteristico/>}
                            </div>
                            <input {...register('valor_proposta')} type="number" step='0.01' name="valor_proposta" id="valor_proposta" required={checked}
                            className={twMerge('bg-slate-50 border-slate-500 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="300000.00"/>
                        </div>

                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:mt-6">
                            <div className="flex items-center gap-2 mb-1">
                                <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                                <Asteristico/>
                            </div>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>

                    </div>
                        <div className="text-center sm:text-right mt-24">
                            <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                        </div>
                        <div className="text-center sm:text-right pr-2">
                            {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                        </div>
                </form>

                {warning && <Warning setModal={setWarning}></Warning>}
            </div>
        )

}