import IconRoundedContainer from '../IconRoundedContainer/IconRoundedContainer';
import Label from '../Label/Label';
import SingleBed from 'public/icons/assets/single-bed.svg';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import classnames from 'classnames';
import { useState } from 'react';
import AngleTop from 'public/icons/assets/angle-top.svg';
import { useTranslation } from 'react-i18next';

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
  const [t] = useTranslation('global');
  const requiredText = t('required', 'Required');
  let currentLabel = label;
  if (label == 'First Name') {
    currentLabel = t('first_name', label);
  }
  if (label == 'Last Name') {
    currentLabel = t('last_name', label);
  }
  if (label == 'Phone Number') {
    currentLabel = t('phone_number', label);
  }
  if (label == 'Country') {
    currentLabel = t('country', label);
  }
  if (label == 'Email Address') {
    currentLabel = t('email_address', label);
  }
  return (
    <>
      <section className="flex justify-between">
        <Label value={currentLabel} />
        {required && <span className="text-primary-1000">{requiredText}</span>}
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
  return <section>{children}</section>;
};

export const ObjectFieldTemplate = (props: any) => {
  const { id, description, properties, title, schema } = props;
  const [open, setOpen] = useState(false);
  const contentClass = classnames(`${schema?.className || ''}`, {
    hidden: title && open,
  });
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
            <section className="flex flex-col w-full ml-2 text-dark-800">
              <span className="text-base"> {title}</span>
              <span> {description}</span>
            </section>
            <section>
              <AngleTop className={angleClass} />
            </section>
          </section>
        </>
      )}
      <section className={`${contentClass}`}>
        {properties.map((element: any, i: number) => {
          const elmProps = element.content.props;
          const { uiSchema } = elmProps;
          return (
            <section
              key={`s${i}`}
              className={`mt-4 property-wrapper ${uiSchema.classNames}`}
            >
              {element.content}
            </section>
          );
        })}
      </section>
    </section>
  );
};
