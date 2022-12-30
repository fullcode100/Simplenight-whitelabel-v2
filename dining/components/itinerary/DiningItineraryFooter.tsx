import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { Item } from 'types/cart/CartType';
import Paragraph from 'components/global/Typography/Paragraph';
import InfoCircle from 'public/icons/assets/info-circle.svg';
import DiningItineraryActions from './DiningItineraryActions';

interface DiningItineraryFooterProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  hideActions?: boolean;
  fullWidth?: boolean;
}
const DiningItineraryFooter = ({
  item,
  reload,
  setReload,
  hideActions,
  fullWidth,
}: DiningItineraryFooterProps) => {
  const [t] = useTranslation(['global', 'dining']);
  const onReload = () => {
    setReload?.(!reload);
  };

  return (
    <section className="flex flex-col gap-3">
      <section
        className={classnames('flex flex-col items-center justify-between', {
          ['lg:flex-row']: !fullWidth,
        })}
      >
        <section className="flex justify-between w-full pb-4 lg:pb-0">
          <Paragraph size="small" fontWeight="normal">
            {t('total')}
          </Paragraph>
          <section className="ml-auto text-right">
            <section className="flex flex-col justify-end gap-1">
              <p className="font-semibold text-[18px] leading-[18px] text-dark-1000">
                {t('dining:free')}
              </p>
              <p className="flex">
                {t('includesTaxesAndFees')}
                <InfoCircle className="self-center w-3 h-3 ml-2" />
              </p>
            </section>
          </section>
        </section>
        {!hideActions && (
          <DiningItineraryActions
            item={item}
            onReload={onReload}
            fullWidth={fullWidth}
          />
        )}
      </section>
    </section>
  );
};

export default DiningItineraryFooter;
