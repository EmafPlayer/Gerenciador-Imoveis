import { api } from "./api";

const carregarImovel =  async( id_imovel: number | null ) => {
    
    try {

        const response = await api.get(`v1/inicio/ver-imovel/${id_imovel}`)

        if(response.status == 200){
            return { imovel: response.data.imovel }
        }

    } catch (error){

        return { message: 'Erro ao fazer a requisição' };

    }

}

export default carregarImovel