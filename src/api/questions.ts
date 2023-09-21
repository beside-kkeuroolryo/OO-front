import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QuestionType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';
import { ResponseStatus } from '@/api/types';

export type PostResultBody = {
  questionId?: number;
  choice?: '' | 'a' | 'b';
}[];

type PostQuesetionBody = {
  content: string;
  choiceA: string;
  choiceB: string;
};

type GetQuestionIdsResponse = {
  data: {
    questionIds: number[];
  };
} & ResponseStatus;

type GetQuestionResponse = {
  data: QuestionType;
} & ResponseStatus;

export const usePostResult = () => {
  return useMutation((body: PostResultBody) => {
    return axiosInstance.post('/api/golrabas/result', { results: body });
  });
};

export const useGetQuestionIds = (category?: string, enabled?: boolean) => {
  return useQuery<number[], AxiosError>(
    [category, 'ids'],
    async () => {
      const { data } = await axiosInstance.get<GetQuestionIdsResponse>(
        `/api/golrabas/category/${category}`,
      );
      return data.data.questionIds;
    },
    { enabled },
  );
};

export const useGetQuestion = (id?: number) => {
  return useQuery<QuestionType, AxiosError>(
    ['question', id],
    async () => {
      const { data } = await axiosInstance.get<GetQuestionResponse>(`/api/golrabas/${id}`);
      return data.data;
    },
    { enabled: id !== undefined },
  );
};

export const usePostQuestion = () => {
  return useMutation((body: PostQuesetionBody) => {
    return axiosInstance.post(`/api/golrabas/question`, body);
  });
};
