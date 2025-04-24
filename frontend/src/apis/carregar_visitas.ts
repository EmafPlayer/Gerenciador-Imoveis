import { api } from "./api";

const CarregarVisitas = async ( id_imovel: number | null ) => {
    try {
        const response = await api.get(`/v1/inicio/carregar-visitas/${id_imovel}`);
        if (response.status === 200) {
            return { visitas: response.data.visitas };
        }
    } catch (error) { 
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarVisitas;