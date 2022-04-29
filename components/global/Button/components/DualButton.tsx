import { ButtonVariantProp } from '../ButtonVariant';
import classnames from 'classnames';

const DualButton = ({
  colors,
  sizeClassname,
  rightValue,
  value,
  leftValue,
  disabled,
  className,
  onRightClick,
  onLeftClick,
  containerClassName = '',
  ...others
}: ButtonVariantProp) => (
  <section className={`flex flex-row ${containerClassName}`}>
    <button
      className={classnames(
        `px-4 pb-1 pt-1 font-semibold flex items-center rounded-l-4 ${sizeClassname}`,
        {
          [`cursor-pointer bg-primary-800 text-white  ${colors.active} ${colors.hover}`]:
            !disabled,
          [`${colors.disabled} cursor-default`]: disabled,
        },
        className,
      )}
      onClick={onLeftClick}
      {...others}
    >
      {leftValue}
    </button>
    <button
      className={classnames(
        `px-4 pb-1 pt-1 font-semibold flex items-center  rounded-r-4 ${sizeClassname}`,
        {
          [`cursor-pointer ${colors.normal}  ${colors.active} ${colors.hover}`]:
            !disabled,
          [`${colors.disabled} cursor-default`]: disabled,
        },
        className,
      )}
      onClick={onRightClick}
      {...others}
    >
      {rightValue}
    </button>
  </section>
);

export default DualButton;
