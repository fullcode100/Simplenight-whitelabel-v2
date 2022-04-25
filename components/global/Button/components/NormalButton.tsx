import { ButtonVariantProp } from '../ButtonVariant';
import classnames from 'classnames';

const NormalButton = ({
  colors,
  sizeClassname,
  value,
  disabled,
  className,
  icon,
  ...others
}: ButtonVariantProp) => (
  <button
    className={classnames(
      `px-4 pb-2 pt-1 font-semibold rounded-4 flex items-center justify-center ${sizeClassname}`,
      {
        [`cursor-pointer ${colors.normal}  ${colors.active} ${colors.hover}`]:
          !disabled,
        [`${colors.disabled} cursor-default`]: disabled,
      },
      className,
    )}
    {...others}
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span>{value}</span>
  </button>
);

export default NormalButton;
