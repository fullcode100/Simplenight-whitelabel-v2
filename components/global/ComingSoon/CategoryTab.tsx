import IconWrapper from './IconWrapper';

export default function CategoryTab(props: CategoryTabProps) {
  return (
    <>
      <div
        className={`flex-1 text-left font-semibold font-['Lato'] text-[rgba(102,102,102,1)] transition-all ${
          props.type === 'OFF_GROCERY_OFF_TYPE'
            ? 'px-3 py-2 h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]'
            : ''
        } ${
          props.type === 'OFF_PHARMACY_OFF_TYPE'
            ? 'px-3 py-2 h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]'
            : ''
        } ${
          props.type === 'OFF_MEDICAL_OFF_TYPE'
            ? 'px-3 py-2 h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]'
            : ''
        } ${
          props.type === 'OFF_INSURANCE_OFF_TYPE'
            ? 'px-3 py-2 h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]'
            : ''
        }`}
      >
        {props.type === 'OFF_GROCERY_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE19" />
        )}
        {props.type === 'OFF_PHARMACY_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE20" />
        )}
        {props.type === 'OFF_MEDICAL_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE21" />
        )}
        {props.type === 'OFF_INSURANCE_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE22" />
        )}
        {props.type === 'OFF_GROCERY_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Grocery</p>
        )}
        {props.type === 'OFF_PHARMACY_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Pharmacy</p>
        )}
        {props.type === 'OFF_MEDICAL_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Medical</p>
        )}
        {props.type === 'OFF_INSURANCE_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Insurance</p>
        )}
        {props.type === 'OFF_BEACHES_AND_POOLS_OFF_TYPE' && (
          <div className="py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded pl-[7.33px] pr-[7.33px] bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE16" />
            <p className="text-sm leading-5 m-0">Beaches & Pools</p>
          </div>
        )}
        {props.type === 'OFF_CRUISE_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)] w-[122.33333587646484px]">
            <IconWrapper type="PX_TYPE18" />
            <p className="text-sm leading-5 m-0">Cruise</p>
          </div>
        )}
        {props.type === 'OFF_SHOPPING_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)] w-[122.33333587646484px]">
            <IconWrapper type="PX_TYPE6" />
            <p className="text-sm leading-5 m-0">Shopping</p>
          </div>
        )}
        {props.type === 'OFF_MOVIES_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)] w-[122.33333587646484px]">
            <IconWrapper type="PX_TYPE12" />
            <p className="text-sm leading-5 m-0">Movies</p>
          </div>
        )}
        {props.type === 'OFF_FOOD_DELIVERY_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE3" />
            <p className="text-sm leading-5 m-0">Food Delivery</p>
          </div>
        )}
        {props.type === 'OFF_FAST_FOOD_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE4" />
            <p className="text-sm leading-5 m-0">Fast Food</p>
          </div>
        )}
        {props.type === 'OFF_COFFEE_TEA_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE5" />
            <p className="text-sm leading-5 m-0">Coffee & Tea</p>
          </div>
        )}
        {props.type === 'OFF_ROAD_TRIPS_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE7" />
            <p className="text-sm leading-5 m-0">Road Trips</p>
          </div>
        )}
        {props.type === 'OFF_CAMPING_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE8" />
            <p className="text-sm leading-5 m-0">Camping</p>
          </div>
        )}
        {props.type === 'OFF_HIKING_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE9" />
            <p className="text-sm leading-5 m-0">Hiking</p>
          </div>
        )}
        {props.type === 'OFF_ATTRACTIONS_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE10" />
            <p className="text-sm leading-5 m-0">Attractions</p>
          </div>
        )}
        {props.type === 'OFF_NIGHTLIFE_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE11" />
            <p className="text-sm leading-5 m-0">Nightlife</p>
          </div>
        )}
        {props.type === 'OFF_SPA_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE13" />
            <p className="text-sm leading-5 m-0">Spa</p>
          </div>
        )}
        {props.type === 'OFF_FITNESS_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE14" />
            <p className="text-sm leading-5 m-0">Fitness</p>
          </div>
        )}
        {props.type === 'OFF_BEAUTY_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE15" />
            <p className="text-sm leading-5 m-0">Beauty</p>
          </div>
        )}
        {props.type === 'OFF_LUXURY_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE17" />
            <p className="text-sm leading-5 m-0">Luxury/Leisure</p>
          </div>
        )}
        {props.type === 'OFF_GAS_CHARGING_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE1" />
            <p className="text-sm leading-5 m-0">Gas & Charging</p>
          </div>
        )}
        {props.type === 'OFF_CAR_WASH_OFF_TYPE' && (
          <div className="px-3 py-2 flex-1 h-20 gap-1 flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]">
            <IconWrapper type="PX_TYPE2" />
            <p className="text-sm leading-5 m-0">Car Wash</p>
          </div>
        )}
      </div>
    </>
  );
}

CategoryTab.defaultProps = {
  type: 'OFF_GAS_CHARGING_OFF_TYPE',
};

interface CategoryTabProps {
  type:
    | 'OFF_GAS_CHARGING_OFF_TYPE'
    | 'OFF_CAR_WASH_OFF_TYPE'
    | 'OFF_FOOD_DELIVERY_OFF_TYPE'
    | 'OFF_FAST_FOOD_OFF_TYPE'
    | 'OFF_COFFEE_TEA_OFF_TYPE'
    | 'OFF_SHOPPING_OFF_TYPE'
    | 'OFF_ROAD_TRIPS_OFF_TYPE'
    | 'OFF_CAMPING_OFF_TYPE'
    | 'OFF_HIKING_OFF_TYPE'
    | 'OFF_ATTRACTIONS_OFF_TYPE'
    | 'OFF_NIGHTLIFE_OFF_TYPE'
    | 'OFF_MOVIES_OFF_TYPE'
    | 'OFF_SPA_OFF_TYPE'
    | 'OFF_FITNESS_OFF_TYPE'
    | 'OFF_BEAUTY_OFF_TYPE'
    | 'OFF_BEACHES_AND_POOLS_OFF_TYPE'
    | 'OFF_LUXURY_OFF_TYPE'
    | 'OFF_CRUISE_OFF_TYPE'
    | 'OFF_GROCERY_OFF_TYPE'
    | 'OFF_PHARMACY_OFF_TYPE'
    | 'OFF_MEDICAL_OFF_TYPE'
    | 'OFF_INSURANCE_OFF_TYPE';
}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */
