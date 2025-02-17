import { api } from './api';

const buscarCorretores = async () => {
  console.log(api.defaults.baseURL); // Verifique se o baseURL está correto
  
  try {
    const response = await api.get(`/v1/inicio/ver-corretores`);
    console.error(response.data);
    if (response.status == 200) {
      return { corretores_imobiliarias: response.data.corretores_imobiliarias };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarCorretores;