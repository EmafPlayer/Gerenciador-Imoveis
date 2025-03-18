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

    const [id_chave, setIdChave] = useState(0);

    const[pessoas, setPessoas] = useState<chavesProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataPessoas = await CarregarChaves(id_imovel);

            console.log(dataPessoas?.pessoas)

            if (dataPessoas?.pessoas) {
                setPessoas(dataPessoas.pessoas);
            } else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }
        };

        fetchData();
    }, []);

    const deletarChave = async ( id_chave: number ) => {

        try {

            const response = await api.delete(`v1/inicio/deletar-chave/${id_chave}`);
            
            console.log(response.data.message);

        } catch (error) {
            
        }

    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 h-screen w-full">
            <div className="bg-white p-12 w-[560px] lg:w-[800px]">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-[45px] font-bold">Chaves</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setBChaves(true)} className="text-white text-[20px] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] px-3 py-[5px] rounded-md flex items-center gap-3"><AiFillPlusCircle /> <h1 className="text-[18px]">Chaves</h1></button>
                        <button onClick={() => setBPessoas(true)} className="text-white text-[20px] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] px-2 py-[5px] rounded-md flex items-center gap-3"><AiFillPlusCircle /><h1 className="text-[18px]">Pessoas</h1></button>
                        <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                    </div>
                </div>

                <div className="h-[600px] w-full gap-5 grid grid-cols-2 overflow-y-auto p-2">
                    {pessoas.length != 0 && pessoas.map((pessoa) =>
                        <div className="flex items-center col-span-1 gap-1">
                            <div className="bg-[#DB6900] h-[82px] flex justify-center items-center py-2 gap-x-4 w-[80%] rounded-lg shadow-md">
                                <div className="border-r-2 h-full flex items-center pr-5">
                                    <FcKey className="text-[40px]"/>
                                </div>
                                <div className="pl-2">
                                    <div className="text-[18px] text-white">{pessoa.nome_completo}</div>
                                    <div className="text-[14px] text-white text-opacity-90">{pessoa.contato}</div>
                                </div>
                            </div> 
                            <div className="flex flex-col gap-y-1">
                                <button onClick={() => {setIdChave(pessoa.id_chave); setModificarChave(true)}} className="rounded-lg bg-[#0258d9ee] flex justify-center items-center h-[38px] w-[38px]"><FaPencilAlt className="text-[18px] text-slate-100"/></button>
                                <button onClick={() => {deletarChave(pessoa.id_chave)}} className="rounded-lg bg-[#db001de5] flex justify-center items-center h-[38px] w-[38px]"><RiDeleteBin2Fill className="text-[20px] text-slate-100"/></button>
                            </div>
                            
                        </div>
                    )}
                </div>
                
            </div>
            {modificar_chave && <ModificarChave setModal={setModificarChave} id_chave={id_chave}/>}
            {bChaves && <CriarChaves setModal={setBChaves} id_imovel={id_imovel}/>}
            {bPessoas && <CriarPessoa setModal={setBPessoas}/>}
        </div>
    )

}