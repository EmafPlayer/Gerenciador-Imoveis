import { api } from "./api";


const carregarDespesas = async ( id_imovel: number | null) => {

    try{

        const response = await api.get(`/v1/inicio/carregar-despesas/${id_imovel}`)

        if(response.status == 200){
            return { receitas: response.data.receitas, despesas: response.data.despesas, receitas_despesas: response.data.receitas_despesas }
        }

    } catch(error){

        return { message: 'Erro ao fazer a requisição' };

    }

}

export default carregarDespesas;