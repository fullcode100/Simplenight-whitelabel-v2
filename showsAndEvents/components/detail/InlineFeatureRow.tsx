import UserInterfaceExclamationMark from 'public/icons/assets/clock.svg';
import TransportSeat from 'public/icons/assets/clock.svg';

export default function InlineFeatureRow(props: InlineFeatureRowProps) {
  return (
    <>
      <div
        className={`gap-2 inline-flex items-center text-left font-['Lato'] transition-all ${
          props.type === 'XS_TYPE' ? 'font-semibold text-dark-800' : ''
        } ${
          props.type === 'XS_TYPE1' ? 'font-normal text-[rgba(69,69,69,1)]' : ''
        }`}
      >
        {props.type === 'XS_TYPE' && <UserInterfaceExclamationMark />}
        {props.type === 'XS_TYPE1' && <TransportSeat />}
        <p
          className={`m-0 transition-all ${
            props.type === 'XS_TYPE' ? 'text-sm leading-5 capitalize' : ''
          } ${props.type === 'XS_TYPE1' ? 'text-base leading-[22px]' : ''}`}
        >
          {props.text}
        </p>
      </div>
    </>
  );
}

InlineFeatureRow.defaultProps = {
  type: 'XS_TYPE',
  text: 'Your seats are guaranteed to be together',
};

interface InlineFeatureRowProps {
  type: 'XS_TYPE' | 'XS_TYPE1';
  text: string;
}
