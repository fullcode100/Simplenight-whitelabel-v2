import NumberInputWithButtons from './components/NumberInputWithButtons/NumberInputWithButtons';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  withButtons?: boolean;
  [key: string]: any;
}

const NumberInput = ({ withButtons, ...others }: NumberInputProps) => {
  if (withButtons) return <NumberInputWithButtons {...others} />;

  return <input type="number" />;
};

export default NumberInput;
