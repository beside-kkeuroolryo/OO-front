import { ReactComponent as Self } from '@/assets/images/self.svg';
import { ReactComponent as Couple } from '@/assets/images/couple.svg';
import { ReactComponent as Friend } from '@/assets/images/friend.svg';
import { ReactComponent as Random } from '@/assets/images/random.svg';
import { ReactComponent as Usermade } from '@/assets/images/usermade.svg';
import { SELF, COUPLE, FRIEND, RANDOM, USERMADE } from '@/constants/questions';

export const categoryKeys = [SELF, COUPLE, FRIEND, RANDOM, USERMADE] as const;

export type CategoryKeys = (typeof categoryKeys)[number];

export const CATEGORIES: Record<
  CategoryKeys,
  { title: string; sub: string; img: React.ReactNode }
> = {
  self: {
    title: '셀프',
    sub: '시간 순삭 1인 밸런스 게임',
    img: <Self />,
  },
  couple: {
    title: '커플',
    sub: '애인과 함께하는 커플 밸런스 게임',
    img: <Couple />,
  },
  friend: {
    title: '우정',
    sub: '찐한 우정을 위한 우정 밸런스 게임',
    img: <Friend />,
  },
  random: {
    title: '랜덤',
    sub: '모든 질문을 모은 랜덤 밸런스 게임',
    img: <Random />,
  },
  usermade: {
    title: '같이해요',
    sub: '사용자들이 보내온 밸런스 게임',
    img: <Usermade />,
  },
};

export const DISPLAYED_CATEGORIES = ['ALL', '셀프', '커플', '우정', '랜덤', '같이해요'] as const;

export type DisplayedCategory = (typeof DISPLAYED_CATEGORIES)[number];
