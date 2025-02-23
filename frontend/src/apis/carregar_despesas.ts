import { api } from "./api";


const carregarDespesas = async ( id_imovel: number | null) => {

    try{

        const response = await api.get(`/v1/inicio/carregar-despesas/${id_imovel}`)
        console.error(response.data);

        if(response.status == 200){
            return { receitas: response.data.receitas, despesas: response.data.despesas }
        }

    } catch(error){

        console.error(error);
        return { message: 'Erro ao fazer a requisição' };

    }

}

export default carregarDespesas;