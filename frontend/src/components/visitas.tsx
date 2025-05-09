import { useEffect, useState } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { MdClose } from "react-icons/md"
import { CriarVisitas } from "./criar_visitas"
import CarregarVisitas from "../apis/carregar_visitas"
import { useMediaQuery } from "react-responsive"

type props = {
    setModal: Function,
    id_imovel: number | null
}

type returnVisitas = {
    nome_imovel: string,
    nome_corretor: string,
    data_visita: Date,
    proposta: number,
    valor_proposta: number,
    data_proposta: Date,
    descricao: string,
}

export function Visitas ( {setModal, id_imovel}: props ) {

    const [bVisitas, setBVisitas] = useState(false);

    const [visitas, setVisitas] = useState<returnVisitas[]>([]);

    const rule = localStorage.getItem("rule_user")

    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })
    
    useEffect(() => {
        const fetchData = async () => {

            const dataPessoas = await CarregarVisitas(id_imovel);

            if (dataPessoas?.visitas) {
                setVisitas(dataPessoas.visitas);
            }

        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-500 w-full h-screen fixed inset-0 z-30 flex items-center justify-center bg-opacity-75 px-6 sm:px-0 py-6 sm:py-0">
            <div className="bg-white w-full sm:w-[1235px] h-[700px] px-6 sm:px-12 py-6 sm:py-12 rounded-lg">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-[45px] font-bold">Visitas</h1>
                    <div className="flex items-center gap-3">
                        { rule == "admin" && <button onClick={() => setBVisitas(true)} className="text-white text-[20px] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] px-3 sm:px-4 py-2 sm:py-[8px] rounded-md flex items-center sm:gap-3"><AiFillPlusCircle /><h1 className="text-[18px]">{isLowScreen && "Visitas"}</h1></button>}
                        <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-3 rounded-md ml-6"><MdClose /></button>
                    </div>
                </div>
                {visitas.length != 0 && 
                    <div className="w-full h-[500px] overflow-x-auto overflow-y-auto">
                        <table className="border-[0.2px] border-solid border-[#414040] rounded-md shadow-md table-auto divide-y divide-[#000000] w-[1200px] sm:w-[1800px] mb-4 mr-4">
                            
                            <tr>
                                <th className="px-2 py-4 w-[15%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Nome do Imóvel</th>
                                <th className="px-2 py-4 w-[15%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Nome do Corretor</th>
                                <th className="px-2 py-4 w-[20%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Descricao</th>
                                <th className="px-2 py-4 w-[12.5%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Data da Visita</th>
                                <th className="px-2 py-4 w-[12.5%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Houve Proposta?</th>
                                <th className="px-2 py-4 w-[12.5%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Valor da Proposta</th>
                                <th className="px-2 py-4 w-[12.5%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Data da Proposta</th>
                            </tr>
                            
                            {visitas.map((visita) =>
                                
                                <tr>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.nome_imovel}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.nome_corretor}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.descricao}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{new Date (visita.data_visita).toLocaleDateString("pt-BR")}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.proposta === 1 ? 'Sim' : 'Não'}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.valor_proposta ? visita.valor_proposta.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}) : '-'}</td>
                                    <td className="px-2 py-2 text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{visita.data_proposta ? new Date (visita.data_proposta).toLocaleDateString("pt-BR") : '-'}</td>
                                </tr>

                            )}
                        </table>
                    </div>
                }
            </div>
            {bVisitas && <CriarVisitas setModal={setBVisitas} id_imovel={id_imovel}/>}
        </div>
    )
}