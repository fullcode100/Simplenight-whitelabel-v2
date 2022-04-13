import { ButtonVariantProp } from '../ButtonVariant';
import classnames from 'classnames';

const NormalButton = ({
  colors,
  sizeClassname,
  value,
  disabled,
  className,
  ...others
}: ButtonVariantProp) => (
  <button
    className={classnames(
      `px-4 pb-2 pt-1 font-semibold rounded-4 ${sizeClassname}`,
      {
        [`cursor-pointer ${colors.normal}  ${colors.active} ${colors.hover}`]:
          !disabled,
        [`${colors.disabled} cursor-default`]: disabled,
      },
      className,
    )}
    {...others}
  >
    {value}
  </button>
);

export default NormalButton;
