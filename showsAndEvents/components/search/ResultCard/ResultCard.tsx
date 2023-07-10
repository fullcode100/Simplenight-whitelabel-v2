import React, { ReactNode, useEffect, useState } from 'react';
import { WithId } from 'types/global/WithId';
import Divider from '../../../../components/global/Divider/Divider';
import Link from 'next/link';
import LocationPin from 'public/icons/assets/location-pin.svg';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import EmptyImage from 'components/global/EmptyImage/EmptyImage';
import { fromLowerCaseToCapitilize } from 'helpers/stringUtils';
import { formatAsDisplayDatetime } from 'helpers/dajjsUtils';

import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';

const FREE_CANCELLATION = 'FREE_CANCELLATION';
const NON_REFUNDABLE = 'NON_REFUNDABLE';
const PARTIAL_REFUND = 'PARTIAL_REFUND';
interface CardProps<T extends WithId> {
  item: T;
  title: string;
  icon?: ReactNode;
  categoryName?: string;
  fromDate: string;
  address?: ReactNode;
  cancellationType: string;
  priceDisplay?: ReactNode;
  url?: string;
  isHorizontal?: boolean;
  thumbnail?: string;
  className?: string;
}

function ResultCard<T extends WithId>({
  title,
  address,
  fromDate,
  cancellationType,
  priceDisplay,
  icon,
  categoryName,
  url = '/',
  isHorizontal,
  thumbnail,
  className = '',
}: CardProps<T>) {
  const [invalidImage, setInvalidImage] = useState(false);
  const target = window.innerWidth < 640 ? '_self' : '_blank';

  useEffect(() => {
    checkValidImage();
  }, [thumbnail]);

  const CategoryTag = () => (
    <section className="absolute flex flex-row items-center gap-2 bg-dark-1000 opacity-[0.85] text-white px-2 py-1 rounded-br z-19">
      {icon}
      <span className="font-semibold text-[14px]">{categoryName}</span>
    </section>
  );

  const TitleSection = () => (
    <h6
      className={`font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg truncate ${
        isHorizontal ? '' : 'max-w-[250px] lg:max-w-[350px]'
      }`}
    >
      {title}
    </h6>
  );

  const checkValidImage = () => {
    const img = new Image();
    img.src = thumbnail as string;
    img.onerror = () => setInvalidImage(true);
  };

  const displayEmpty = invalidImage || !thumbnail;

  const cancellable = cancellationType === FREE_CANCELLATION;
  const nonCancellable = cancellationType === NON_REFUNDABLE;
  const partialRefundable = cancellationType === PARTIAL_REFUND;

  return (
    <div
      className={`w-full mt-3 overflow-hidden bg-white border rounded-4 border-dark-300 ${className}`}
    >
      <Link href={url} passHref>
        <a
          target={target}
          rel="noopener noreferrer"
          className="hover:text-inherit"
        >
          <section
            className={`flex  lg:flex-row relative ${
              isHorizontal ? 'flex-row' : 'flex-col'
            }`}
          >
            {!displayEmpty && (
              <section>
                <section
                  className={` ${
                    isHorizontal
                      ? 'min-w-[108px] max-w-[108px] h-full'
                      : 'min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]'
                  }`}
                  style={{
                    backgroundImage: `url(${thumbnail ?? '/images/Slide.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </section>
            )}
            <CategoryTag />
            {displayEmpty && (
              <section
                className={` ${
                  isHorizontal
                    ? 'min-w-[108px] max-w-[108px] h-[108px]'
                    : 'min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem]'
                }`}
              >
                <EmptyImage />
              </section>
            )}
            <section
              className={`flex flex-col justify-between ${
                isHorizontal
                  ? 'gap-1 p-3 max-w-[calc(100%-108px)]'
                  : 'gap-2 p-5 pb-0 lg:pb-5 lg:pr-0'
              } lg:justify-start `}
            >
              <TitleSection />

              {/* <RatingSection /> */}
              <section className="flex flex-row gap-2">
                <LocationPin className="h-3.5 lg:h-4 lg:w-4 lg:ml-0 mt-1 lg:mt-0 text-primary-1000" />
                <p className="font-semibold">{address}</p>
              </section>
              <section className="flex flex-row gap-2">
                <CalendarIcon className="h-3.5 lg:h-4 lg:w-4 mt-1 lg:mt-0 text-primary-1000" />
                <p className="font-semibold">
                  From{' '}
                  {fromLowerCaseToCapitilize(
                    formatAsDisplayDatetime(fromDate as string),
                  )}
                </p>
              </section>

              {!isHorizontal && (
                <section className="flex items-center justify-between px-4 py-2"></section>
              )}
            </section>
            <Divider className="lg:hidden" />
            {!isHorizontal && (
              <section className="flex flex-row items-center justify-between px-4 py-3 lg:flex-col lg:ml-auto lg:items-end lg:py-5 lg:px-5">
                <section className="flex justify-end">
                  <FreeCancellation cancellable={cancellable} />
                  <NonRefundable nonCancellable={nonCancellable} />
                  <PartialRefund nonCancellable={partialRefundable} />
                </section>
                <section className="ml-auto">{priceDisplay}</section>
              </section>
            )}

            <Divider />
          </section>
          {isHorizontal && (
            <section className="flex justify-between px-2 py-1 border-t-2">
              <div className="self-center">
                <section className="flex justify-end">
                  <FreeCancellation cancellable={cancellable} />
                  <NonRefundable nonCancellable={nonCancellable} />
                  <PartialRefund nonCancellable={partialRefundable} />
                </section>
              </div>
              <div>
                <section>{priceDisplay}</section>
              </div>
            </section>
          )}
        </a>
      </Link>
    </div>
  );
}

export default ResultCard;
