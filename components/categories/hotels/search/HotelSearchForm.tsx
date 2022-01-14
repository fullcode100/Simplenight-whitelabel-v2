import LocationAutoComplete from '../../../global/AutoComplete/LocationAutoComplete';

const HotelSearchForm = () => {
  return (
    <section>
      <LocationAutoComplete
        className="w-full"
        onSelect={() => console.log('hi!')}
      />
    </section>
  );
};

export default HotelSearchForm;
