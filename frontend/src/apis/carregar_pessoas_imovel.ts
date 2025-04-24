import { api } from "./api";

const CarregarChaves = async ( id_imovel: number | null ) => {
    try {
        const response = await api.get(`/v1/inicio/carregar-chaves/${id_imovel}`);
        if (response.status === 200) {
            return { pessoas: response.data.pessoas };
        }
    } catch (error) { 
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarChaves;