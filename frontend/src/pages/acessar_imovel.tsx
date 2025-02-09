import { useParams } from "react-router-dom";
import { ExibirImoveis } from "./exibir_imoveis";

export function AcessarImovel() {

    const { id_imovel } = useParams();

    return (
        <ExibirImoveis id_imovel={id_imovel ? Number.parseInt(id_imovel,10) : null}/>
    )
}
