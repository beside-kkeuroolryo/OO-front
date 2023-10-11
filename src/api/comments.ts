import { useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CommentType } from '@/types/questions';
import axiosInstance from '@/api/config/axios';
import { ResponseStatus } from '@/api/types';

type PostCommentBody = {
  username?: string;
  password?: string;
  content?: string;
};

type DeleteCommentBody = {
  password?: string;
};

type GetCommentsResponse = {
  data: {
    questionId: number;
    comments: { id: number; username: string; content: string }[];
    page: { last: boolean; size: number; nextId: number };
  };
} & ResponseStatus;

type PostCommentResponse = ResponseStatus;

type DeleteCommentResponse = ResponseStatus;

export const useGetComments = (questionId?: number, enabled?: boolean) => {
  return useInfiniteQuery<{ comments: CommentType[]; isLast: boolean; lastId: number }, AxiosError>(
    ['question', questionId, 'comments'],
    async ({ pageParam }) => {
      const { data } = await axiosInstance.get<GetCommentsResponse>(
        `/api/golrabas/${questionId}/comments${pageParam ? `?searchAfterId=${pageParam}` : ''}`,
      );

      const { last, nextId } = data.data.page;
      const lastId = nextId - 1;
      return { comments: data.data.comments, isLast: last, lastId };
    },
    {
      enabled: enabled === false ? false : questionId !== undefined,
      getNextPageParam: ({ isLast, lastId }) => (isLast ? undefined : lastId),
    },
  );
};

export const usePostComment = (questionId?: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (body: PostCommentBody) => {
      return axiosInstance.post<PostCommentResponse>(`/api/golrabas/${questionId}/comments`, body);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['question', questionId, 'comments']);
      },
    },
  );
};

export const useDeleteComment = (questionId?: number, commentId?: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: DeleteCommentBody) => {
      return axiosInstance.delete<DeleteCommentResponse>(
        `/api/golrabas/${questionId}/comments/${commentId}`,
        {
          data: body,
        },
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(['question', questionId, 'comments']);
      },
    },
  );
};
