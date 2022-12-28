import React, { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import { Item } from '../../../types/cart/CartType';
import LocationPinIcon from '@/icons/assets/location-pin.svg';
import PlusIcon from '@/icons/assets/plusIcon.svg';
import Divider from '../../../components/global/Divider/Divider';
import { Quote } from '../../types/response/TransportationSearchResponse';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Calendar from 'public/icons/assets/calendar.svg';
import { useCapitalizeFirstChar } from 'transportation/hooks/useCapitalizeFirstChar';
import TrashIcon from '@/icons/assets/small-trash.svg';
import Button from '../../../components/global/Button/Button';
import { removeFromCart } from '../../../core/client/services/CartClientService';
import { useDispatch } from 'react-redux';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

interface TransportationItineraryBodyProps {
    item: Item;
    breakdown?: boolean;
    reload?: boolean;
    setReload?: Dispatch<SetStateAction<boolean>>;
}

export const TransportationItineraryBody: FC<TransportationItineraryBodyProps> = ({
    item,
    reload,
    setReload,
    breakdown = false,
}) => {
    const [tg, i18g] = useTranslation('global');
    const [t] = useTranslation('ground-transportation');
    const dispatch = useDispatch();

    const pickUpText = t('pickUpText', 'Pick-Up')
    const dropOffText = t('dropOffText', 'Drop-Off')
    const priceIncludesText = t('priceIncludesText', 'Price Includes')
    const cancellationPolicyText = t('cancellationPolicyText', 'Cancellation Policy')

    const search = item?.booking_data?.search;
    const quote: Quote = item?.booking_data?.transportation;
    const location1 = search?.location1;
    const location2 = search?.location2;

    const currencyCode = quote?.fare?.currency_code;
    const price = quote?.fare?.price;

    const startDate = dayjs(
        `${search?.start_date} ${search?.start_time}`,
        'YYYY-MM-DD HHmm',
    );
    const endDate = dayjs(
        `${search?.end_date} ${search?.end_time}`,
        'YYYY-MM-DD HHmm',
    );

    const removeTransportationFromShoppingCart = () => {
        const transportationToRemove = {
          cartId: item.cart_id,
          itemId: item.cart_item_id,
        };
        removeFromCart(i18g, transportationToRemove, dispatch)
          .then(() => setReload?.(!reload))
          .catch((error) => console.error(error));
      };
    
      const handleRemoveAllTransportation = () => {
        removeTransportationFromShoppingCart();
      };


    return (
        <section>
            <section className="flex flex-col gap-3 py-4 px-4">
                <FeatureItem
                    icon={<Calendar className="w-6 text-primary-1000 mx-2" />}
                    labelWithTitle={{ label: startDate.toString(), title: pickUpText }}
                />
                <FeatureItem
                    icon={<Calendar className="w-6 text-primary-1000 mx-2" />}
                    labelWithTitle={{ label: endDate.toString(), title: dropOffText }}

                />
                <FeatureItem
                    icon={<LocationPinIcon className="w-6 text-primary-1000 mx-2" />}
                    label={location1}
                />
                <FeatureItem
                    icon={<LocationPinIcon className="w-6 text-primary-1000 mx-2" />}
                    label={location2}
                />
            </section>

            <Divider />

            <section className="flex flex-col gap-6 py-4 px-4">
                <section className="flex flex-col gap-3">
                    <section className="font-semibold text-dark-1000 text-[18px] leading-[24px]">
                        {useCapitalizeFirstChar(quote?.service_info?.vehicle_type)}
                    </section>
                    <section className="flex justify-between items-center">
                        <section className="flex items-center gap-2">
                            <section className="text-primary-1000">
                                <PlusIcon />
                            </section>
                            <span className="font-semibold text-dark-1000 text-[16px] leading-[22px]">Point-To-Point Trip</span>
                        </section>
                        <section className="font-semibold text-dark-1000 text-[16px] leading-[22px]">
                            {currencyCode + ' ' + price?.toFixed(2)}
                        </section>
                    </section>
                    <Divider />

                    <ItemDetails title={priceIncludesText} label={quote?.luggage?.inclusive_allowance} />
                    <ItemDetails title={cancellationPolicyText} label={quote?.fare?.refund_cancellation_policy} />
                </section>

                {breakdown ? (
                    <section>
                        <Button
                            value={tg('remove')}
                            size="full-sm"
                            type="outlined"
                            leftIcon={<TrashIcon />}
                            onClick={handleRemoveAllTransportation}
                            className="w-full"
                        />
                    </section>
                ) : (
                    <section>
                        <p className="text-[16px] font-semibold underline text-primary-1000 hover:text-primary-600 cursor-pointer">
                            [SUPPLIER] Terms Of Service
                        </p>
                    </section>
                )}
            </section>
        </section>
    );
};

const FeatureItem: FC<{ icon: ReactNode; label?: string; labelWithTitle?: { title: string; label: string }; }> = ({
    icon,
    label,
    labelWithTitle
}) => {
    return (
        <section className="flex flex-row">
            {icon}
            {label &&
                <section className="flex items-center font-semibold text-dark-1000 text-[16px] leading-[22px]">
                    {label}
                </section>
            }
            {labelWithTitle &&
                <section className='flex flex-col gap-2'>
                    <span className="font-normal text-dark-700 text-[14px] leading-[17px]">{labelWithTitle.title}</span>
                    <section className="font-semibold text-dark-1000 text-[16px] leading-[22px]">{labelWithTitle.label}</section>
                </section>
            }
        </section>
    );
};

const ItemDetails: FC<{ title: string; label?: string }> = ({
    title,
    label,
}) => {
    return (
        <section className="flex flex-col gap-1">
            <span className='font-semibold text-dark-700 text-[16px] leading-[22px]'>{title}</span>
            <p className='font-semibold text-dark-1000 text-[16px] leading-[22px]'>{label}</p>
        </section>
    );
};