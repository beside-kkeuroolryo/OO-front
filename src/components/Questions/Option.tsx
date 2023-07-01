const OptionConfig = {
  active: 'border-dark',
  inactive: 'bg-bar border-tertiary',
};

type OptionProps = {
  id?: string;
  content?: string;
  isChosen?: boolean;
  hasChosen?: boolean;
  ratio?: number;
  onClick?: React.MouseEventHandler;
};

export default function Option({
  id,
  content,
  isChosen = false,
  hasChosen = false,
  ratio,
  onClick,
}: OptionProps) {
  const isActive = isChosen && hasChosen;
  const isInactive = !isChosen && hasChosen;

  const ratioPercentage = ratio + '%';

  return (
    <button
      type="button"
      id={id}
      className={`
        font-17 relative flex justify-between rounded-12 border border-solid  p-16 font-semibold ${
          isActive ? OptionConfig.active : `${OptionConfig.inactive} border-tertiary`
        }`}
      onClick={onClick}
    >
      <div
        style={{ width: `${hasChosen ? ratioPercentage : '0%'}` }}
        className={`absolute left-0 top-0 h-full rounded-12 bg-cyan transition-[width] duration-500 ease-out ${
          isActive ? 'border-r border-solid border-black' : ''
        } ${isActive ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      <div
        style={{ width: `${hasChosen ? ratioPercentage : '0%'}` }}
        className={`absolute left-0 top-0 h-full rounded-12 bg-tertiary transition-[width] duration-500 ease-out ${
          isInactive ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      <div className="z-0">{content}</div>
      <div className="z-0">{hasChosen ? ratioPercentage : null}</div>
    </button>
  );
}
