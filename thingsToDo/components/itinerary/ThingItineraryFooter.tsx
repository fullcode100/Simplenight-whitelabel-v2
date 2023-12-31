import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { Paragraph, Pricing } from '@simplenight/ui';
import ThingItineraryActions from './ThingItineraryActions';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface ThingItineraryFooterProps {
  item: any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  fullWidth?: boolean;
}

const ThingItineraryFooter = ({
  item,
  reload,
  setReload,
  fullWidth,
}: ThingItineraryFooterProps) => {
  const [t] = useTranslation(['global']);
  const onReload = () => {
    setReload?.(!reload);
  };

  const router = useRouter();
  const pathName = router.pathname;

  const {
    rate: { total: totalAmount },
  } = item;

  const formatedTotalAmount = totalAmount.full.formatted;

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
          <Paragraph size="small" className="w-full">
            {t('total')}
          </Paragraph>
          <section className="ml-auto text-right">
            <Pricing>
              <Pricing.Total totalAmount={formatedTotalAmount} />
            </Pricing>
          </section>
        </section>
        {showActions && (
          <ThingItineraryActions
            item={item}
            onReload={onReload}
            fullWidth={fullWidth}
          />
        )}
      </section>
    </section>
  );
};

export default ThingItineraryFooter;
