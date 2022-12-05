import { useTranslation } from 'react-i18next';
import { Flight, FlightOffer } from 'flights/types/response/SearchResponse';
import IconBagCabin from 'public/icons/assets/flights/bag_cabin.svg';
import IconBagChecked from 'public/icons/assets/flights/bag_checked.svg';
import IconSeat from 'public/icons/assets/flights/seat.svg';
import IconNoRefund from 'public/icons/assets/flights/no_refund.svg';
import IconNoReschedule from 'public/icons/assets/flights/no_reschedule.svg';
import IconRefund from 'public/icons/assets/flights/refund.svg';
import IconReschedule from 'public/icons/assets/flights/reschedule.svg';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Item } from 'types/cart/CartType';

interface PriceBreakdownBodyProps {
  cartItem: Item;
  item: Flight;
  offers: FlightOffer[];
  currency: string;
  showAllOffers?: boolean;
  handleFlightClick: any;
}

const PriceBreakdownBody = ({
  cartItem,
  item,
  offers,
  currency,
  showAllOffers,
  handleFlightClick,
}: PriceBreakdownBodyProps) => {
  const [t, i18next] = useTranslation('flights');
  const fromLabel = t('from', 'From');
  const includesLabel = t('includes', 'Includes');
  const carryOnBagLabel = t('carryOnBag', 'Carry-On Bag');
  const standardSeatSelectionLabel = t(
    'standardSeatSelection',
    'Standard Seat Selection',
  );
  const checkedBaggageIncludedLabel = t(
    'checkedBaggageIncluded',
    'Checked Baggage Included',
  );
  const fareRestrictionsLabel = t('fareRestrictions', 'Fare Restrictions');
  const noRefundsLabel = t('noRefunds', 'No Refunds');
  const noReschedulingMissedFlightsLabel = t(
    'noReschedulingMissedFlights',
    'No Rescheduling Missed Flights',
  );
  const classicLabel = t('classic', 'Classic');
  const upgradeLabel = t('upgrade', 'Upgrade');
  const selectLabel = t('select', 'Select');

  // add to cart
  const router = useRouter();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookNowText = t('bookNow', 'Book Now');

  const handleAction = async (offer: FlightOffer, url: string) => {
    handleFlightClick(item); // select clicked item
    const itemToBook = Object.assign(
      {
        booking_data: {
          search: {},
          flights: [],
          offer: offer,
        },
      },
      cartItem,
    );
    itemToBook.booking_data.offer = offer;
    let found = false;
    itemToBook.booking_data.flights.forEach((_item: Flight, index: number) => {
      if (_item?.legId === item?.legId) found = true;
    });
    if (!found) itemToBook.booking_data.flights.push(item);
    await addToCart(itemToBook, i18next, store); // add to cart
    router.replace(url); // redirect to: cart or checkout
  };

  return (
    <section className="grid mb-6">
      <ul role="list" className="space-y-4">
        <li className="flex flex-col bg-primary-100 border border-primary-1000 rounded cursor-pointer mb-2">
          <section className="border-b border-dark-300 flex flex-row justify-between px-4 py-4">
            <p className="text-base leading-[22px] text-dark-1000 font-bold font-lato m-0">
              Classic
            </p>
            <p className="text-sm leading-[22px] text-dark-1000 font-normal font-lato m-0">
              {!showAllOffers && (
                <span className="text-dark-800">{fromLabel} </span>
              )}
              <span className="text-base text-dark-1000 font-bold">
                {parseFloat(offers[0]?.totalAmound)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                {currency}
              </span>
            </p>
          </section>

          <section className="flex flex-col lg:flex-row justify-between  px-4 py-4">
            <section className="flex flex-col justify-between">
              <p className="text-sm leading-[22px] text-dark-700 font-bold font-lato pb-2">
                {includesLabel}
              </p>
              <section className="flex flex-row">
                <IconBagCabin className="text-primary-1000 mt-1 mr-3" />
                <p className="text-sm leading-[25px] text-dark-700 font-normal font-lato">
                  {carryOnBagLabel}
                </p>
              </section>
              <section className="flex flex-row">
                <IconSeat className="text-primary-1000 mt-1 mr-3" />
                <p className="text-sm leading-[25px] text-dark-700 font-normal font-lato">
                  {standardSeatSelectionLabel}
                </p>
              </section>
              <section className="flex flex-row">
                <IconBagChecked className="text-primary-1000 mt-1 mr-3" />
                <p className="text-sm leading-[25px] text-dark-700 font-normal font-lato">
                  {checkedBaggageIncludedLabel}
                </p>
              </section>

              <p className="text-sm leading-[22px] text-dark-700 font-bold font-lato pt-4 pb-2">
                {fareRestrictionsLabel}
              </p>
              <section className="flex flex-row">
                <IconNoRefund className="text-dark-1000 mt-1 mr-3" />
                <p className="text-sm leading-[25px] text-dark-500 font-normal font-lato">
                  {noRefundsLabel}
                </p>
              </section>
              <section className="flex flex-row">
                <IconNoReschedule className="text-dark-1000 mt-1 mr-3" />
                <p className="text-sm leading-[25px] text-dark-500 font-normal font-lato">
                  {noReschedulingMissedFlightsLabel}
                </p>
              </section>
            </section>
            {showAllOffers ? (
              <section className="flex flex-col lg:flex-row pt-1 self-end">
                <Button
                  value={addToItineraryText}
                  size="full"
                  type="outlined"
                  textColor="primary"
                  onClick={() => handleAction(offers[0], '/itinerary')}
                  className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mr-2 mt-1"
                />
                <Button
                  value={bookNowText}
                  size="full"
                  onClick={() => handleAction(offers[0], '/checkout/client')}
                  className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mt-1"
                />
              </section>
            ) : (
              <section className="flex flex-col lg:flex-row pt-1 self-end">
                <Button
                  value={selectLabel}
                  size="full"
                  onClick={handleFlightClick}
                  className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mt-1"
                />
              </section>
            )}
          </section>

          {showAllOffers &&
            offers.map(
              (offer: FlightOffer, index: number) =>
                index > 0 && (
                  <section className="border-t border-dark-300">
                    <section className="flex flex-col px-4 py-4 border-l border-primary-1000">
                      <section className="flex flex-row justify-between">
                        <p className="text-sm leading-[22px] text-dark-1000 font-bold font-lato m-0">
                          {upgradeLabel}
                        </p>
                        <p className="text-sm leading-[22px] text-dark-1000 font-normal font-lato m-0">
                          <span className="text-sm text-dark-1000 font-bold">
                            {parseFloat(offer?.totalAmound)
                              .toFixed(2)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}{' '}
                            {currency}
                          </span>
                        </p>
                      </section>
                      <section className="flex flex-col lg:flex-row justify-between">
                        <section className="flex flex-row pt-1">
                          <IconBagCabin className="text-primary-1000 mt-1 mr-2" />
                          <IconSeat className="text-primary-1000 mt-1 mr-2" />
                          <IconBagChecked className="text-primary-1000 mt-1 mr-2" />
                          <IconNoRefund className="text-dark-1000 mt-1 mr-2" />
                          <IconNoReschedule className="text-dark-1000 mt-1 mr-2" />
                        </section>
                        <section className="flex flex-col lg:flex-row pt-1">
                          <Button
                            value={addToItineraryText}
                            size="full"
                            type="outlined"
                            textColor="primary"
                            onClick={() => handleAction(offer, '/itinerary')}
                            className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mr-2 mt-1"
                          />
                          <Button
                            value={bookNowText}
                            size="full"
                            onClick={() =>
                              handleAction(offer, '/checkout/client')
                            }
                            className="text-base font-semibold leading-base whitespace-nowrap px-4 py-1 mt-1"
                          />
                        </section>
                      </section>
                    </section>
                  </section>
                ),
            )}
        </li>
      </ul>
    </section>
  );
};

export default PriceBreakdownBody;
