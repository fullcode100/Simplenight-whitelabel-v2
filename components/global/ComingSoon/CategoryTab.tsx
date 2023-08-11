import { useTranslation } from 'react-i18next';
import { IconContainer } from './IconContainer';
import IconWrapper from './IconWrapper';

export default function CategoryTab(props: CategoryTabProps) {
  const [t] = useTranslation('global');

  return (
    <>
      <div
        className={
          // eslint-disable-next-line prettier/prettier, quotes
          'flex-1 text-left font-semibold text-dark-800 transition-all h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-primary-100'
        }
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
          <p className="m-0 text-sm leading-5">{t('Grocery')}</p>
        )}
        {props.type === 'OFF_PHARMACY_OFF_TYPE' && (
          <p className="m-0 text-sm leading-5">{t('pharmacy')}</p>
        )}
        {props.type === 'OFF_MEDICAL_OFF_TYPE' && (
          <p className="m-0 text-sm leading-5">{t('medical')}</p>
        )}
        {props.type === 'OFF_INSURANCE_OFF_TYPE' && (
          <p className="m-0 text-sm leading-5">{t('insurance')}</p>
        )}
        {props.type === 'OFF_BEACHES_AND_POOLS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE16" />
            <p className="m-0 text-sm leading-5 ">{t('beachesAndPools')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CRUISE_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE18" />
            <p className="m-0 text-sm leading-5">{t('cruise')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_SHOPPING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE6" />
            <p className="m-0 text-sm leading-5">{t('shopping')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_MOVIES_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE12" />
            <p className="m-0 text-sm leading-5">{t('movies')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FOOD_DELIVERY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE3" />
            <p className="m-0 text-sm leading-5">{t('foodDelivery')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FAST_FOOD_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE4" />
            <p className="m-0 text-sm leading-5">{t('fastFood')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_COFFEE_TEA_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE5" />
            <p className="m-0 text-sm leading-5">{t('coffeeAndTea')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_ROAD_TRIPS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE7" />
            <p className="m-0 text-sm leading-5">{t('roadTrips')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CAMPING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE8" />
            <p className="m-0 text-sm leading-5">{t('camping')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_HIKING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE9" />
            <p className="m-0 text-sm leading-5">{t('hiking')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_ATTRACTIONS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE10" />
            <p className="m-0 text-sm leading-5">{t('attractions')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_NIGHTLIFE_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE11" />
            <p className="m-0 text-sm leading-5">{t('nightlife')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_SPA_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE13" />
            <p className="m-0 text-sm leading-5">{t('spa')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FITNESS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE14" />
            <p className="m-0 text-sm leading-5">{t('fitness')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_BEAUTY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE15" />
            <p className="m-0 text-sm leading-5">{t('beauty')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_LUXURY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE17" />
            <p className="m-0 text-sm leading-5">{t('luxuryAndLeisure')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_GAS_CHARGING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE1" />
            <p className="m-0 text-sm leading-5 ">{t('GasAndCharging')}</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CAR_WASH_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE2" />
            <p className="m-0 text-sm leading-5">{t('carWash')}</p>
          </IconContainer>
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
