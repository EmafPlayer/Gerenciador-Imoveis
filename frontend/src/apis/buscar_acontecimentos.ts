import { api } from './api';

const buscarAcontecimentos = async () => {
  try {
    const response = await api.get(`/v1/inicio/ver-acontecimentos`);
    console.error(response.data);
    if (response.status == 200) {
      return { acontecimentos: response.data.acontecimentos };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarAcontecimentos;