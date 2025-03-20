import { useEffect, useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { DetalhesImobiliaria } from "../components/popup_detalhes_imobiliria";
import { AiFillPlusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import CarregarCotacoes from "../apis/carregar_cotacoes";
import { TfiAnnouncement } from "react-icons/tfi";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";
import { Opcoes } from "../components/opcoes";

type propsCotacao = {

    nome_corretor: string,
    contato_corretor: string,
    email_corretor: string,
    valor: number,
    valor_min: number,
    valor_max: number,
    data_cotacao: Date,
    nome_fantasia: string,
    nome_oficial: string,
    email_imobiliaria: string,
    site_imobiliaria: string,
    contato_imobiliaria: string,
    rua: string,
    bairro: string,
    numero: number,
    cidade: string,
    estado: string,
    latitude: number,
    longitude: number,
    url_anuncio: string,

}


export function CompCotacoes (  ) {

    const [contador, setContador] = useState(0);
    const [statusImobiliaria, setStatusImobiliaria] = useState(false);
    const [escolhida, setEscolhida] = useState(0);
    const [cotacoes, setCotacoes] = useState<propsCotacao[][]>([]); 

    const navigate = useNavigate();

    const location = useLocation();

    const id_imovel = location.state.id_imovel;

    const isMidScreen = useMediaQuery({ query: '(min-width: 1024px)' })
    const isLowScreen = useMediaQuery({ query: '(min-width: 640px)' })

    const redirectCriarImobiliaria = () => {
        navigate('/criar-imobiliaria');
    };

    const redirectCriarCotacao = () => {
        navigate('/criar-cotacao', { state: { id_imovel } });
    };

    const redirectCriarCorretor = () => {
        navigate('/criar-corretor');
    };

    useEffect (() => {
    
        const fetchData = async () => {
          
          const dataImoveis = await CarregarCotacoes(id_imovel);
    
          console.log(dataImoveis?.cotacoes);
    
          if(dataImoveis?.cotacoes){
            setCotacoes(dataImoveis.cotacoes);
          } else {
            console.warn("Tabela não encontrada ou dados inválidos:");
          }
    
        }
    
        fetchData();
    
      }, []);

    function nextPage () {
        if (contador < cotacoes.length - 1)
            setContador(contador + 1);
    }
    
    function lastPage () {
        if (contador > 0)
            setContador(contador - 1);
    }

    console.log(cotacoes);

    return (

        <div className="h-screen w-full">
            <Opcoes stateImovel={false} stateCotacoes={true} stateDespesas={false} stateAcontecimentos={false} id_imovel={id_imovel}/>
            <div className="w-full flex flex-col items-center justify-center pt-[140px]">

                <div className="flex items-center justify-between w-full pb-8 pt-4 px-6 lg:px-20">
                    <h1 className="text-[35px] font-kanit">Cotações</h1>
                    <div className="flex items-center gap-12 lg:gap-32 lg:pl-[330px]">
                        <button onClick={lastPage}><BsArrowLeftCircle className="text-[32px] lg:text-[45px]"/></button>
                        <button onClick={nextPage}><BsArrowRightCircle className="text-[32px] lg:text-[45px]"/></button>
                    </div>
                    <ul className={twMerge("gap-4", isMidScreen ? "flex items-center" : "flex flex-col" )}>
                        <li>
                            <button data-toggle="tooltip" data-placement="top" title="Criar Imobiliária" onClick={() => redirectCriarImobiliaria()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex justify-between w-[170px] items-center gap-3 transition ease-in-out delay-100 hover:scale-110">
                                <AiFillPlusCircle className="text-[20px]"/>
                                <h1 className="font-outfit">Criar Imobiliária</h1>
                            </button> 
                        </li>
                        <li>
                            <button data-toggle="tooltip" data-placement="top" title="Criar Corretor" onClick={() => redirectCriarCorretor()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex justify-between w-[170px] items-center gap-3 transition ease-in-out delay-100 hover:scale-110">
                                <AiFillPlusCircle className="text-[20px]"/>
                                <h1 className="font-outfit">Criar Corretor</h1>
                            </button> 
                        </li>
                        <li>
                            <button data-toggle="tooltip" data-placement="top" title="Criar Cotação" onClick={() => redirectCriarCotacao()} className="bg-[#3A0C3D] hover:bg-[#711977e1] active:bg-[#711977a6] p-2 rounded-md text-[#FFFFFF] flex justify-between w-[170px] items-center gap-3 transition ease-in-out delay-100 hover:scale-110">
                                <AiFillPlusCircle className="text-[20px]"/>
                                <h1 className="font-outfit">Criar Cotação</h1>
                            </button> 
                        </li>
                    </ul>
                </div>
                
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-14 mb-4 lg:mb-0">
                    {cotacoes.length != 0 && cotacoes[contador].map((cotacao, index) => 
                        <div className="bg-[#f0f0f0d3] h-[340px] xl:h-[270px] rounded-xl px-6 py-4 border-2 border-[#c7c7c7] shadow-md col-span-1 flex flex-col justify-between">
                            <div className={twMerge("w-full", isMidScreen ? 'flex justify-between' : 'flex flex-col')}>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3">
                                        
                                        <h1 data-toggle="tooltip" data-placement="top" title={cotacao.nome_corretor} className="text-[40px] font-outfit">{cotacao.nome_corretor.length > 20 ? cotacao.nome_corretor.slice(0, 20) + "..." : cotacao.nome_corretor}</h1>
                                        
                                        <button className="transition ease-in-out delay-100 hover:scale-110"><a href={`mailto:${cotacao.email_corretor}`} target="_blank" className="flex items-center gap-2 px-2 py-[6px] ease-in-out duration-300 text-[40px] bg-opacity-15  text-[#568692] rounded-xl">
                                            <MdOutlineEmail/>
                                        </a></button>

                                        {cotacao.url_anuncio && <button className="transition ease-in-out delay-100 hover:scale-110"><a href={cotacao.url_anuncio} target="_blank" className="flex items-center gap-2 px-2 py-[6px] ease-in-out duration-300 text-[30px] bg-opacity-15  text-[#568692] rounded-xl">
                                            <TfiAnnouncement />
                                        </a></button>}
                                    </div>
                                    <div className="flex flex-col items-start  gap-1">
                                        <h1 className="text-[25px] font-outfit">{cotacao.nome_fantasia}</h1>
                                        <div className="flex items-center  gap-3">
                                            <h1 className="text-[15px] font-outfit">({cotacao.nome_oficial})</h1>
                                            <button onClick={() => {setStatusImobiliaria(true); setEscolhida(index)}} className="text-[25px] transition ease-in-out delay-100 hover:scale-125"><FcDepartment/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 pt-3">
                                    <h1 className={"text-[20px] font-outfit text-end"}>Contato: {cotacao.contato_corretor}</h1>
                                    <h1 className="text-[17px] font-kanit text-end">{new Date(cotacao.data_cotacao).toLocaleDateString("pt-BR")}</h1>
                                </div>
                            </div>
                            <div className="flex items-center justify-around pb-3 w-full">
                                <div className="flex flex-col">
                                    <h1 className="text-[28px] lg:text-[35px] font-serif" text->{cotacao.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                    <h1 className="text-[15px] lg:text-[18px] text-slate-700">REAIS (BRL - R$)</h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[28px] lg:text-[35px] font-serif" text->{cotacao.valor_min.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                    <h1 className="text-[15px] lg:text-[18px] text-slate-700">Valor (min)</h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-[28px] lg:text-[35px] font-serif" text->{cotacao.valor_max.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
                                    <h1 className="text-[15px] lg:text-[18px] text-slate-700">Valor (max)</h1>
                                </div>
                            </div>

                        </div>
                    )}
                </div>


                {statusImobiliaria && <DetalhesImobiliaria 
                    setModal={setStatusImobiliaria}
                    imobiliaria={{
                        nome_fantasia: cotacoes[contador][escolhida].nome_fantasia,
                        nome_oficial: cotacoes[contador][escolhida].nome_oficial,
                        rua: cotacoes[contador][escolhida].rua,
                        bairro: cotacoes[contador][escolhida].bairro,
                        numero: cotacoes[contador][escolhida].numero,
                        cidade: cotacoes[contador][escolhida].cidade,
                        estado: cotacoes[contador][escolhida].estado,
                        latitude: cotacoes[contador][escolhida].latitude,
                        longitude: cotacoes[contador][escolhida].longitude,
                        email_imobiliaria: cotacoes[contador][escolhida].email_imobiliaria,
                        site_imobiliaria: cotacoes[contador][escolhida].site_imobiliaria,
                        contato_imobiliaria: cotacoes[contador][escolhida].contato_imobiliaria,
                    }}/>
                }
            </div>
        </div>
    )

}