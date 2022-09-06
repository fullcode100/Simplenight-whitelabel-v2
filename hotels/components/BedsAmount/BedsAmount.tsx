import { useTranslation } from 'react-i18next';

interface BedAmountProps {
  doubleBeds: number;
  queenBeds: number;
  kingBeds: number;
  otherBeds: number;
}

const BedsAmount = ({
  doubleBeds,
  queenBeds,
  kingBeds,
  otherBeds,
}: BedAmountProps) => {
  const [t] = useTranslation('hotels');
  const bedsAmountLabel = t('bedsAmount', 'Beds Amount');
  const doubleBedsLabel = t('doubleBeds', 'Double Beds');
  const queenBedsLabel = t('queenBeds', 'Queen Beds');
  const kingBedsLabel = t('kingBeds', 'King Beds');
  const otherBedsLabel = t('otherBeds', 'Other Beds');

  const BedItem = ({
    bedTitle,
    bedAmount,
  }: {
    bedTitle: string;
    bedAmount: number;
  }) => (
    <section className="flex flex-row justify-between">
      <p>{bedTitle}</p>
      <p>{bedAmount}</p>
    </section>
  );

  return (
    <section className="flex flex-col gap-2 text-sm leading-[22px]">
      <p className="font-semibold text-dark-800">{bedsAmountLabel}</p>
      <section className="text-dark-1000">
        <BedItem bedTitle={doubleBedsLabel} bedAmount={doubleBeds} />
        <BedItem bedTitle={queenBedsLabel} bedAmount={queenBeds} />
        <BedItem bedTitle={kingBedsLabel} bedAmount={kingBeds} />
        <BedItem bedTitle={otherBedsLabel} bedAmount={otherBeds} />
      </section>
    </section>
  );
};

export default BedsAmount;
