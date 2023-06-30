import { QUESTIONS_COUNT } from '@/constants/constants';

const getQuestionRatios = () =>
  Array(QUESTIONS_COUNT)
    .fill(0)
    .reduce((acc, _, index) => {
      const ratio = Math.floor((100 * (index + 1)) / QUESTIONS_COUNT);
      acc[index] = `${ratio}%`;

      return acc;
    }, {});

export default getQuestionRatios;
