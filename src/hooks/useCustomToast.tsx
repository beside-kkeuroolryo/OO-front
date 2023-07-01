import { useCallback } from 'react';
import { toast } from 'react-toastify';
import RequestSuccessToast from '@/components/Request/RequestSuccessToast';
import AlertUpdateToast from '@/components/Questions/AlertUpdateToast';

type toastVariant = 'requestSuccess' | 'alertUpdate';

const bgColor = '#e5e5e5';

export default function useCustomToast() {
  const toasts: Record<toastVariant, any> = {
    requestSuccess: useCallback(
      () => toast(RequestSuccessToast, { style: { background: bgColor } }),
      [],
    ),
    alertUpdate: useCallback(
      () =>
        toast(AlertUpdateToast, {
          style: { background: bgColor },
        }),
      [],
    ),
  };

  return toasts;
}
