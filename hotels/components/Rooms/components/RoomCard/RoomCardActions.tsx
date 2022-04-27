import Button from 'components/global/Button/Button';

const RoomCardActions = () => {
  return (
    <footer className="px-4 py-4">
      <section className="grid grid-cols-2 gap-3">
        <Button
          value="Add to Trip"
          size="full"
          type="outlined"
          textColor="primary"
        />
        <Button value="Book Now" size="full" />
      </section>
    </footer>
  );
};

export default RoomCardActions;
