import { InputsType } from '@/types/inputs';

export const NICKNAME = 'NICKNAME' as const;
export const PASSWORD = 'PASSWORD' as const;
export const COMMENT = 'COMMENT' as const;

export const MIN_LENGTH: Record<InputsType, number> = {
  NICKNAME: 1,
  PASSWORD: 4,
  COMMENT: 1,
};

export const MAX_LENGTH: Record<InputsType, number> = {
  NICKNAME: 15,
  PASSWORD: 15,
  COMMENT: 100,
};
