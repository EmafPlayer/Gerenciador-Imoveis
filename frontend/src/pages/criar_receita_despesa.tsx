import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import buscarTitulos from "../apis/buscar_titulos";
import buscarAcontecimentos from "../apis/buscar_acontecimentos";
import { api } from "../apis/api";
import { GrAdd } from "react-icons/gr";
import { CriarTitulo } from "../components/criar_titulo";
import { Asteristico } from "../components/asteristico";

type userProps = {
    username: string,
};

type titulosProps = {
    descricao: string,
};

type acontecimentosProps = {
    titulo: string,
};

export function CriarReceitaDespesa () {

    const { register, handleSubmit } = useForm();

    const[modal, setModal] = useState(false);
    
    const[criacao, setCriacao] = useState(false);
    const[mensagem, setMensagem] = useState("");
    
    const[titulo_despesa, setTitulo_despesa] = useState(0);
    const[tipo_despesa, setTipo_despesa] = useState(0);
    const[tipo_recorrencia, setTipo_recorrencia] = useState(0);
    const[acontecer, setAcontecer] = useState(0);
    const[receita_despesa, setReceita_despesa] = useState(0);
    const[pago, setPago] = useState(0);
    
    const[status_titulo, setStatus_titulo] = useState(false);
    const[status_despesa, setStatus_despesa] = useState(false);
    const[status_recorrencia, setStatus_recorrencia] = useState(false);
    const[status_acontecimento, setStatus_acontecimento] = useState(false);
    const[Sreceita_despesa, setSreceita_despesa] = useState(false);
    const[Spago, setSpago] = useState(false);
    
    const [titulos_despesa, setTitulos_despesa] = useState<titulosProps[]>([]);
    const [acontecimentos, setAcontecimentos] = useState<acontecimentosProps[]>([]);
    const tipos_despesa = ["Recorrente", "Pontual"];
    const tipos_recorrencia = ["Anual", "Mensal", "Diária", "Não se aplica"];
    const tipo_dr = ["Receita", "Despesa"];
    const pagar = ["Ainda não pago", "Pago"];


    const location = useLocation();
    let id_imovel = location.state.id_imovel;

    const user: userProps = {
        username: localStorage.getItem("nome_usuario") ?? "",
    };

    useEffect(() => {
        const fetchData = async () => {
            const dataTitulos = await buscarTitulos();
            const dataAcontecimentos = await buscarAcontecimentos();
    
            console.log(dataTitulos?.titulos);
            console.log(dataAcontecimentos?.acontecimentos);
    
            // Sempre mantém "Não possui vínculo a acontecimentos" como primeiro item
            const acontecimentos = [
                { titulo: "Não possui vínculo a acontecimentos" }, 
                ...(dataAcontecimentos?.acontecimentos || [])
            ];
    
            setAcontecimentos(acontecimentos);
    
            if (dataTitulos?.titulos) {
                setTitulos_despesa(dataTitulos.titulos);
            } else {
                console.warn("Tabela não encontrada ou dados inválidos:");
            }
        };
    
        fetchData();
    }, []);
    

    const submit = async (data: any) => 
    {
        try {
            const params = new URLSearchParams({
                id_imovel: id_imovel,
                titulo: String(titulo_despesa + 1),
                receita_despesa: String(receita_despesa),
                valor: data.valor,
                descricao: data.descricao,
                tipo_despesa: String(tipo_despesa + 1),
                tipo_recorrencia: String(tipo_recorrencia + 1),
                vencimento: data.vencimento,
                id_acontecimento: String(acontecer),
                pago: String(pago),
            }).toString();
    

            const response = await api.get(`/v1/inicio/criacao-despesa?${params}`);
            
            console.log(response.data.message);

            setCriacao(true);
            setMensagem(response.data.message);
            
        } catch (error) {
            console.error(error);
        }
    }
        console.log(titulos_despesa);

    return (
        <div className="h-max w-full">
            <NavBar user={user}>
            </NavBar>
            <main className="w-full h-full pt-[115px] bg-[#FFFFFF] p-6">
                <form onSubmit={handleSubmit(submit)} className="bg-[#DEDEDE] font-bold text-[28px] shadow-md rounded-md p-8 mt-5 mb-7 lg:mb-0">
                    
                    <h1 className={twMerge('text-center font-kanit sm:text-left text-slate-800 mb-[3rem] font-medium text-[32px] lg:text-[36px] uppercase')} >Cadastro de Receitas ou Despesas</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-6">
                        
                        <div className="col-span-1 lg:col-span-3 mb-0 lg:mb-3 flex gap-2">
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Títulos das Receitas e Despesas</h4>
                                    <Asteristico/>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={(e) => {e.preventDefault(); setStatus_titulo(!status_titulo)}} value={titulo_despesa + 1} className="w-full lg:w-[600px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                        <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{titulos_despesa.length != 0 ? titulos_despesa[titulo_despesa].descricao : "Ainda não foi criado"}</h6>
                                        {status_titulo ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                                    </button>
                                    <div className="">
                                        <button onClick={(e) => {e.preventDefault(); setModal(true)}} data-toggle="tooltip" data-placement="top" title="Criar Título" className="rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center p-3"><GrAdd className="text-white text-[25px]"/></button>
                                    </div>
                                </div>
                                {status_titulo &&
                                    <ul className="relative lg:absolute translate-y-[6px]">
                                        {titulos_despesa.length != 0 && titulos_despesa.map((titulo, index) => 
                                            <li><button onClick={(e) => {e.preventDefault(); setTitulo_despesa(index); setStatus_titulo(!status_titulo)}} className="w-[88%] lg:w-[600px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{titulo.descricao}</button></li>
                                        )}
                                    </ul>}
                            </div>
                                    
                        </div>

                        <div className="col-span-1 lg:col-span-3 xl:col-span-1 mb-0 lg:mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipo (Receita ou Despesa)</h4>
                                <Asteristico/>
                            </div>
                            <button onClick={(e) => {e.preventDefault(); setSreceita_despesa(!Sreceita_despesa)}} value={receita_despesa} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipo_dr[receita_despesa]}</h6>
                                {Sreceita_despesa ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {Sreceita_despesa &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {tipo_dr.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setReceita_despesa(index); setSreceita_despesa(!Sreceita_despesa)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-1 lg:col-span-3 xl:col-span-1 mb-0 lg:mb-3">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Pago?</h4>
                                <Asteristico/>
                            </div>
                            <button onClick={(e) => {e.preventDefault(); setSpago(!Spago)}} value={pago} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{pagar[pago]}</h6>
                                {Spago ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {Spago &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {pagar.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setPago(index); setSpago(!Sreceita_despesa)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                                <label htmlFor="valor" className="text-[18px] text-slate-700 font-outfit">Valor (R$)</label>
                                <Asteristico/>
                            </div>
                            <input {...register('valor')} type="number" step='0.01' name="valor" id="valor" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')} placeholder="200.00"/>
                        </div>

                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1">
                                <label htmlFor="vencimento" className="text-[18px] text-slate-700 font-outfit">Data de Vencimento</label>
                                <Asteristico/>
                            </div>
                            <input {...register('vencimento')} type="date" name="vencimento" id="vencimento" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] py-[8px] font-normal rounded-xl border-2 px-3 transition duration-150 ease-in-out placeholder:italic placeholder:text-[17px] pb-[8px]')}/>
                        </div>

                        <div className="col-span-1 lg:col-span-5 mt-0 lg:mt-3">
                            <div className="flex items-center gap-2 mb-1">
                                <label htmlFor="descricao" className="text-[18px] text-slate-700 font-outfit">Descrição</label>
                                <Asteristico/>
                            </div>
                            <input {...register('descricao')} type="text" name="descricao" id="descricao" required
                            className={twMerge('bg-slate-50 border-slate-400 w-full text-[16px] font-normal rounded-xl border-2 pl-3 transition duration-150 ease-in-out py-[8px] placeholder:italic placeholder:text-[17px]')} placeholder="..."/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 items-center mt-6 lg:mt-14 gap-6 lg:gap-0">
                        
                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipos de Despesa e Receita</h4>
                                <Asteristico/>
                            </div>
                            <button onClick={(e) => {e.preventDefault(); setStatus_despesa(!status_despesa)}} value={tipo_despesa + 1} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipos_despesa[tipo_despesa]}</h6>
                                {status_despesa ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_despesa &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {tipos_despesa.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setTipo_despesa(index); setStatus_despesa(!status_despesa)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Tipos de Recorrência</h4>
                                <Asteristico/>
                            </div>
                            <button onClick={(e) => {e.preventDefault(); setStatus_recorrencia(!status_recorrencia)}} value={tipo_recorrencia + 1} className="w-full lg:w-[300px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{tipos_recorrencia[tipo_recorrencia]}</h6>
                                {status_recorrencia ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_recorrencia &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {tipos_recorrencia.map((tipo, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setTipo_recorrencia(index); setStatus_recorrencia(!status_recorrencia)}} className="w-full lg:w-[300px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{tipo}</button></li>
                                    )}
                                </ul>}
                        </div>

                        <div className="col-span-1 lg:col-span-2">
                            <h4 className="text-[18px] text-slate-700 font-outfit mt-2 mb-[5px]">Acontecimentos</h4>
                            <button onClick={(e) => {e.preventDefault(); setStatus_acontecimento(!status_acontecimento)}} value={acontecer} className="w-full lg:w-[350px] h-12 text-[16px] rounded-md bg-[#353941] hover:bg-[#4a4e57] active:border-2 flex justify-between items-center px-5">
                                <h6 className="text-slate-100 hover:text-[#ffffff] font-normal">{acontecimentos.length != 0 ? acontecimentos[acontecer].titulo : "Ainda não foi criado"}</h6>
                                {status_acontecimento ? <BsCaretUpFill className="text-[#ffffff]"/>  : <BsCaretDownFill className="text-[#ffffff]"/> }
                            </button>
                            {status_acontecimento &&
                                <ul className="relative lg:absolute translate-y-[6px]">
                                    {acontecimentos.length != 0 && acontecimentos.map((acontecimento, index) => 
                                        <li><button onClick={(e) => {e.preventDefault(); setAcontecer(index); setStatus_acontecimento(!status_acontecimento)}} className="w-full lg:w-[350px] h-11 text-[16px] font-normal rounded-md text-slate-100 hover:text-[#ffffff] bg-[#353941] hover:bg-[#4a4e57] active:border-2">{acontecimento.titulo}</button></li>
                                    )}
                                </ul>}
                        </div>
                    </div>

                    <div className="text-center sm:text-right mt-16">
                        <button className="text-[16px] font-normal px-16 py-3 rounded-md text-slate-100 hover:text-[#ffffff] bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6]">Cadastrar</button>
                    </div>
                    <div className="text-center sm:text-right pr-2">
                        {criacao && <h1 className="text-[#2369c5] pl-1 pt-2 text-[14px]">*{mensagem}</h1>}
                    </div>

                </form>
            </main>
            {modal && <CriarTitulo setModal={setModal}/>}
        </div>
    )
}