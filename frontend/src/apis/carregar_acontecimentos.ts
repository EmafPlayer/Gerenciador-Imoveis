import { api } from "./api";


const carregarAcontecimentos = async ( id_imovel: number | null ) => {

    try{

        const response = await api.get(`/v1/inicio/carregar-acontecimentos/${id_imovel}`);

        if(response.status){
            return { acontecimentos: response.data.acontecimentos }
        }
            
    }catch (error) {

        return { message: 'Erro ao fazer a requisição' };

    }

}

export default carregarAcontecimentos;