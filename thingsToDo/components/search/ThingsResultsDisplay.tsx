// Libraries
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// models
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ResultCard from './ResultCard/ResultCard';
// mocks
import { thingToDo } from '../../mocks/thingToDoMock';
import ThingsCancellable from './ThingsCancellable/ThingsCancellable';
import PriceDisplay from '../PriceDisplay/PriceDisplay';

interface ThingsResultsDisplayProps {
  ThingsCategory: CategoryOption;
}

const ThingsResultsDisplay = ({
  ThingsCategory,
}: ThingsResultsDisplayProps) => {
  const [t, i18next] = useTranslation('things');
  const thingsToDoLabel = t('thingsToDo', 'Things to Do');

  const resultsMock = [thingToDo];
  const ThingsToDoList = () => {
    return (
      <ul>
        {resultsMock.map((thingToDo) => {
          const {
            id,
            name,
            address,
            reviews: { rating, amount: reviewsAmount },
            phone_number: phoneNumber,
            tags,
            images,
            cancellation_policy: cancellationPolicy,
            rates,
          } = thingToDo;
          const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

          return (
            <div key={id}>
              <ResultCard
                icon={ThingsCategory.icon}
                categoryName={thingsToDoLabel}
                item={thingToDo}
                title={name}
                images={images}
                address={formattedLocation}
                className=" flex-0-0-auto"
                rating={rating}
                reviewsAmount={reviewsAmount}
                phoneNumber={phoneNumber}
                tags={tags}
                cancellable={
                  <ThingsCancellable cancellationPolicy={cancellationPolicy} />
                }
                priceDisplay={
                  <PriceDisplay
                    rate={rates}
                    totalLabel={`USD ${rates.total.formatted}`}
                  />
                }
              />
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="pt-6 px-4">
      <ThingsToDoList />
    </div>
  );
};

export default ThingsResultsDisplay;