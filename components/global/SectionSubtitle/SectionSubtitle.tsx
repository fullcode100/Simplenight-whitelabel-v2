import classNames from 'classnames';

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionSubtitle = ({
  children,
  className,
  ...rest
}: SectionSubtitleProps) => (
  <h3
    className={classNames('font-semibold text-base text-dark-800', className)}
    {...rest}
  >
    {children}
  </h3>
);

export default SectionSubtitle;
