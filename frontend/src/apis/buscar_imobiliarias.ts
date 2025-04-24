import { api } from './api';

const buscarImobiliarias = async () => {
  try {
    const response = await api.get(`/v1/inicio/ver-imobiliarias`);
    if (response.status == 200) {
      return { imobiliarias: response.data.imobiliarias };
    }
  } catch (error) {
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarImobiliarias;