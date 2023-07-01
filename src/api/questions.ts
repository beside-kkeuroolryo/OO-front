import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QuestionType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';

// export const useGetQuestionIds = (category?: string, idsState?: number[]) => {
//   return useQuery<number[], AxiosError>(
//     [category, 'ids'],
//     async () => {
//       const { data } = await axiosInstance.get(`/api/golrabas/category/${category}`);
//       return data.data.questionIds;
//     },
//     { enabled: !idsState },
//   );
// };

// export const useGetQuestion = (id?: number) => {
//   return useQuery<QuestionType, AxiosError>(
//     ['question', id],
//     async () => {
//       const { data } = await axiosInstance.get(`/api/golrabas/${id}`);
//       return data.data;
//     },
//     { enabled: id !== undefined },
//   );
// };

export const usePostResult = () => {
  return useMutation((body: { questionId?: number; choice?: '' | 'a' | 'b' }[]) => {
    return axiosInstance.post('/api/golrabas/result', { results: body });
  });
};

export const useGetQuestionIds = (category?: string, idsState?: number[]) => {
  category;
  return useQuery<number[], AxiosError>(
    ['self', 'ids'],
    async () => {
      console.log('ids fetch');
      const { data } = await axiosInstance.get(`/category.json`);
      return data.data.questionIds;
    },
    { enabled: !idsState },
  );
};

export const useGetQuestion = (id?: number) => {
  return useQuery<QuestionType, AxiosError>(
    ['question', id],
    async () => {
      console.log('question fetch');
      const { data } = await axiosInstance.get(`/question.json`);
      return data.data;
    },
    { enabled: id !== undefined },
  );
};
