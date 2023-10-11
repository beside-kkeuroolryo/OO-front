import { useEffect, useRef } from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { ReactComponent as Close } from '@/assets/icons/close.svg';

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDialogElement>;

export default function Modal({
  children,
  isOpen = false,
  onClose,
  className,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useLockBodyScroll(isOpen);
  useFocusTrap(isOpen, dialogRef);

  const handleClickOutside = (e: React.MouseEvent) => {
    const dialogElement = dialogRef.current;

    if (!dialogElement || dialogElement.contains(e.target as HTMLElement)) return;
    onClose?.();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (isOpen && dialogElement) {
      dialogElement.show();
    } else if (!isOpen && dialogElement) {
      dialogElement.close();
    }
    if (isOpen) return () => dialogElement?.close();
  }, [isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 z-10 h-full w-full bg-dark bg-opacity-80 ${
        isOpen ? 'block' : 'hidden'
      }`}
      onClick={handleClickOutside}
    >
      <dialog
        aria-modal="true"
        ref={dialogRef}
        className={`absolute left-1/2 top-[20%] z-50 -translate-x-1/2 rounded-12 bg-white p-0`}
        {...props}
      >
        <button
          aria-label="모달 닫기"
          type="button"
          className="absolute -top-40 right-0"
          onClick={onClose}
        >
          <Close aria-hidden={true} />
        </button>
        <div className={`flex flex-col items-center ${className}`}>{children}</div>
      </dialog>
    </div>
  );
}
