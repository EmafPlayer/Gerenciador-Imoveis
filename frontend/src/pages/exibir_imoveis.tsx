import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { CompImovel } from "../components/comp_imovel";
import { CompCotacoes } from "../components/comp_cotacoes";
import { CompDespesas } from "../components/comp_despesas";
import { CompAcontecimentos } from "../components/comp_acontecimentos";

type TipoParametro = {
    id_imovel: number | null;
};

type userProps = {
    nome: string,
    foto: string,
}

export function ExibirImoveis ( { id_imovel }: TipoParametro ) {
    
    const [stateImovel, setStateImovel] = useState(true);
    const [stateCotacoes, setStateCotacoes] = useState(false);
    const [stateDespesas, setStateDespesas] = useState(false);
    const [stateAcontecimentos, setStateAcontecimentos] = useState(false);

    const user: userProps = {
        nome: localStorage.getItem("nome_usuario") ?? "",
        foto: localStorage.getItem("foto_usuario") ?? ""
    };

    function botaoImovel () {
        setStateImovel(true);
        setStateCotacoes(false);
        setStateDespesas(false);
        setStateAcontecimentos(false);
    }

    function botaoCotacoes () {
        setStateImovel(false);
        setStateCotacoes(true);
        setStateDespesas(false);
        setStateAcontecimentos(false);
    }

    function botaoDespesas () {
        setStateImovel(false);
        setStateCotacoes(false);
        setStateDespesas(true);
        setStateAcontecimentos(false);
    }

    function botaoAcontecimentos () {
        setStateImovel(false);
        setStateCotacoes(false);
        setStateDespesas(false);
        setStateAcontecimentos(true);
    }

    return (
        <div className="h-screen w-full">
            <NavBar user={user}/>
            <body className="h-full w-full bg-[#FFFFFF] pt-[105px]">
            
            <ul className="flex items-center justify-around pt-10">
                <li><button onClick={() => botaoImovel()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateImovel ? 'border-b-[#FF5500]' : '' )}>Imóveis</button></li>
                <li><button onClick={() => botaoCotacoes()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateCotacoes ? 'border-b-[#FF5500]' : '' )}>Cotações</button></li>
                <li><button onClick={() => botaoDespesas()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateDespesas ? 'border-b-[#FF5500]' : '' )}>Receitas e Despesas</button></li>
                <li><button onClick={() => botaoAcontecimentos()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateAcontecimentos ? 'border-b-[#FF5500]' : '' )}>Acontecimentos</button></li>
            </ul>

            {stateImovel && <CompImovel id_imovel={id_imovel}/>}

            {stateCotacoes && <CompCotacoes id_imovel={id_imovel}/>}

            {stateDespesas && <CompDespesas id_imovel={id_imovel}/>}

            {stateAcontecimentos && <CompAcontecimentos id_imovel={id_imovel}/>}
                
            </body>




        </div>
    )


}