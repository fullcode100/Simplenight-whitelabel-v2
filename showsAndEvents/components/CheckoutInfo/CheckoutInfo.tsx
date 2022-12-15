import { formatAsDisplayDatetime } from 'helpers/dajjsUtils';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';

interface CheckoutInfoProps {
  checkoutDateTime: string;
}

const CheckoutInfo = ({ checkoutDateTime }: CheckoutInfoProps) => {
  const formattedCheckoutDateTime = formatAsDisplayDatetime(checkoutDateTime);

  return (
    <section className="flex flex-row gap-2 lg:w-1/2">
      <CalendarIcon className="h-3.5 lg:h-5 lg:w-5 mt-1 lg:mt-0 text-primary-1000" />
      {checkoutDateTime && (
        <section className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
          <p className="text-dark-1000">
            {fromLowerCaseToCapitilize(formattedCheckoutDateTime)}
          </p>
        </section>
      )}
    </section>
  );
};

export default CheckoutInfo;
