import { useEffect, useState } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { FcKey } from "react-icons/fc"
import { MdClose } from "react-icons/md"
import { CriarPessoa } from "./popup_criar_pessoa"
import { CriarChaves } from "./popup_criar_chaves"
import CarregarChaves from "../apis/carregar_pessoas_imovel"
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa"
import { api } from "../apis/api"
import { ModificarChave } from "./popup_modificar_chave"
import { Warning } from "./warning"
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive"

type props = {
    setModal: Function,
    id_imovel: number | null
}

type chavesProps = {
    id_chave: number,
    nome_completo: string,
    contato: string,
}

export function CompChaves ( { setModal, id_imovel }: props ) {

    const [bChaves, setBChaves] = useState(false);
    const [bPessoas, setBPessoas] = useState(false);
    const [modificar_chave, setModificarChave] = useState(false);
    const [warning, setWarning] = useState(false);

    const [id_chave, setIdChave] = useState(0);

    const rule = localStorage.getItem("rule_user")
    
    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })

    const[pessoas, setPessoas] = useState<chavesProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataPessoas = await CarregarChaves(id_imovel);

            console.log(dataPessoas?.pessoas)

            if (dataPessoas?.pessoas) 
                setPessoas(dataPessoas.pessoas);
        };

        fetchData();
    }, []);

    const deletarChave = async ( id_chave: number ) => {

        try {

            const response = await api.delete(`v1/inicio/deletar-chave/${id_chave}`);
            
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

    }

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-500 bg-opacity-75 h-screen w-full px-4 sm:px-0 py-6 sm:py-10">
            <div className="bg-white px-5 sm:px-14 py-6 sm:py-14 w-full sm:w-[560px] lg:w-[800px] h-full rounded-lg">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    
                    <h1 className="text-[40px] sm:text-[45px] font-bold">Chaves</h1>

                    <div className="flex items-center gap-3">
                        { rule == "admin" && <button onClick={() => setBChaves(true)} data-toggle="tooltip" data-placement="top" title="Criar Chaves" className="text-white text-[20px] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] px-3 py-2 sm:py-[5px] rounded-md flex items-center sm:gap-3"><AiFillPlusCircle /> <h1 className="text-[18px]">{isLowScreen && "Chaves"}</h1></button>}
                        { rule == "admin" && <button onClick={() => setBPessoas(true)} data-toggle="tooltip" data-placement="top" title="Criar Pessoas" className="text-white text-[20px] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] px-3 sm:px-2 py-2 sm:py-[5px] rounded-md flex items-center sm:gap-3"><AiFillPlusCircle /><h1 className="text-[18px]">{isLowScreen && "Pessoas"}</h1></button>}
                    </div>

                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-3 rounded-md"><MdClose /></button>
                
                </div>

                <div className="h-[480px] sm:h-[600px] w-full gap-5 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto p-2">
                    {pessoas.length != 0 && pessoas.map((pessoa) =>
                        <div className="flex items-center col-span-1 gap-1">
                            <div className="bg-[#DB6900] h-[70px] sm:h-[82px] flex items-center sm:pr-2 pl-3 sm:pl-6 gap-x-2 sm:gap-x-4 w-[90%] rounded-lg shadow-md">
                                <div className="border-r-2 h-full flex items-center pr-3 sm:pr-5">
                                    <FcKey className="text-[40px]"/>
                                </div>
                                <div className="pl-2">
                                    <div className="text-[18px] text-white">{pessoa.nome_completo}</div>
                                    <div className="text-[14px] text-white text-opacity-90">{pessoa.contato}</div>
                                </div>
                            </div> 
                            <div className="flex flex-col gap-y-1">
                                <button onClick={() => {setIdChave(pessoa.id_chave); setModificarChave(true)}} className="rounded-lg bg-[#0258d9ee] flex justify-center items-center h-[32px] sm:h-[38px] w-[32px] sm:w-[38px] transition ease-in-out delay-100 hover:scale-125"><FaPencilAlt className="text-[18px] text-slate-100"/></button>
                                <button onClick={() => {deletarChave(pessoa.id_chave)}} className="rounded-lg bg-[#db001de5] flex justify-center items-center h-[32px] sm:h-[38px] w-[32px] sm:w-[38px] transition ease-in-out delay-100 hover:scale-125"><RiDeleteBin2Fill className="text-[20px] text-slate-100"/></button>
                            </div>
                            
                        </div>
                    )}
                </div>
                
            </div>
            {warning && <Warning setModal={setWarning}></Warning>}
            {modificar_chave && <ModificarChave setModal={setModificarChave} id_chave={id_chave}/>}
            {bChaves && <CriarChaves setModal={setBChaves} id_imovel={id_imovel}/>}
            {bPessoas && <CriarPessoa setModal={setBPessoas}/>}
            <ToastContainer />
        </div>
    )

}