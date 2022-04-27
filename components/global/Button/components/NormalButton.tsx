import { ButtonVariantProp } from '../ButtonVariant';
import classnames from 'classnames';

const NormalButton = ({
  colors,
  sizeClassname,
  value,
  disabled,
  className,
  leftIcon,
  ...others
}: ButtonVariantProp) => {
  const buttonIconClassNames = 'flex w-full justify-center items-center';
  return (
    <button
      className={classnames(
        `px-4 pb-2 pt-1 font-semibold rounded-4 ${sizeClassname}`,
        {
          [`cursor-pointer ${colors.normal}  ${colors.active} ${colors.hover}`]:
            !disabled,
          [`${colors.disabled} cursor-default`]: disabled,
          [`${buttonIconClassNames}`]: leftIcon,
        },
        className,
      )}
      {...others}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {value}
    </button>
  );
};

export default NormalButton;
