import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Item } from 'types/cart/CartType';
import { Paragraph } from '@simplenight/ui';
import classnames from 'classnames';

import TaxesAndFeesPopover from '../TaxesAndFeesPopover/TaxesAndFeesPopover';
import ShowsItineraryActions from './ShowsItineraryActions';
import { useRouter } from 'next/router';

interface ShowsItineraryFooterProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  isItineraryView?: boolean;
  fullWidth?: boolean;
}

const ShowsItineraryFooter = ({
  item,
  reload,
  setReload,
  fullWidth,
}: ShowsItineraryFooterProps) => {
  const onReload = () => {
    setReload?.(!reload);
  };

  const [tg, i18g] = useTranslation('global');

  const taxesAndFeesLabel = tg(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  const router = useRouter();
  const pathName = router.pathname;

  const showActions = !(
    pathName.startsWith('/checkout') || pathName.startsWith('/confirmation')
  );

  return (
    <section className="flex flex-col gap-3">
      <section
        className={classnames('flex flex-col items-center justify-between', {
          ['lg:flex-row']: !fullWidth,
        })}
      >
        <section className="flex justify-between w-full pb-4 lg:pb-0">
          <Paragraph size="small">Total</Paragraph>
          <section className="ml-auto text-right">
            <section className="flex flex-col justify-end gap-1">
              <p className="font-semibold text-[18px] leading-[18px] text-dark-1000">
                {item?.rate?.total.net.formatted}
              </p>
              <section className="flex flex-row justify-end gap-1">
                <p className="text-[12px] leading-[15px] text-dark-800">
                  {taxesAndFeesLabel}
                </p>
                <TaxesAndFeesPopover />
              </section>
            </section>
          </section>
        </section>
        {showActions && (
          <ShowsItineraryActions
            item={item}
            onReload={onReload}
            fullWidth={fullWidth}
          />
        )}
      </section>
    </section>
  );
};

export default ShowsItineraryFooter;
