import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

type propsDespesa = {
    titulo: string,
    descricao: string,
    valor: number,
    tipo_despesa: 0 | 1,
    recorrencia: 0 | 1 | 2 | 3,
    receitas_despesas: 0 | 1,
    vencimento: Date,
}

type TipoParametro = {
    id_imovel: number | null;
};

export function CompDespesas ( { id_imovel }: TipoParametro ) {

    const [contador_receitas, setContador_receitas] = useState(0);
    const [contador_despesas, setContador_despesas] = useState(0);
    const [ativacao, setAtivacao] = useState(false);
    const [valorBotao, setValorBotao] = useState(0)

    const navigate = useNavigate();

    const redirectCriarCotacao = () => {
        navigate('/criar-receita_despesa', { state: { id_imovel } });
    };

    const receitas: propsDespesa[][] = [
        [
            {
                titulo: "Aluguel",
                descricao: "Pagamento do aluguel do escritório",
                valor: 2500.0,
                tipo_despesa: 0,
                recorrencia: 1,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-02-05"),
            },
            {
                titulo: "Conta de Luz",
                descricao: "Energia elétrica do escritório",
                valor: 350.0,
                tipo_despesa: 0,
                recorrencia: 3,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-02-10"),
            },
            {
                titulo: "Material de Escritório",
                descricao: "Compra de papel e canetas",
                valor: 100.0,
                tipo_despesa: 1,
                recorrencia: 0,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-02-20"),
            },
            {
                titulo: "Seguro",
                descricao: "Seguro contra incêndio e danos",
                valor: 500.0,
                tipo_despesa: 1,
                recorrencia: 2,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-02-28"),
            },
        ],
        [
            
            {
                titulo: "Treinamento",
                descricao: "Workshop de desenvolvimento pessoal",
                valor: 1200.0,
                tipo_despesa: 1,
                recorrencia: 0,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-03-05"),
            },
            {
                titulo: "Assinatura de Software",
                descricao: "Licença anual de ferramentas",
                valor: 1200.0,
                tipo_despesa: 1,
                recorrencia: 2,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-12-01"),
            },
            {
                titulo: "Manutenção",
                descricao: "Conserto de equipamentos",
                valor: 500.0,
                tipo_despesa: 0,
                recorrencia: 0,
                receitas_despesas: 0, //Receitas
                vencimento: new Date("2025-03-01"),
            },
        ]
    ];

    const despesas: propsDespesa[][] = [
        [
            {
                titulo: "Internet",
                descricao: "Plano empresarial de internet",
                valor: 200.0,
                tipo_despesa: 0,
                recorrencia: 1,
                receitas_despesas: 1, //Despesas
                vencimento: new Date("2025-02-15"),
            },
            
            {
                titulo: "Limpeza",
                descricao: "Serviços de limpeza do escritório",
                valor: 300.0,
                tipo_despesa: 0,
                recorrencia: 1,
                receitas_despesas: 1, //Despesas
                vencimento: new Date("2025-02-18"),
            },
            {
                titulo: "Copa",
                descricao: "Compra de café e lanches",
                valor: 150.0,
                tipo_despesa: 1,
                recorrencia: 1,
                receitas_despesas: 1, //Despesas
                vencimento: new Date("2025-02-16"),
            },
            {
                titulo: "Marketing",
                descricao: "Campanha publicitária",
                valor: 1500.0,
                tipo_despesa: 0,
                recorrencia: 0,
                receitas_despesas: 1, //Despesas
                vencimento: new Date("2025-03-10"),
            },
            
        ],
        [
            {
                titulo: "Impostos",
                descricao: "Pagamento de taxas municipais",
                valor: 800.0,
                tipo_despesa: 0,
                recorrencia: 3,
                receitas_despesas: 1, //Despesas
                vencimento: new Date("2025-03-31"),
            },
        ],
    ];

    const statusBotao = ['Receitas e Despesas', 'Receitas', 'Despesas'];

    function nextPage () {
        if(valorBotao == 1){ 
            if (contador_receitas < receitas.length - 1)
                setContador_receitas(contador_receitas + 1);
        }
        else{
            if (contador_despesas < despesas.length - 1)
                setContador_despesas(contador_despesas + 1);
        }
    }
    
    function lastPage () {
        if(valorBotao == 1){ 
            if (contador_receitas > 0)
                setContador_receitas(contador_receitas - 1);
        }
        else{
            if (contador_despesas > 0)
                setContador_despesas(contador_despesas - 1);
        }    
    }

    return (
        <div className="w-full flex flex-col items-center justify-center pt-4">

        <div className="flex items-center justify-between w-full pb-6 pt-4 px-36">
            <div>
                <button onClick={() => {setAtivacao(!ativacao)}} className="w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                    <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{statusBotao[valorBotao]}</h6>
                    {ativacao ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                </button>
                {ativacao &&
                    <ul className="absolute translate-y-[6px] flex flex-col gap-1">
                        {statusBotao.map((status, index) => 
                            <li><button onClick={() => {setValorBotao(index); setAtivacao(!ativacao)}} className="w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{status}</button></li>
                        )}
                    </ul>
                }
            </div>
            { valorBotao != 0 &&
                <div className="flex items-center gap-32 pr-64">
                    <button onClick={lastPage}><BsArrowLeftCircle className="text-[35px]"/></button>
                    <button onClick={nextPage}><BsArrowRightCircle className="text-[35px]"/></button>
                </div>
            }
            <div>
                <button onClick={() => redirectCriarCotacao()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex items-center gap-3"><AiFillPlusCircle className="text-[20px]"/>
                    <h1 className="font-outfit font-semibold">Criar Receita ou Despesa</h1>
                </button> 
            </div>
        </div>

        {valorBotao == 0 ? 
        <div className="w-full px-36">
            <table className="border-[0.2px] border-solid border-[#414040] rounded-md shadow-md table-auto divide-y divide-[#000000] w-full mb-10">
                <thead className="w-full ">
                    <tr>
                        <th className="py-4 w-[16%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Título</th>
                        <th className="py-4 w-[26%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Descrição</th>
                        <th className="py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Despesa</th>
                        <th className="py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Tipo da Recorrência</th>
                        <th className="py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Receita ou Despesa</th>
                        <th className="py-4 w-[12%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Data de Vencimento</th>
                        <th className="py-4 w-[10%] font-extrabold text-[16px] text-[#fefefe] bg-[#63666b] border-[2px] border-solid border-[#414040]">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody className="bg-[#fefefe] divide-y divide-[#b9b8b8]">
                    {receitas.map((receita) => 
                        receita.map((item) => (
                            <tr>
                                <td className="py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.descricao}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.recorrencia == 0 ? 'Anual' : 
                                                                                                                          item.recorrencia == 1 ? 'Mensal' : 
                                                                                                                          item.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">Receita</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.vencimento.toLocaleDateString("pt-BR")}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            </tr>  
                        ))        
                    )}
                    {despesas.map((despesa) => 
                        despesa.map((item) => (
                            <tr>
                                <td className="py-[13px] font-medium text-center text-[18px] border-x-[0.4px] border-solid border-[#b9b8b8]">{item.titulo}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.descricao}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.recorrencia == 0 ? 'Anual' : 
                                                                                                                          item.recorrencia == 1 ? 'Mensal' : 
                                                                                                                          item.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">Despesa</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.vencimento.toLocaleDateString("pt-BR")}</td>
                                <td className="text-[18px] text-center border-x-[0.4px] border-solid border-[#b9b8b8]">{item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            </tr>  
                        ))        
                    )}
                </tbody>
            </table>
        </div>

        : 
        
        valorBotao == 1 ? 
        
        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-4 px-32">
            {receitas[contador_receitas].map((despesa, index) => 
                <div className="bg-[#f0f0f0d3] h-[310px] rounded-xl px-5 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 w-full">
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-[30px] font-outfit font-medium text-center">{despesa.titulo}</h1>
                        <div className="">
                            <div className="flex justify-around items-center mb-5">
                                <div className="">
                                    <h4 className="text-[14px] font-semibold">Tipo da Despesa:</h4>
                                    <h1>{despesa.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</h1>
                                </div>
                                <div className="">
                                    <h4 className="text-[14px] font-semibold">Tipo de Recorrência:</h4>
                                    <h1>{despesa.recorrencia == 0 ? 'Anual' : 
                                        despesa.recorrencia == 1 ? 'Mensal' : 
                                        despesa.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</h1>
                                </div>
                            </div>
                            <div className=" flex justify-around items-center">
                                <div className="">
                                    <h1 className="text-[14px] font-semibold">Vencimento:</h1>
                                    <h1 className="">{despesa.vencimento.toLocaleDateString("pt-BR")}</h1>
                                </div>
                                <div>
                                    <h1 className="text-[14px] font-semibold">Acontecimento:</h1>
                                    <h1 className="">Reforma</h1>
                                </div>
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
        
        : 
        
        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-4 px-32">
            {despesas[contador_despesas].map((despesa, index) => 
                <div className="bg-[#f0f0f0d3] h-[310px] rounded-xl px-5 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 w-full">
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-[30px] font-outfit font-medium text-center">{despesa.titulo}</h1>
                        <div className="">
                            <div className="flex justify-around items-center mb-5">
                                <div className="">
                                    <h4 className="text-[14px] font-semibold">Tipo da Despesa:</h4>
                                    <h1>{despesa.tipo_despesa == 0 ? 'Recorrente' : 'Pontual'}</h1>
                                </div>
                                <div className="">
                                    <h4 className="text-[14px] font-semibold">Tipo de Recorrência:</h4>
                                    <h1>{despesa.recorrencia == 0 ? 'Anual' : 
                                        despesa.recorrencia == 1 ? 'Mensal' : 
                                        despesa.recorrencia == 2 ? 'Diária' : 'Não se aplica'}</h1>
                                </div>
                            </div>
                            <div className=" flex justify-around items-center">
                                <div className="">
                                    <h1 className="text-[14px] font-semibold">Vencimento:</h1>
                                    <h1 className="">{despesa.vencimento.toLocaleDateString("pt-BR")}</h1>
                                </div>
                                <div>
                                    <h1 className="text-[14px] font-semibold">Acontecimento:</h1>
                                    <h1 className="">Reforma</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-[28px] font-serif" text->{despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                            <h1 className="text-[12px] text-slate-700">REAIS (BRL - R$)</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>}

        

        </div>
    )
}