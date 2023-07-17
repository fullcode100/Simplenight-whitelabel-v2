import AirSmallIcon from 'public/icons/assets/amenities/air-small.svg';
import AirLargeIcon from 'public/icons/assets/amenities/air-large.svg';
import AllInclusiveSmallIcon from 'public/icons/assets/amenities/all-inclusive-small.svg';
import AllInclusiveIcon from 'public/icons/assets/amenities/icon_amenities_all_inclusive.svg';
import BarIcon from 'public/icons/assets/amenities/icon_amenities_bar.svg';
import BreakfastLargeIcon from 'public/icons/assets/amenities/breakfast-large.svg';
import BreakfastSmallIcon from 'public/icons/assets/amenities/breakfast-small.svg';
import BedsheetsProvidedIcon from 'public/icons/assets/amenities/icon_amenities_bedsheets_provided.svg';
import CableSatelliteTVIcon from 'public/icons/assets/amenities/icon_amenities_cable_satellite_tv_service.svg';
import CableTVIcon from 'public/icons/assets/amenities/icon_amenities_cable_tv_service.svg';
import CasinoIcon from 'public/icons/assets/amenities/icon_amenities_casino.svg';
import CoffeeTeaMakerIcon from 'public/icons/assets/amenities/icon_amenities_coffee_tea_maker.svg';
import DailyHousekeepingIcon from 'public/icons/assets/amenities/icon_amenities_daily_housekeeping.svg';
import EcoFriendlyToiletriesIcon from 'public/icons/assets/amenities/icon_amenities_eco_friendly_toiletries.svg';
import FlatPanelTVIcon from 'public/icons/assets/amenities/icon_amenities_flat_panel_tv.svg';
import FreeBreakfastIcon from 'public/icons/assets/amenities/icon_amenities_free_breakfast.svg';
import FreeCribsIcon from 'public/icons/assets/amenities/icon_amenities_free_cribs_infant_beds.svg';
import FreeLocalCallsIcon from 'public/icons/assets/amenities/icon_amenities_free_local_calls.svg';
import FreeToiletriesIcon from 'public/icons/assets/amenities/icon_amenities_free_toiletries.svg';
import GymIcon from 'public/icons/assets/amenities/icon_amenities_gym.svg';
import HairDryerIcon from 'public/icons/assets/amenities/icon_amenities_hair_dryer.svg';
import HighSpeedInternetIcon from 'public/icons/assets/amenities/icon_amenities_high_speed_internet_access.svg';
import HotTubLargeIcon from 'public/icons/assets/amenities/hot-tub-large.svg';
import HotTubIcon from 'public/icons/assets/amenities/icon_amenities_hot_tub.svg';
import InternetAccessIcon from 'public/icons/assets/amenities/icon_amenities_internet_access.svg';
import InRoomClimateControlIcon from 'public/icons/assets/amenities/icon_amenities_in_room_climate_control.svg';
import InRoomSafeIcon from 'public/icons/assets/amenities/icon_amenities_in_room_safe.svg';
import IroningBoardIcon from 'public/icons/assets/amenities/icon_amenities_ironing_board.svg';
import KingBedSmallIcon from 'public/icons/assets/amenities/king-bed-small.svg';
import LaundryIcon from 'public/icons/assets/amenities/icon_amenities_laundry.svg';
import LaundryLargeIcon from 'public/icons/assets/amenities/laundry-large.svg';
import NonSmokingIcon from 'public/icons/assets/amenities/icon_amenities_non_smoking.svg';
import PayMoviesIcon from 'public/icons/assets/amenities/icon_amenities_pay_movies.svg';
import PetFriendlyIcon from 'public/icons/assets/amenities/icon_amenities_pet_friendly.svg';
import PetIcon from 'public/icons/assets/amenities/pet-small.svg';
import PoolIcon from 'public/icons/assets/amenities/icon_amenities_pool.svg';
import PrivateBathroomIcon from 'public/icons/assets/amenities/icon_amenities_private_bathroom.svg';
import RefrigeratorIcon from 'public/icons/assets/amenities/icon_amenities_refrigerator.svg';
import RestaurantIcon from 'public/icons/assets/amenities/icon_amenities_restaurant.svg';
import RollawayExtraBedsIcon from 'public/icons/assets/amenities/icon_amenities_rollaway_extra_beds.svg';
import RoomOnlyIcon from 'public/icons/assets/amenities/icon_amenities_room_only.svg';
import RoomServiceIcon from 'public/icons/assets/amenities/icon_amenities_room_service.svg';
import SaunaIcon from 'public/icons/assets/amenities/icon_amenities_shower_tub_combination.svg';
import SpaIcon from 'public/icons/assets/amenities/icon_amenities_spa.svg';
import SpaLargeIcon from 'public/icons/assets/amenities/spa-large.svg';
import TelevisionIcon from 'public/icons/assets/amenities/icon_amenities_television.svg';
import TowelsProvidedIcon from 'public/icons/assets/amenities/icon_amenities_towels_provided.svg';
import TVSizeIcon from 'public/icons/assets/amenities/icon_amenities_tv_size.svg';
import TVSizeMeasurementIcon from 'public/icons/assets/amenities/icon_amenities_tv_size_measurement.svg';
import WifiLargeIcon from 'public/icons/assets/amenities/wifi-large.svg';
import WifiIcon from 'public/icons/assets/amenities/icon_amenities_wifi.svg';

