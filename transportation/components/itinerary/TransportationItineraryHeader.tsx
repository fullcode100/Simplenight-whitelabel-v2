import { FC, ReactElement } from 'react';
import { Item } from '../../../types/cart/CartType';
import IconRoundedContainer from '../../../components/global/IconRoundedContainer/IconRoundedContainer';
import { TransportationItem } from '../../types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';

interface TransportationItineraryFooterProps {
  item: Item;
  icon: ReactElement;
}

export const TransportationItineraryHeader: FC<
  TransportationItineraryFooterProps
> = ({ item, icon }) => {
  const [t] = useTranslation('ground-transportation');

  const quote: TransportationItem = item.booking_data?.transportation;
  const title = useCapitalizeFirstChar(quote?.extra_data?.vehicle_type);

  return (
    <header className="flex flex-row gap-3">
      <IconRoundedContainer className="text-white bg-primary-1000">
        {icon}
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
