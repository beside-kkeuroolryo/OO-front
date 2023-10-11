export const isLessThan = ({ num, comparison }: { num?: number; comparison: number }) => {
  return num !== undefined ? num < comparison : true;
};
