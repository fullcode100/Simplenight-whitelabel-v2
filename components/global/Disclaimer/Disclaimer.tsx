import InfoCircle from 'public/icons/assets/info-circle.svg';

const Disclaimer = ({ message }: { message: string }) => {
  return (
    <section className="flex bg-white gap-2.5 px-1 border border-gray-300 rounded items-center">
      <span className="h-5 my-1 text-primary-1000">
        <InfoCircle />
      </span>
      <p className="lg:mt-1 font-semibold text-xs leading-[20px]">{message}</p>
    </section>
  );
};

export default Disclaimer;
