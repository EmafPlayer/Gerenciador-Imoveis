import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge";
import { api } from "../apis/api";
import { useState } from "react";
import { Warning } from "./warning";
import { Bounce, toast, ToastContainer } from "react-toastify";

type props = {
    setModal: Function,
    id_imovel: number | null
}

type DataType = {
    title: string;
    file: File | null;
};

export function UploadFotos ( { setModal, id_imovel }: props) {

    const [data, setData] = useState<DataType>({
        title: "",
        file: null
    });

    const [warning, setWarning] = useState(false);

    const submit = async (e) => {
        
        try {
            
            e.preventDefault();

            if (!data.file) {
                console.error("Nenhum arquivo selecionado!");
                return;
            }
    
            const formData = new FormData();
            formData.append("file", data.file);
    
            const response = await api.post("/v1/inicio/upload-fotos", formData, {
                params: {
                    id_imovel: id_imovel,
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
            console.error(error);
        }
    };

    console.log(data);

    return (
        <div className="h-screen w-full fixed bg-gray-500 inset-0 z-10 bg-opacity-75 flex items-center justify-center">
            <form onSubmit={submit} className="bg-white p-14 w-[30rem] flex flex-col justify-between gap-12"> {/* onSubmit={handleSubmit(submit)}  */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Upload Fotos</h1>
                    <button onClick={(e) => {setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>

                <div className="">
                    <label htmlFor="file" className="text-[18px] text-slate-700 font-outfit">Foto</label>
                    <input onChange={(e) => setData(prev => ({ ...prev, file: e.target.files[0] }))} type="file" name="file" id="file" required
                    className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px] mt-1')} placeholder="Conta de Luz"/>
                </div>

                <button className="text-[16px] font-normal px-8 py-2 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Enviar</button>

            </form>
            {warning && <Warning setModal={setWarning}></Warning>}
            <ToastContainer />
        </div>
    )
}