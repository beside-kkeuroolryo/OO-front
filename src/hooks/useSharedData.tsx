import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetResult } from '@/api/shortUrl';

type SharedData = {
  ids: number[];
  result: string[][];
};

export default function useSharedData(shortUrl: string, enabled: boolean) {
  const { data: sharedData } = useGetResult(shortUrl, enabled);

  const [sharedIds, setSharedIds] = useState<number[]>([]);
  const [sharedResult, setSharedResult] = useState<string[][]>([[]]);

  useEffect(() => {
    try {
      if (!sharedData) return;
      const parsedData: SharedData = JSON.parse(sharedData || '{}');

      if (Array.isArray(parsedData.ids)) {
        setSharedIds(parsedData.ids);
      } else {
        throw new Error('데이터에 "ids"가 없거나 유효하지 않습니다.');
      }

      if (Array.isArray(parsedData.result) && parsedData.result.every(Array.isArray)) {
        setSharedResult(parsedData.result);
      } else {
        throw new Error('데이터에 "result"가 없거나 유효하지 않습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            데이터 파싱에 문제가 있습니다.
            <br />
            {error.message}
          </div>,
        );
      }
    }
  }, [sharedData]);

  return { sharedIds, sharedResult };
}
