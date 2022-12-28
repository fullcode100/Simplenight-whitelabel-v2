import { useTranslation } from 'react-i18next';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { Item } from 'types/cart/CartType';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';

interface TransportationCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const TransportationCheckoutDisplay = ({
  item,
  Category,
}: TransportationCheckoutDisplayProps) => {
  const [t] = useTranslation('ground-transportation');

  const quote: Quote = item?.booking_data?.transportation;
  const title = useCapitalizeFirstChar(quote?.service_info?.vehicle_type);

  return (
    <header className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000 text-white">
        {Category.icon}
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 text-[20px] leading-[20px]">
          {title}
        </section>
        <section className="font-normal text-dark-700 text-[14px] leading-[17px]">
          {t('Point-To-Point Trip')}
        </section>
      </section>
    </header>
  );
};

export default TransportationCheckoutDisplay;