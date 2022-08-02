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
  const buttonIconClassNames = 'flex w-full gap-1 justify-center items-center';
  return (
    <button
      className={classnames(
        `font-semibold rounded ${sizeClassname}`,
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
      {leftIcon}
      {value}
    </button>
  );
};

export default NormalButton;
