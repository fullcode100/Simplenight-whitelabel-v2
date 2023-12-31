import { useTranslation } from 'react-i18next';
import CategoryTab from './CategoryTab';
import IconWrapper from './IconWrapper';

export default function ComingSoon() {
  const [t] = useTranslation('global');

  return (
    <div
      className={
        // eslint-disable-next-line quotes
        " w-full inline-flex flex-col items-start rounded overflow-clip font-['Lato']"
      }
    >
      <div className="pt-5 bg-white gap-2.5 flex flex-col items-start w-full"></div>
      <div className="w-full">
        <div className="flex flex-col items-start self-stretch w-full gap-10 pb-10">
          <div className="px-6 w-full gap-3 flex flex-col items-start self-stretch text-center text-[rgba(69,69,69,1)]">
            <p className="w-full font-semibold capitalize m-0 text-[32px] leading-[38px]">
              {t('endlessBookableMessage')}
            </p>
            <p className="w-full text-xl font-normal m-0 leading-[26px]">
              {t('offeredCategoriesMessage')}
            </p>
          </div>
          <div className="flex flex-col items-start self-stretch w-full pl-6 pr-6 font-semibold text-left text-white">
            <div className="flex flex-col items-center self-stretch w-full gap-3">
              <div
                className="w-full"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 3fr))',
                  gap: 12,
                  display: 'grid',
                }}
              >
                <CategoryTab type="OFF_GAS_CHARGING_OFF_TYPE" />
                <CategoryTab type="OFF_CAR_WASH_OFF_TYPE" />
                <CategoryTab type="OFF_FOOD_DELIVERY_OFF_TYPE" />
                <CategoryTab type="OFF_FAST_FOOD_OFF_TYPE" />
                <CategoryTab type="OFF_COFFEE_TEA_OFF_TYPE" />
                <CategoryTab type="OFF_SHOPPING_OFF_TYPE" />
                <CategoryTab type="OFF_ROAD_TRIPS_OFF_TYPE" />
                <CategoryTab type="OFF_CAMPING_OFF_TYPE" />
                <CategoryTab type="OFF_HIKING_OFF_TYPE" />
                <CategoryTab type="OFF_ATTRACTIONS_OFF_TYPE" />
                <CategoryTab type="OFF_NIGHTLIFE_OFF_TYPE" />
                <CategoryTab type="OFF_MOVIES_OFF_TYPE" />
                <CategoryTab type="OFF_SPA_OFF_TYPE" />
                <CategoryTab type="OFF_FITNESS_OFF_TYPE" />
                <CategoryTab type="OFF_BEAUTY_OFF_TYPE" />
                <CategoryTab type="OFF_BEACHES_AND_POOLS_OFF_TYPE" />
                <CategoryTab type="OFF_LUXURY_OFF_TYPE" />
                <CategoryTab type="OFF_CRUISE_OFF_TYPE" />
                <CategoryTab type="OFF_GROCERY_OFF_TYPE" />
                <CategoryTab type="OFF_PHARMACY_OFF_TYPE" />
                <CategoryTab type="OFF_MEDICAL_OFF_TYPE" />
                <CategoryTab type="OFF_INSURANCE_OFF_TYPE" />
                <div className="flex flex-col items-center justify-center flex-1 flex-grow h-20 gap-1 px-3 py-2 rounded bg-primary-1000">
                  <IconWrapper type="PLUS" />
                  <p className="m-0 text-sm leading-5">{t('andMore')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
