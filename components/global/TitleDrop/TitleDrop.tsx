import { useState } from 'react';
import classnames from 'classnames';
import AngleTop from 'public/icons/assets/angle-top.svg';
interface TitleDropProps {
  title: string;
  defaultOpen?: boolean;
  children: any;
}
const TitleDrop = ({ title, children, defaultOpen = true }: TitleDropProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const handleOpen = () => setIsOpen(!isOpen);
  const angleClass = classnames({ 'rotate-180': !isOpen });
  return (
    <section className="w-full">
      <section
        className="mb-4 flex justify-between items-center"
        onClick={handleOpen}
      >
        <p className="text-lg text-dark-800">{title}</p>
        <AngleTop className={angleClass} />
      </section>
      <section className={classnames('w-full', { hidden: !isOpen })}>
        {children}
      </section>
    </section>
  );
};
export default TitleDrop;
