import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../apis/api";
import { twMerge } from "tailwind-merge";
import { Asteristico } from "./asteristico";
import { MdClose } from "react-icons/md";
import { Warning } from "./warning";
import { Bounce, toast, ToastContainer } from "react-toastify";

type props = {
    setModal: Function,
    id_acontecimento: number,
}

export function ModificarDescricaoAcontecimento ( props: props ) {

    const [warning, setWarning] = useState(false);

    const { register, handleSubmit } = useForm();

    const modificarDescricao = async ( data: any ) => {
    
        try{

            const params = new URLSearchParams({
                descricao: data.descricao,
            }); 

            const response = await api.put(`v1/inicio/modificar-descricao-acontecimento/${props.id_acontecimento}`, params);

            setWarning(true);

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

        } catch(error) {

        }

    }

    return (
        <div className="fixed inset-0 z-30 flex justify-center items-center bg-gray-500 bg-opacity-75 h-screen w-full px-4 lg:px-0">
            <form onSubmit={handleSubmit(modificarDescricao)} className="bg-white p-12 w-[35rem] lg:w-[45rem] rounded-lg">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-[35px] lg:text-[45px] font-bold">Modificar Descrição</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={(e) => {props.setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                    </div>
                </div>

                <div className="col-span-1 sm:col-span-1 mt-0 lg:mt-6">
                    <div className="flex items-center gap-2 mb-1">
                        <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                        <Asteristico/>
                    </div>
                    <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                    className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                </div>

                <div className="text-center sm:text-right mt-12">
                    <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                </div>

            </form>

            {warning && <Warning setModal={setWarning}></Warning>}
            <ToastContainer />
        </div>
    )

}