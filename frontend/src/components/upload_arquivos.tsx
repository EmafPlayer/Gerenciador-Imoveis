import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";
import { useState } from "react";
import { Warning } from "./warning";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { Asteristico } from "./asteristico";

type props = {
    setModal: Function,
    id_acontecimento: number
}

type DataType = {
    title: string;
    file: File | null;
};

export function UploadArquivos ( { setModal, id_acontecimento }: props) {

    const [info, setData] = useState<DataType>({
        title: "",
        file: null
    });

    const { register, handleSubmit} = useForm()

    const [warning, setWarning] = useState(false);

    const submit = async (data: any, e) => {
        
        try {
            
            e.preventDefault();

            if (!info.file)
                return;
            
    
            const formData = new FormData();
            formData.append("file", info.file);
    
            const response = await api.post("/v1/inicio/upload-arquivos", formData, {
                params: {
                    id_acontecimento: id_acontecimento,
                    descricao: data.descricao
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
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

            setWarning(true);
    
        } catch (error) {
        }
    };

    return (
        <div className="h-screen w-full fixed bg-gray-500 inset-0 z-30 bg-opacity-75 flex items-center justify-center px-2 lg:px-0">
            <form onSubmit={handleSubmit(submit)} className="bg-white px-6 lg:px-14 py-14 lg:py-14 w-full lg:w-[30rem] flex flex-col justify-between gap-12 rounded-lg"> {/* onSubmit={handleSubmit(submit)}  */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Upload Arquivos</h1>
                    <button onClick={(e) => {setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>

                <div className="flex flex-col gap-2">

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Título</label>
                            <Asteristico/>
                        </div>
                        <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                        className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="Arquivo principal de Reforma"/><input/>
                    </div>

                    <div className="">
                        <div className="flex items-center gap-2 mb-1">
                            <label htmlFor="file" className="text-[18px] text-slate-700 font-outfit">Foto</label>
                            <Asteristico/>
                        </div>
                        <input onChange={(e) => setData(prev => ({ ...prev, file: e.target.files[0] }))} type="file" name="file" id="file" required
                        className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px] mt-1')} placeholder="Conta de Luz"/>
                    </div>

                </div>


                <button className="text-[16px] font-normal px-8 py-2 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Enviar</button>

            </form>
            {warning && <Warning setModal={setWarning}></Warning>}
            <ToastContainer />
        </div>
    )
}