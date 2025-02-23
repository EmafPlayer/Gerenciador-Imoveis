import { api } from "./api";

const CarregarImoveis = async () => {
    try {
        const response = await api.get(`/v1/inicio/carregar-imoveis`);
        console.error(response.data);
        if (response.status === 200) {
            return { imoveis: response.data.imoveis };
        }
    } catch (error) { 
        console.error(error);
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarImoveis;