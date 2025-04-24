import { api } from "./api";

const CarregarPessoas = async ( ) => {
    try {
        const response = await api.get(`/v1/inicio/carregar-pessoas`);
        if (response.status === 200) {
            return { pessoas: response.data.pessoas };
        }
    } catch (error) { 
        return { message: 'Erro ao fazer a requisição' };
    }
}

export default CarregarPessoas;