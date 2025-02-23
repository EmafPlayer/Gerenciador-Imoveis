import { api } from "./api";

const CarregarCotacoes = async ( id_imovel: number | null) => {
    try {
        const response = await api.get(`/v1/inicio/carregar-cotacoes/${id_imovel}`);
        console.error(response.data);
        if (response.status === 200) {
            return { cotacoes: response.data.cotacoes };
        }
    } catch (error) { 
        console.error(error);
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarCotacoes;