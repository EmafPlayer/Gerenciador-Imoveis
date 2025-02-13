import { api } from './api';

const buscarImobiliarias = async () => {
  console.log(api.defaults.baseURL); // Verifique se o baseURL está correto
  
  try {
    const response = await api.get(`/v1/inicio/ver-imobiliarias`);
    console.error(response.data);
    if (response.status == 200) {
      return { imobiliarias: response.data.imobiliarias };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarImobiliarias;