import { toast } from 'react-toastify';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DETALHADOR_CHAMADOS_URL,
});

export interface IProblemCategory {
  id: number;
  active: boolean;
  description: string;
  updated_at: Date;
  name: string;
}

interface IGetProblemCategoryResponse {
  data: IProblemCategory[];
}

interface ICreateProblemCategoryData {
  name: string;
  description: string;
}

export const getProblemCategories = async (callback?: () => void) => {
  try {
    const { data } = await api.get<IGetProblemCategoryResponse>('/categoria');
    callback && callback();

    return data.data;
  } catch (error) {
    toast.error('Erro ao buscar as categorias de problemas', {
      autoClose: 3000,
    });

    return [];
  }
};

export const createProblemCategory = async (
  newProblemCategory: ICreateProblemCategoryData,
  callback?: () => void
) => {
  try {
    const { data } = await api.post<{ data: IProblemCategory }>(
      '/categoria',
      newProblemCategory
    );
    callback && callback();

    toast.success('Categoria de problema criada com sucesso', {
      autoClose: 3000,
    });

    return data.data;
  } catch (error) {
    toast.error('Erro ao criar a categoria de problema', {
      autoClose: 3000,
    });
  }
};

export const updateProblemCategory = async (
  targetCategoryId: number,
  problemCategory: IProblemCategory,
  callback?: () => void
) => {
  try {
    const { data } = await api.put<{ data: IProblemCategory }>(
      `/categoria/${targetCategoryId}`,
      problemCategory
    );
    callback && callback();

    toast.success('Categoria de problema atualizada com sucesso', {
      autoClose: 3000,
    });

    return data.data;
  } catch (error) {
    toast.error('Erro ao atualizar a categoria de problema', {
      autoClose: 3000,
    });
  }
};

export const deleteProblemCategory = async (
  targetCategoryId: number,
  callback?: () => void
) => {
  try {
    await api.delete(`/categoria/${targetCategoryId}`);
    callback && callback();

    toast.success('Categoria de problema excluída com sucesso', {
      autoClose: 3000,
    });
  } catch (error) {
    toast.error('Erro ao excluir a categoria de problema', {
      autoClose: 3000,
    });
  }
};
