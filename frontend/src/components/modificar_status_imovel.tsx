import { useState } from "react";
import { Asteristico } from "./asteristico";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { Warning } from "./warning";
import { api } from "../apis/api";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";

type Props = {
    setModal: Function,
    id_imovel: number,
}

export function ModificarStatusImovel ( props: Props ) {

    const[id_status, setIdStatus] = useState(0);
    const[status, setStatus] = useState(false);

    const [warning, setWarning] = useState(false);

    const { handleSubmit } = useForm();
    
    const status_imovel = ['Vago', 'Em uso', 'Alugado', 'Loteamento', 'Em reforma'];

    const submit = async () => {

        try{

            const response = await api.put(`v1/inicio/modificar-status-imovel/${props.id_imovel}/${id_status + 1}`);

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

        } catch(error) {
            console.error(error);
        }


    }

    return (
            <main>
                <div className="fixed inset-0 z-10 flex justify-center items-center bg-gray-500 bg-opacity-75 h-screen w-full">
                    <form onSubmit={handleSubmit(submit)} className="bg-white p-12 w-[35rem] lg:w-[500px]">
                        <div className="flex items-center justify-between mb-12">
                            <h1 className="text-[45px] font-bold">Criar Chaves</h1>
                            <div className="flex items-center gap-3">
                                <button onClick={(e) => {props.setModal(false); e.preventDefault()}} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                            </div>
                        </div>
    
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[18px] text-slate-700 font-outfit mb-[5px]">Pessoas</h4>
                            <Asteristico/>
                        </div>
                        <button onClick={(e) => {e.preventDefault(); setStatus(!status)}} className="w-full h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-end items-center px-5 whitespace-pre">
                            <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{status_imovel[id_status]}</h6>
                            {status ? <BsCaretUpFill className="text-[#ffffff] ml-[140px]"/>  : <BsCaretDownFill className="text-[#ffffff] ml-[140px]"/> }
                        </button>
                        {status &&
                            <ul className="relative translate-y-[6px]">
                                {status_imovel.length != 0 && status_imovel.map((status, index) => 
                                    <li className="mb-1"><button onClick={(e) => {e.preventDefault(); setIdStatus(index); setStatus(!status)}} className="w-full whitespace-pre h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{status}</button></li>
                                )}
                            </ul>}
                                    
                        <div className="text-center sm:text-right mt-12">
                            <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                        </div>
                        
                    </form>
                </div>
                {warning && <Warning setModal={setWarning}></Warning>}
                <ToastContainer />
            </main>
            )

}