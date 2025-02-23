import { api } from "./api";

const carregarImovel =  async( id_imovel: number | null ) => {
    
    try {

        const response = await api.get(`http://127.0.0.1:8000/api/v1/inicio/ver-imovel/${id_imovel}`)
        console.error(response?.data);  

        if(response.status == 200){
            return { imovel: response.data.imovel }
        }

    } catch (error){

        console.error(error);
        return { message: 'Erro ao fazer a requisição' };

    }

}

export default carregarImovel