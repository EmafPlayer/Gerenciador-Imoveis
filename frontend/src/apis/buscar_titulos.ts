import { api } from './api';

const buscarTitulos = async () => {
  try {
    const response = await api.get(`/v1/inicio/ver-titulos`);
    console.error(response.data);
    if (response.status == 200) {
      return { titulos: response.data.titulos };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarTitulos;