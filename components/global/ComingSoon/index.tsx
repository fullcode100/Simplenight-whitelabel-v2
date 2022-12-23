import CategoryTab from './CategoryTab';

export default function ComingSoon() {
  return (
    <div
      className={
        // eslint-disable-next-line quotes
        " w-full inline-flex flex-col items-start rounded overflow-clip font-['Lato']"
      }
    >
      <div className="pt-5 bg-white gap-2.5 flex flex-col items-start w-full"></div>
      <div className="w-full">
        <div className="w-full pb-10 gap-10 flex flex-col items-start self-stretch">
          <div className="px-6 w-full gap-3 flex flex-col items-start self-stretch text-center text-[rgba(69,69,69,1)]">
            <p className="w-full font-semibold capitalize m-0 text-[32px] leading-[38px]">
              Endless Bookable Experiences For Your Customers
            </p>
            <p className="w-full text-xl font-normal m-0 leading-[26px]">
              We offer over 30 categories of bookable products and services for
              your customers.
            </p>
          </div>
          <div className="pr-6 pl-6 w-full flex flex-col items-start self-stretch text-white text-left font-semibold">
            <div className="w-full gap-3 flex flex-col items-center self-stretch">
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
                <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(13,173,185,1)]">
                  <p className="text-xs leading-tight capitalize m-0">
                    AND MORE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
