import { twMerge } from "tailwind-merge";
import { NavBar } from "./nav_bar";
import { useNavigate } from "react-router-dom";

type userProps = {
    username: string,
}

type PropsParam = {
    stateImovel: boolean,
    stateCotacoes: boolean,
    stateDespesas: boolean,
    stateAcontecimentos: boolean,
    id_imovel: number,
}

export function Opcoes ( props:PropsParam ) {
  
    const user: userProps = {
        username: localStorage.getItem("nome_usuario") ?? "",
    };

    const navigate = useNavigate();
    
    const botaoImovel = () =>{
        navigate(`/exibir-imovel`, { state: {id_imovel: props.id_imovel} });
    }

    const botaoCotacoes = () =>{
        navigate(`/exibir-imovel/cotacoes`, { state: {id_imovel: props.id_imovel} });
    }  

    const botaoDespesas = () =>{
        navigate(`/exibir-imovel/receitas-despesas`, { state: {id_imovel: props.id_imovel} });
    }
    
    const botaoAcontecimentos = () =>{
        navigate(`/exibir-imovel/acontecimentos`, { state: {id_imovel: props.id_imovel} });
    }



    return (
        <div>
            <NavBar user={user}/>
                        
            <div className="h-full w-full bg-[#FFFFFF] pt-[95px]">
                <ul className="w-full bg-[#FFFFFF] fixed flex items-center justify-around pt-10 pb-3 overflow-x-scroll gap-6 lg:gap-0 px-4 lg:px-0">
                    <li><button onClick={() => botaoImovel()} className={twMerge('hover:border hover:border-b-4 px-32 lg:px-40 py-2 border border-b-4 sm:text-[17px]', props.stateImovel ? 'border-b-[#FF5500]' : '' )}>Imóveis</button></li>
                    <li><button onClick={() => botaoCotacoes()} className={twMerge('hover:border hover:border-b-4 px-32 lg:px-40 py-2 border border-b-4 sm:text-[17px]', props.stateCotacoes ? 'border-b-[#FF5500]' : '' )}>Cotações</button></li>
                    <li><button onClick={() => botaoDespesas()} className={twMerge('hover:border hover:border-b-4 px-32 lg:px-40 py-2 border border-b-4 sm:text-[17px] text-nowrap', props.stateDespesas ? 'border-b-[#FF5500]' : '' )}>Receitas e Despesas</button></li>
                    <li><button onClick={() => botaoAcontecimentos()} className={twMerge('hover:border hover:border-b-4 px-32 lg:px-40 py-2 border border-b-4 sm:text-[17px]', props.stateAcontecimentos ? 'border-b-[#FF5500]' : '' )}>Acontecimentos</button></li>
                </ul>
            </div>
        </div>
    )
}