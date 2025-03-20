import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md"
import { Asteristico } from "./asteristico";
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";
import { Bounce, toast, ToastContainer } from "react-toastify";

type props = {
    setModal: Function
}

export function CriarPessoa ({ setModal }: props) {

    const { register, handleSubmit } = useForm();

    const submit = async (data: any) => {
        
        try{
            const params = new URLSearchParams({
                nome_completo: data.nome_completo,
                contato: data.contato,
            }).toString();

            const response = await api.post(`/v1/inicio/criacao-pessoa?${params}`);

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
            console.error(error);
        }
        
    }

    return (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-75 h-screen w-full">
            <form onSubmit={handleSubmit(submit)} className="bg-white p-12 w-[35rem] lg:w-[45rem]">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-[45px] font-bold">Criar Pessoa</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={(e) => {setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                    </div>
                </div>

                <div className="col-span-1 sm:col-span-1 mt-0 lg:mt-6">
                    <div className="flex items-center gap-2 mb-1">
                        <label htmlFor="nome_completo" className="text-[18px] text-slate-700 font-outfit">Nome da Pessoa</label>
                        <Asteristico/>
                    </div>
                    <input {...register('nome_completo')} type="text" name="nome_completo" id="nome_completo" required
                    className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Marco Raphael"/>
                </div>

                <div className="col-span-1 sm:col-span-1 mt-0 lg:mt-6">
                    <div className="flex items-center gap-2 mb-1">
                        <label htmlFor="contato" className="text-[18px] text-slate-700 font-outfit">Contato</label>
                        <Asteristico/>
                    </div>
                    <input {...register('contato')} type="text" name="contato" id="contato" required
                    className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="(00) 9 1234-5678"/>
                </div>

                <div className="text-center sm:text-right mt-12">
                    <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                </div>

            </form>
            <ToastContainer />
        </div>
    )
}