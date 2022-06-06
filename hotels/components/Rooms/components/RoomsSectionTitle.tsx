import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import SingleBedIcon from 'public/icons/assets/single-bed.svg';

const RoomSectionTitle = () => (
  <p className="flex items-center gap-3 mb-6">
    <IconRoundedContainer className="bg-primary-1000">
      <SingleBedIcon className="text-white" />
    </IconRoundedContainer>
    <span className="h4 text-dark-800">Rooms</span>
  </p>
);

export default RoomSectionTitle;
