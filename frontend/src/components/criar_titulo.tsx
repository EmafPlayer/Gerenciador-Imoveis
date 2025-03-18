import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";
import { useState } from "react";

type props = {
    setModal: Function
}

export function CriarTitulo ( { setModal }: props) {

    const { register, handleSubmit } = useForm();

    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");

    const submit = async (data: any) => {
        try {

            const params = new URLSearchParams ({
                descricao: data.descricao,
            }).toString();

            const response = await api.post(`/v1/inicio/criacao-titulo`, params);

            console.log(response.data.message);
    
            setCriacao(true);
            setMensagem(response.data.message);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen w-full fixed bg-gray-500 inset-0 z-10 bg-opacity-75 flex items-center justify-center">
            <form onSubmit={handleSubmit(submit)} className="bg-white p-14 w-[30rem] flex flex-col justify-between gap-12">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Criar Título</h1>
                    <button onClick={(e) => {setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>

                <div className="">
                    <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Novo Título</label>
                    <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                    className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Conta de Luz"/>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="text-center">
                        <button className="text-[16px] font-normal px-8 py-2 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                    </div>

                    <div className="text-center ">
                        {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                    </div>
                </div>

            </form>
        </div>

        
    )
}