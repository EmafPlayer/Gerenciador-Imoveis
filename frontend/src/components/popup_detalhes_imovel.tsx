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
        <div className="fixed inset-0 h-screen w-full z-30 bg-gray-500 bg-opacity-75 flex items-center justify-center py-6 sm:py-12 px-3 sm:px-0">
            <div className="bg-white px-10 sm:px-14 py-6 sm:py-14 h-full w-[35rem] lg:w-[40rem] rounded-lg">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h1 className=" text-3xl sm:text-4xl font-bold">Detalhes do Imóvel</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>
                <div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Fornecimento de Água:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.fornecimento_agua}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Fornecimento de Luz:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.fornecimento_luz}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Cadastro do IPTU:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.cadastro_iptu}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Matrícula:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.matricula}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Registro do Cartório:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.cartorio_registro}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Área:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.area} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Área Testada:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.area_testada} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Fração Ideal:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.fracao_ideal}</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Área Total:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.area_total} m²</h2>
                    </div>
                    <div className="mb-3">
                        <h4 className="text-[15px] sm:text-[18px] font-semibold">Área Construída:</h4>
                        <h2 className="text-[13px] sm:text-[16px]">{data.area_construida} m²</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}