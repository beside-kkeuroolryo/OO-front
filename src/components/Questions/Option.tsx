import SpinnerIcon from '@/components/common/SpinnerIcon';

const OptionConfig = {
  active: 'border-dark',
  inactive: 'border-tertiary',
};

const SIZE_OFFSET = 2; // 100%일 때 bar의 크기를 양쪽으로 2% 늘려줌

type OptionProps = {
  id?: string;
  content?: string;
  isChosen?: boolean;
  hasChosen?: boolean;
  ratio?: number;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler;
};

export default function Option({
  id,
  content,
  isChosen = false,
  hasChosen = false,
  ratio = 0,
  isLoading = true,
  onClick,
}: OptionProps) {
  const isActive = isChosen && hasChosen;
  const isInactive = !isChosen && hasChosen;

  // 100%일 경우 바를 꽉 채우기 위해 크기를 늘려주고 위치조정.
  const ratioWithOffset = (ratio >= 100 ? ratio - SIZE_OFFSET * 3 : ratio < 5 ? 5 : ratio) + '%';
  const widthWithOffset = ratio >= 100 ? '104%' : '100%';

  return (
    <button
      type="button"
      id={id}
      className={`
        font-17 relative flex justify-between overflow-hidden rounded-12 border border-solid p-16 font-semibold ${
          isActive ? OptionConfig.active : `${OptionConfig.inactive} border-tertiary`
        }`}
      onClick={onClick}
    >
      {isLoading ? (
        <SpinnerIcon width={17} height={17} />
      ) : (
        <>
          <div
            style={{
              width: widthWithOffset,
              transform: `${hasChosen ? `translateX(${ratioWithOffset})` : '0%'}`,
            }}
            className={`absolute -left-[100%] -top-[2%] h-[104%] rounded-12 bg-cyan transition-[transform] duration-500 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
          <div
            style={{
              width: widthWithOffset,
              transform: `${hasChosen ? `translateX(${ratioWithOffset})` : '0%'}`,
            }}
            className={`absolute -left-[100%] -top-[2%] h-[104%] rounded-12 bg-tertiary transition-[transform] duration-500 ease-out ${
              isInactive ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>

          <div className="z-0">{content}</div>
          <div className="z-0">{hasChosen ? ratio + '%' : null}</div>
        </>
      )}
    </button>
  );
}
