import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";

type propsCotacao = {
    nome_corretor: string,
    contato_corretor: string,
    email_corretor: string,
    nome_fantasia_imobiliaria: string,
    nome_oficial_imobiliaria: string,
    valor: number,
    valor_min: number,
    valor_max: number,
    data_cotacao: Date
}

export function CompCotacoes () {

    const [contador, setContador] = useState(0);

    const cotacoes: propsCotacao[][] = [
        [
            {
                nome_corretor: "Ana Beatriz Oliveira",
                contato_corretor: "(31) 99988-7766",
                email_corretor: "ana.oliveira@exemplo.com",
                nome_fantasia_imobiliaria: "Prime Imóveis",
                nome_oficial_imobiliaria: "Prime Consultoria Imobiliária S.A.",
                valor: 630000.0,
                valor_min: 610000.0,
                valor_max: 650000.0,
                data_cotacao: new Date("2025-04-10"),
            },
            {
                nome_corretor: "Pedro Henrique Souza",
                contato_corretor: "(47) 91234-5678",
                email_corretor: "pedro.souza@exemplo.com",
                nome_fantasia_imobiliaria: "Habitar Bem",
                nome_oficial_imobiliaria: "Habitar Bem Empreendimentos Ltda.",
                valor: 290000.0,
                valor_min: 270000.0,
                valor_max: 310000.0,
                data_cotacao: new Date("2025-05-20"),
            },
            {
                nome_corretor: "Carla Regina Costa",
                contato_corretor: "(62) 93456-7890",
                email_corretor: "carla.costa@exemplo.com",
                nome_fantasia_imobiliaria: "Vila Real Imóveis",
                nome_oficial_imobiliaria: "Vila Real Consultoria Ltda.",
                valor: 480000.0,
                valor_min: 450000.0,
                valor_max: 500000.0,
                data_cotacao: new Date("2025-06-12"),
            },
            {
                nome_corretor: "Carlos Eduardo Ferreira",
                contato_corretor: "(31) 99876-5432",
                email_corretor: "carlos.ferreira@exemplo.com",
                nome_fantasia_imobiliaria: "Imóveis Ideal",
                nome_oficial_imobiliaria: "Ideal Imóveis Ltda.",
                valor: 375000.0,
                valor_min: 350000.0,
                valor_max: 400000.0,
                data_cotacao: new Date("2025-03-01"),
            },
        ],
        [
            {
                nome_corretor: "Lucas Matheus Ferreira",
                contato_corretor: "(19) 98765-4321",
                email_corretor: "lucas.ferreira@exemplo.com",
                nome_fantasia_imobiliaria: "Residencial Alpha",
                nome_oficial_imobiliaria: "Alpha Residencial Ltda.",
                valor: 750000.0,
                valor_min: 730000.0,
                valor_max: 780000.0,
                data_cotacao: new Date("2025-07-15"),
            },
            {
                nome_corretor: "Fernanda Gomes Almeida",
                contato_corretor: "(41) 99876-1234",
                email_corretor: "fernanda.almeida@exemplo.com",
                nome_fantasia_imobiliaria: "Casa Firme",
                nome_oficial_imobiliaria: "Casa Firme Empreendimentos Imobiliários Ltda.",
                valor: 360000.0,
                valor_min: 340000.0,
                valor_max: 380000.0,
                data_cotacao: new Date("2025-08-25"),
            },
        ],
    ];
    

    function nextPage () {
        if (contador < cotacoes.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center pt-8">

        <div className="flex items-center justify-around w-full pb-8 pt-4">
            <h1 className="text-[35px] font-kanit">Cotações</h1>
            <div className="flex items-center gap-32 pr-28">
                <button onClick={lastPage}><BsArrowLeftCircle className="text-[45px]"/></button>
                <button onClick={nextPage}><BsArrowRightCircle className="text-[45px]"/></button>
            </div>
            <div>
                {/* onClick={() => redirectCriarImoveis(user[0])} */}<button className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF]"><GrAdd/></button>
            </div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-10 px-14">
            {cotacoes[contador].map((cotacao, index) => 
                <div className="bg-[#f0f0f0d3] h-[270px] rounded-3xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <h1 className="text-[40px] font-outfit">{cotacao.nome_corretor} </h1>
                                <a href={`mailto:${cotacao.email_corretor}`} target="_blank" className="flex items-center gap-2 px-2 py-[6px] ease-in-out duration-300 text-[40px] bg-opacity-15  text-[#568692] rounded-xl">
                                    <MdOutlineEmail/>
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-[25px] font-outfit">{cotacao.nome_fantasia_imobiliaria}</h1>
                                <h1 className="text-[18px] font-outfit">({cotacao.nome_oficial_imobiliaria})</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[20px] font-outfit">Contato: {cotacao.contato_corretor}</h1>
                            <h1 className="text-[17px] font-kanit text-end">{cotacao.data_cotacao.toLocaleDateString("pt-BR")}</h1>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-around pb-3">
                            <div className="flex flex-col">
                                <h1 className="text-[40px] font-serif" text->{cotacao.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                <h1 className="text-[18px] text-slate-700">REAIS (BRL - R$)</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[40px] font-serif" text->{cotacao.valor_min.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                <h1 className="text-[18px] text-slate-700">Valor (min)</h1>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[40px] font-serif" text->{cotacao.valor_max.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                                <h1 className="text-[18px] text-slate-700">Valor (max)</h1>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>


        </div>
    )
}