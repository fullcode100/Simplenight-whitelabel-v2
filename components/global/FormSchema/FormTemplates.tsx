import IconRoundedContainer from '../IconRoundedContainer/IconRoundedContainer';
import Label from '../Label/Label';
import SingleBed from 'public/icons/assets/single-bed.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import classnames from 'classnames';
import { useState } from 'react';
import AngleTop from 'public/icons/assets/angle-top.svg';

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <section className="bg-dark-100 p-2 rounded-4 border-[1px] border-dark-300 mt-6 flex text-dark-1000">
      <section className="w-[20px] p-[2px]">
        <InfoCircle />
      </section>
      <section className="ml-2">{description}</section>
    </section>
  );
};

export const CheckBoxTemplate = (props: any) => {
  const { id, label, children, description } = props;
  return (
    <>
      <section className="flex items-center">
        {children}
        <Label value={label} className="ml-2" />
      </section>
      {description?.props?.description && (
        <Description description={description} />
      )}
    </>
  );
};

export const TextTemplate = (props: any) => {
  const { id, label, required, children, description } = props;
  return (
    <>
      <section className="flex justify-between mb-[4px]">
        <Label value={label} />
        {required && <span className="text-primary-1000">Required</span>}
      </section>
      {children}
      {description?.props?.description && (
        <Description description={description} />
      )}
    </>
  );
};

export const ObjectTemplate = (props: any) => {
  const { children } = props;
  return <section className="px-5">{children}</section>;
};

export const ObjectFieldTemplate = (props: any) => {
  const { id, description, properties, title } = props;
  const [open, setOpen] = useState(false);
  const contentClass = classnames({ hidden: title && open });
  const handleOpenContent = () => setOpen(!open);
  const angleClass = classnames({ 'rotate-180': open });
  return (
    <section>
      {title && (
        <>
          <span className="block h-[1px] bg-dark-300 w-full my-6" />
          <section className="flex items-center" onClick={handleOpenContent}>
            <IconRoundedContainer className="bg-primary-1000">
              <SingleBed className="text-white" />
            </IconRoundedContainer>
            <section className="flex flex-col text-dark-800 ml-2 w-full">
              <span className="text-base"> {title}</span>
              <span> {description}</span>
            </section>
            <section>
              <AngleTop className={angleClass} />
            </section>
          </section>
        </>
      )}
      <section className={contentClass}>
        {properties.map((element: any, i: number) => (
          <section key={`s${i}`} className="property-wrapper mt-4">
            {element.content}
          </section>
        ))}
      </section>
    </section>
  );
};
