import { useEffect, useState } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { FcKey } from "react-icons/fc"
import { MdClose } from "react-icons/md"
import { CriarPessoa } from "./popup_criar_pessoa"
import { CriarChaves } from "./popup_criar_chaves"
import CarregarChaves from "../apis/carregar_pessoas_imovel"

type props = {
    setModal: Function,
    id_imovel: number | null
}

type pessoasProps = {
    nome_completo: string,
    contato: string,
}

export function CompChaves ( { setModal, id_imovel }: props ) {

    const [bChaves, setBChaves] = useState(false);
    const [bPessoas, setBPessoas] = useState(false);

    const[pessoas, setPessoas] = useState<pessoasProps[]>([]);

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

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 h-screen w-full">
            <div className="bg-white p-12 w-[35rem] lg:w-[45rem]">
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
                        <div className="bg-[#bd4307] h-20 flex items-center py-2 gap-x-4 px-6 rounded-lg shadow-md col-span-1">
                            <div className="border-r-2 h-full flex items-center pr-5">
                                <FcKey className="text-[40px]"/>
                            </div>
                            <div className="pl-3">
                                <div className="text-[18px] text-white">{pessoa.nome_completo}</div>
                                <div className="text-[14px] text-white text-opacity-90">{pessoa.contato}</div>
                            </div>
                        </div> 
                    )}
                </div>
                
            </div>
            {bPessoas && <CriarPessoa setModal={setBPessoas}/>}
            {bChaves && <CriarChaves setModal={setBChaves} id_imovel={id_imovel}/>}
        </div>
    )

}