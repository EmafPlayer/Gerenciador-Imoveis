import { MdClose } from "react-icons/md";

type propsDetalhesImovel = {
    setModal: Function,
    data: {
        fornecimento_agua: string,
        fornecimento_luz: string,
        cadastro_iptu: string,
        matricula: string,
        cartorio_registro: string,
        area: number,
        area_testada: number,
        fracao_ideal: number,
        area_total: number,
        area_construida: number,
    }
}

export function DetalhesImovel ( { setModal, data }: propsDetalhesImovel)  {

    return (
        <div className="fixed inset-0 h-screen w-full z-10 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-14 w-[35rem] lg:w-[40rem]">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold">Detalhes do Imóvel</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>
                <div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Fornecimento de Água:</h4>
                        <h2 className="">{data.fornecimento_agua}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Fornecimento de Luz:</h4>
                        <h2 className="">{data.fornecimento_luz}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Cadastro do IPTU:</h4>
                        <h2 className="">{data.cadastro_iptu}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Matrícula:</h4>
                        <h2 className="">{data.matricula}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Registro do Cartório:</h4>
                        <h2 className="">{data.cartorio_registro}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Área:</h4>
                        <h2 className="">{data.area} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Área Testada:</h4>
                        <h2 className="">{data.area_testada} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Fração Ideal:</h4>
                        <h2 className="">{data.fracao_ideal}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Área Total:</h4>
                        <h2 className="">{data.area_total} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[18px] font-semibold">Área Construída:</h4>
                        <h2 className="">{data.area_construida} m²</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}