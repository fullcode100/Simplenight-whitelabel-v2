import UserInterfaceClose from './assets/UserInterfaceClose';
import Spa from './assets/Spa';
import Fitness from './assets/Fitness';
import Beauty from './assets/Beauty';
import Beachesandpools from './assets/Beachesandpools';
import Luxury from './assets/Luxury';
import Cruise from './assets/Cruise';
import Grocery from './assets/Grocery';
import Pharmacy from './assets/Pharmacy';
import Medical from './assets/Medical';
import Insurance from './assets/Insurance';
import Fuel from './assets/Fuel';
import Carwash from './assets/Carwash';
import Fooddelivery from './assets/Fooddelivery';
import Fastfood from './assets/Fastfood';
import Coffeetea from './assets/Coffeetea';
import Shopping from './assets/Shopping';
import Roadtrip from './assets/Roadtrip';
import Camping from './assets/Camping';
import Hiking from './assets/Hiking';
import Attractions from './assets/Attractions';
import Nightlife from './assets/Nightlife';
import Movies from './assets/Movies';
import { PlusIcon } from '@heroicons/react/solid';

export default function IconWrapper(props: IconWrapperProps) {
  return (
    <>
      <div
        className={`relative overflow-clip transition-all ${
          props.type === 'PX_TYPE' ? 'w-6 h-6' : 'w-5 h-5'
        }`}
      >
        {props.type === 'PX_TYPE' && <UserInterfaceClose />}
        {props.type === 'PX_TYPE13' && <Spa />}
        {props.type === 'PX_TYPE14' && <Fitness />}
        {props.type === 'PX_TYPE15' && <Beauty />}
        {props.type === 'PX_TYPE16' && <Beachesandpools />}
        {props.type === 'PX_TYPE17' && <Luxury />}
        {props.type === 'PX_TYPE18' && <Cruise />}
        {props.type === 'PX_TYPE19' && <Grocery />}
        {props.type === 'PX_TYPE20' && <Pharmacy />}
        {props.type === 'PX_TYPE21' && <Medical />}
        {props.type === 'PX_TYPE22' && <Insurance />}
        {props.type === 'PX_TYPE1' && <Fuel />}
        {props.type === 'PX_TYPE2' && <Carwash />}
        {props.type === 'PX_TYPE3' && <Fooddelivery />}
        {props.type === 'PX_TYPE4' && <Fastfood />}
        {props.type === 'PX_TYPE5' && <Coffeetea />}
        {props.type === 'PX_TYPE6' && <Shopping />}
        {props.type === 'PX_TYPE7' && <Roadtrip />}
        {props.type === 'PX_TYPE8' && <Camping />}
        {props.type === 'PX_TYPE9' && <Hiking />}
        {props.type === 'PX_TYPE10' && <Attractions />}
        {props.type === 'PX_TYPE11' && <Nightlife />}
        {props.type === 'PX_TYPE12' && <Movies />}
        {props.type === 'PLUS' && <PlusIcon />}
      </div>
    </>
  );
}

IconWrapper.defaultProps = {
  type: 'PX_TYPE',
};

interface IconWrapperProps {
  type:
    | 'PX_TYPE'
    | 'PX_TYPE1'
    | 'PX_TYPE2'
    | 'PX_TYPE3'
    | 'PX_TYPE4'
    | 'PX_TYPE5'
    | 'PX_TYPE6'
    | 'PX_TYPE7'
    | 'PX_TYPE8'
    | 'PX_TYPE9'
    | 'PX_TYPE10'
    | 'PX_TYPE11'
    | 'PX_TYPE12'
    | 'PX_TYPE13'
    | 'PX_TYPE14'
    | 'PX_TYPE15'
    | 'PX_TYPE16'
    | 'PX_TYPE17'
    | 'PX_TYPE18'
    | 'PX_TYPE19'
    | 'PX_TYPE20'
    | 'PX_TYPE21'
    | 'PX_TYPE22'
    | 'PLUS';
}
