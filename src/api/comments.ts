import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CommentType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';

type CommentBody = {
  username?: string;
  password?: string;
  content?: string;
};

export const useGetComments = (questionId?: number) => {
  return useQuery<CommentType[], AxiosError>(
    ['question', questionId, 'comments'],
    async () => {
      const { data } = await axiosInstance.get(`/api/golrabas/${questionId}/comments`);
      return data.data.comments;
    },
    { enabled: questionId !== undefined },
  );
};

export const usePostComment = (questionId?: number) => {
  return useMutation((body: CommentBody) => {
    return axiosInstance.post(`/api/golrabas/${questionId}/comments`, body);
  });
};
