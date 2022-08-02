import { TextColor } from 'components/global/Typography/TypographyTypes';

interface CardColored {
  background: string;
  border: string;
  icon: TextColor;
  text: TextColor;
}

const getDefaultColors = (): CardColored => ({
  background: 'bg-white',
  border: 'border-dark-300',
  icon: 'text-primary-1000',
  text: 'text-dark-1000',
});

const getGreenColors = (): CardColored => ({
  background: 'bg-green-100',
  border: 'border-green-300',
  icon: 'text-green-1000',
  text: 'text-green-1000',
});

export const useCardColor = (type: string): CardColored => {
  if (type === 'green') return getGreenColors();
  return getDefaultColors();
};
