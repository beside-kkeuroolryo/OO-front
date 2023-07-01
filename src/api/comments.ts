import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CommentType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';

export const useGetComments = (id?: number) => {
  return useQuery<CommentType[], AxiosError>(
    ['question', id, 'comments'],
    async () => {
      const { data } = await axiosInstance.get(`/api/golrabas/${id}/comments`);
      return data.data.comments;
    },
    { enabled: id !== undefined },
  );
};
