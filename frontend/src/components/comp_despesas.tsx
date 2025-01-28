import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs"
import { GrAdd } from "react-icons/gr"

type propsDespesa = {
    titulo: string,
    descricao: string,
    valor: number,
    tipo_despesa: number,
    recorrencia: number,
    vencimento: Date,
}

export function CompDespesas () {

    const [contador, setContador] = useState(0);
    
    const despesas: propsDespesa[][] = [
        [
            {
                titulo: "Aluguel",
                descricao: "Pagamento do aluguel do escritório",
                valor: 2500.0,
                tipo_despesa: 0,
                recorrencia: 1,
                vencimento: new Date("2025-02-05"),
            },
            {
                titulo: "Conta de Luz",
                descricao: "Energia elétrica do escritório",
                valor: 350.0,
                tipo_despesa: 0,
                recorrencia: 4,
                vencimento: new Date("2025-02-10"),
            },
            {
                titulo: "Internet",
                descricao: "Plano empresarial de internet",
                valor: 200.0,
                tipo_despesa: 0,
                recorrencia: 1,
                vencimento: new Date("2025-02-15"),
            },
            {
                titulo: "Material de Escritório",
                descricao: "Compra de papel e canetas",
                valor: 100.0,
                tipo_despesa: 1,
                recorrencia: 0,
                vencimento: new Date("2025-02-20"),
            },
            {
                titulo: "Seguro",
                descricao: "Seguro contra incêndio e danos",
                valor: 500.0,
                tipo_despesa: 1,
                recorrencia: 2,
                vencimento: new Date("2025-02-28"),
            },
            {
                titulo: "Limpeza",
                descricao: "Serviços de limpeza do escritório",
                valor: 300.0,
                tipo_despesa: 0,
                recorrencia: 1,
                vencimento: new Date("2025-02-18"),
            },
            {
                titulo: "Copa",
                descricao: "Compra de café e lanches",
                valor: 150.0,
                tipo_despesa: 1,
                recorrencia: 1,
                vencimento: new Date("2025-02-16"),
            },
            {
                titulo: "Treinamento",
                descricao: "Workshop de desenvolvimento pessoal",
                valor: 1200.0,
                tipo_despesa: 1,
                recorrencia: 0,
                vencimento: new Date("2025-03-05"),
            },
        ],
        [
            {
                titulo: "Manutenção",
                descricao: "Conserto de equipamentos",
                valor: 500.0,
                tipo_despesa: 0,
                recorrencia: 0,
                vencimento: new Date("2025-03-01"),
            },
            {
                titulo: "Marketing",
                descricao: "Campanha publicitária",
                valor: 1500.0,
                tipo_despesa: 0,
                recorrencia: 0,
                vencimento: new Date("2025-03-10"),
            },
            {
                titulo: "Assinatura de Software",
                descricao: "Licença anual de ferramentas",
                valor: 1200.0,
                tipo_despesa: 1,
                recorrencia: 2,
                vencimento: new Date("2025-12-01"),
            },
            {
                titulo: "Impostos",
                descricao: "Pagamento de taxas municipais",
                valor: 800.0,
                tipo_despesa: 0,
                recorrencia: 3,
                vencimento: new Date("2025-03-31"),
            },
        ],
    ];

    function nextPage () {
        if (contador < despesas.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center pt-4">

        <div className="flex items-center justify-around w-full pb-6 pt-4">
            <h1 className="text-[35px] font-kanit">Despesas</h1>
            <div className="flex items-center gap-32 pr-28">
                <button onClick={lastPage}><BsArrowLeftCircle className="text-[35px]"/></button>
                <button onClick={nextPage}><BsArrowRightCircle className="text-[35px]"/></button>
            </div>
            <div>
                {/* onClick={() => redirectCriarImoveis(user[0])} */}<button className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-3 rounded-md text-[#FFFFFF]"><GrAdd/></button>
            </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-4 px-32">
            {despesas[contador].map((despesa, index) => 
                <div className="bg-[#f0f0f0d3] h-[310px] rounded-3xl px-5 py-3 border-2 border-[#c7c7c7] shadow-md col-span-1 w-full">
                    <div className="flex flex-col justify-between h-full">
                        <div className="">
                            <h1 className="text-[28px] font-outfit text-center mb-4">{despesa.titulo}</h1>
                            <div className="mb-2">
                                <h4 className="text-[14px] font-semibold">Tipo da Despesa:</h4>
                                <h1>{despesa.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</h1>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-[14px] font-semibold">Tipo de Recorrência:</h4>
                                <h1>{despesa.recorrencia == 0 ? 'Anual' : 
                                     despesa.recorrencia == 1 ? 'Mensal' : 
                                     despesa.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</h1>
                            </div>
                            <div className="">
                                <h1 className="text-[14px] font-semibold">Vencimento:</h1>
                                <h1 className="">{despesa.vencimento.toLocaleDateString("pt-BR")}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-[28px] font-serif" text->{despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                            <h1 className="text-[12px] text-slate-700">REAIS (BRL - R$)</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>

        </div>
    )
}