import Close from 'public/icons/assets/cross.svg';

interface ModalHeaderProps {
  text: string;
  setOpen: (open: boolean) => void;
}

const ModalHeader = ({ text, setOpen }: ModalHeaderProps) => (
  <header className="flex justify-between mb-4 items-center text-dark-1000">
    <h2 className="text-base font-semibold">{text}</h2>
    <button className="" onClick={() => setOpen(false)}>
      <Close />
    </button>
  </header>
);

export default ModalHeader;
