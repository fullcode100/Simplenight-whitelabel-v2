import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import InformationIcon from 'public/icons/assets/information.svg';

const RoomSectionTitle = () => (
  <p className="flex items-center gap-3 mb-6">
    <IconRoundedContainer className="bg-primary-1000">
      <InformationIcon className="" />
    </IconRoundedContainer>
    <span className="h4 text-dark-800">Rooms</span>
  </p>
);

export default RoomSectionTitle;
