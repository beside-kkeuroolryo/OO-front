import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/config/axios';
import { ResponseStatus } from '@/api/types';

type PostConvertToShortUrlResponse = {
  data: {
    shortUrl: string;
  };
} & ResponseStatus;

type GetResultResponse = {
  data: {
    originalData: string;
  };
} & ResponseStatus;

export const usePostConvertToShortUrl = () => {
  return useMutation(async (url: string) => {
    const { data } = await axiosInstance.post<PostConvertToShortUrlResponse>(
      '/api/golrabas/shortUrl',
      {
        originalData: url,
      },
    );
    return data.data.shortUrl;
  });
};

export const useGetResult = (shortUrl: string, enabled: boolean) => {
  return useQuery(
    ['result'],
    async () => {
      const { data } = await axiosInstance.get<GetResultResponse>(
        `/api/golrabas/shortUrl/${shortUrl}`,
      );
      return data.data.originalData;
    },
    { enabled },
  );
};
