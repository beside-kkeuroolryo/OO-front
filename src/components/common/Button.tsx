const ButtonConfig = {
  primary: 'bg-dark text-cyan',
  disabled: 'disabled:bg-tertiary disabled:text-white',
  ghost: 'border border-solid border-dark bg-background text-primary',
};

type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'disabled';
  rounded?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  children,
  variant = 'primary',
  rounded = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        w-fit
        ${rounded ? 'rounded-40' : 'rounded-12'}
        ${ButtonConfig.disabled} ${ButtonConfig[variant]}
        ${className}
      `}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
