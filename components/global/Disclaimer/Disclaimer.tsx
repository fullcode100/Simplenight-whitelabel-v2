import InfoCircle from 'public/icons/assets/info-circle.svg';

const Disclaimer = ({ message }: { message: string }) => {
  return (
    <section className="flex bg-white gap-2.5 px-1 border border-gray-300 rounded">
      <span className="mt-1 text-primary-1000 h-5">
        <InfoCircle />
      </span>
      <p className="font-semibold text-[14px] leading-[20px]">{message}</p>
    </section>
  );
};

export default Disclaimer;
