import { api } from './api';

const buscarAcontecimentos = async () => {
  try {
    const response = await api.get(`/v1/inicio/ver-acontecimentos`);
    if (response.status == 200) {
      return { acontecimentos: response.data.acontecimentos };
    }
  } catch (error) {
    return { message: 'Erro ao fazer a requisição' };
  }
};

export default buscarAcontecimentos;