const amenitiesIcons = [
  {
    options: [
      'A.C.',
      'Air Conditioning',
      'Air conditioned',
      'In-room climate control (heating)',
    ],
    iconLarge: <AirLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <AirSmallIcon />,
  },
  {
    options: ['All Inclusive'],
    iconLarge: <AllInclusiveIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <AllInclusiveSmallIcon />,
  },
  {
    options: ['Bar', 'Minibar'],
    iconLarge: <BarIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <BarIcon />,
  },
  {
    options: ['Breakfast'],
    iconLarge: <BreakfastLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <BreakfastSmallIcon />,
  },
  {
    options: [
      'Bedsheets provided',
      'Down comforter',
      'Hypo-allergenic bedding available',
      'Change of bed sheets (on request)',
      'Egyptian-cotton sheets',
    ],
    iconLarge: <BedsheetsProvidedIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <BedsheetsProvidedIcon />,
  },
  {
    options: ['Premium TV channels'],
    iconLarge: <CableSatelliteTVIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <CableSatelliteTVIcon />,
  },
  {
    options: ['Cable TV service'],
    iconLarge: <CableTVIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <CableTVIcon />,
  },
  {
    options: ['Casino'],
    iconLarge: <CasinoIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <CasinoIcon />,
  },
  {
    options: ['Coffee/tea maker'],
    iconLarge: <CoffeeTeaMakerIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <CoffeeTeaMakerIcon />,
  },
  {
    options: ['Daily housekeeping', 'Housekeeping on request'],
    iconLarge: <DailyHousekeepingIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <DailyHousekeepingIcon />,
  },
  {
    options: ['Designer toiletries', 'Eco-friendly toiletries'],
    iconLarge: <EcoFriendlyToiletriesIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <EcoFriendlyToiletriesIcon />,
  },
  {
    options: ['Flat-panel TV'],
    iconLarge: <FlatPanelTVIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <FlatPanelTVIcon />,
  },
  {
    options: ['Free Breakfast'],
    iconLarge: <FreeBreakfastIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <FreeBreakfastIcon />,
  },
  {
    options: [
      'Free cribs/infant beds',
      'Cribs/infant beds (surcharge)',
      'No cribs (infant beds)',
    ],
    iconLarge: <FreeCribsIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <FreeCribsIcon />,
  },
  {
    options: [
      'Free Local Calls',
      'Telephone accessibility kit',
      'Phone',
      'Telephone accessibility kit',
    ],
    iconLarge: <FreeLocalCallsIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <FreeLocalCallsIcon />,
  },
  {
    options: ['Designer toiletries'],
    iconLarge: <FreeToiletriesIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <FreeToiletriesIcon />,
  },
  {
    options: ['Fitness', 'Gym'],
    iconLarge: <GymIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <GymIcon />,
  },
  {
    options: ['Hair Dryer'],
    iconLarge: <HairDryerIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <HairDryerIcon />,
  },
  {
    options: [
      'High Speed Internet',
      'Free wired internet',
      'High-speed internet access',
      'Internet access (complimentary)',
    ],
    iconLarge: <HighSpeedInternetIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <HighSpeedInternetIcon />,
  },
  {
    options: ['Hot Tub'],
    iconLarge: <HotTubLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <HotTubIcon />,
  },
  {
    options: [
      'Room Climate Control',
      'In-room climate control (air conditioning)',
    ],
    iconLarge: <InRoomClimateControlIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <InRoomClimateControlIcon />,
  },
  {
    options: [
      'In Room Safe',
      'In-room safe',
      'In-room safe (laptop compatible)',
    ],
    iconLarge: <InRoomSafeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <InRoomSafeIcon />,
  },
  {
    options: ['Internet Access', 'Free wired internet'],
    iconLarge: <InternetAccessIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <InternetAccessIcon />,
  },
  {
    options: ['Ironing Board', 'Iron/ironing board'],
    iconLarge: <IroningBoardIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <IroningBoardIcon />,
  },
  {
    options: ['King Bed', 'Pillowtop mattress', 'Premium bedding'],
    iconLarge: <KingBedSmallIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <KingBedSmallIcon />,
  },
  {
    options: ['Laundry'],
    iconLarge: <LaundryLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <LaundryIcon />,
  },
  {
    options: ['Non Smoking', 'Non-Smoking', 'Smoking and Non-Smoking'],
    iconLarge: <NonSmokingIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <NonSmokingIcon />,
  },
  {
    options: ['Pay Movies'],
    iconLarge: <PayMoviesIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PayMoviesIcon />,
  },
  {
    options: ['Pet Friendly', 'Pet-friendly room', 'Pets allowed'],
    iconLarge: <PetFriendlyIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PetIcon />,
  },
  {
    options: ['Pool'],
    iconLarge: <PoolIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PoolIcon />,
  },
  {
    options: [
      'Private Bathroom',
      'Bathtub only',
      'Bathtub or shower',
      'Deep soaking bathtub',
      'Portable shower seat',
      'Roll-in shower',
      'Accessible bathtub',
    ],
    iconLarge: <PrivateBathroomIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <PrivateBathroomIcon />,
  },
  {
    options: [
      'Refrigerator',
      'Mini-fridge',
      'Refrigerator (surcharge)',
      'Refrigerator (on request)',
    ],
    iconLarge: <RefrigeratorIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RefrigeratorIcon />,
  },
  {
    options: ['Restaurant', 'Kitchen'],
    iconLarge: <RestaurantIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RestaurantIcon />,
  },
  {
    options: [
      'Rollaway Extra Beds',
      'No rollaway/extra beds',
      'Rollaway/extra beds (free)',
      'Rollaway/extra beds (surcharge)',
    ],
    iconLarge: <RollawayExtraBedsIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RollawayExtraBedsIcon />,
  },
  {
    options: ['Room Only'],
    iconLarge: <RoomOnlyIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RoomOnlyIcon />,
  },
  {
    options: [
      'Room Service',
      'Room service (24 hours)',
      'Room service (limited hours)',
    ],
    iconLarge: <RoomServiceIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <RoomServiceIcon />,
  },
  {
    options: ['Sauna', 'Shower/tub combination'],
    iconLarge: <SaunaIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <SaunaIcon />,
  },
  {
    options: ['Spa'],
    iconLarge: <SpaLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <SpaIcon />,
  },
  {
    options: [
      'Television',
      'HDTV',
      'Cable/satellite TV service',
      'Closed captioned TV',
      'LED TV',
      'Digital TV service',
      'LCD TV',
      'Plasma TV',
      'Satellite TV service',
      'Smart TV',
      'TV size: 40',
      'TV size: 42',
      'TV size: 55',
      'TV size: 60',
      'TV size: 70',
    ],
    iconLarge: <TelevisionIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <TelevisionIcon />,
  },
  {
    options: ['TV Size Measurement'],
    iconLarge: <TVSizeMeasurementIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <TVSizeMeasurementIcon />,
  },
  {
    options: [
      'Towels Provided',
      'Free toiletries',
      'Change of towels (on request)',
    ],
    iconLarge: <TowelsProvidedIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <TowelsProvidedIcon />,
  },
  {
    options: [
      'TV size measurement',
      'TV size',
      'TV size measurement: inch',
      'TV size: 32',
      'TV size: 50',
    ],
    iconLarge: <TVSizeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <TVSizeIcon />,
  },
  {
    options: [
      'WiFi',
      'Wi-Fi',
      'Free WiFi',
      'WiFi (surcharge)',
      'WiFi speed - 25+ Mbps',
      'Wireless internet access',
      'WiFi speed - 50+ Mbps',
    ],
    iconLarge: <WifiLargeIcon className="h-12 w-12 mx-auto" />,
    iconSmall: <WifiIcon />,
  },
];

export default amenitiesIcons;
