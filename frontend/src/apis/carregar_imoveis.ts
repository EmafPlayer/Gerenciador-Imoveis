import { api } from "./api";

const CarregarImoveis = async () => {
    try {
        const response = await api.get(`/v1/inicio/carregar-imoveis`);
        if (response.status === 200) {
            return { imoveis: response.data.imoveis };
        }
    } catch (error) { 
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarImoveis;