import { api } from './api';

const buscarCorretores = async () => {
  try {
    const response = await api.get(`/v1/inicio/ver-corretores`);
    if (response.status == 200) {
      return { corretores_imobiliarias: response.data.corretores_imobiliarias };
    }
  } catch (error) {
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarCorretores;