import { useLocation } from "react-router-dom";
import { NavBar } from "../components/nav_bar";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { CompImovel } from "../components/comp_imovel";
import { CompCotacoes } from "../components/comp_cotacoes";
import { CompDespesas } from "../components/comp_despesas";


export function ExibirImoveis () {
    
    const [stateImovel, setStateImovel] = useState(true);
    const [stateCotacoes, setStateCotacoes] = useState(false);
    const [stateDespesas, setStateDespesas] = useState(false);
    const [stateAcontecimentos, setStateAcontecimentos] = useState(false);

    const imovel = [
        {
            id: 1,
            nome: "Casa de Tiago",
            endereco: "Av. Beberibe, Porto da madeira, 3530",
            foto: "Casa1.jpg",
            latitude: -8.00285832655661,
            longitude: -34.90021374951911,
            valor: 300000.00,
            descricao: "Este incrível apartamento de 3 quartos, localizado no coração da cidade, combina conforto, praticidade e estilo. Com 120m² de área privativa, o imóvel oferece uma ampla sala de estar integrada com varanda, perfeita para momentos de lazer e convívio. ",
        }
    ];

    const location = useLocation();
    
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
    
    let user = location.state.user;

    return (
        <div className="h-screen w-full">
            <NavBar user={user}/>
            <body className="h-full w-full bg-[#FFFFFF] pt-[105px]">
            
            <ul className="flex items-center justify-around pt-10">
                <li><button onClick={() => botaoImovel()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateImovel ? 'border-b-[#FF5500]' : '' )}>Imóveis</button></li>
                <li><button onClick={() => botaoCotacoes()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateCotacoes ? 'border-b-[#FF5500]' : '' )}>Cotações</button></li>
                <li><button onClick={() => botaoDespesas()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateDespesas ? 'border-b-[#FF5500]' : '' )}>Despesas</button></li>
                <li><button onClick={() => botaoAcontecimentos()} className={twMerge('hover:border hover:border-b-4 px-40 py-2 border border-b-4', stateAcontecimentos ? 'border-b-[#FF5500]' : '' )}>Acontecimentos</button></li>
            </ul>

            {stateImovel && <CompImovel/>}

            {stateCotacoes && <CompCotacoes/>}

            {stateDespesas && <CompDespesas/>}
                
            </body>




        </div>
    )


}