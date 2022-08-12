import React from 'react';
import brandsList from '../ConfirmationPayment/brandsList';

interface Props {
  cardBrand: string;
}

const CardLogo = ({ cardBrand }: Props) => {
  const icon = brandsList.find((brand) => {
    if (brand.name.includes(cardBrand)) {
      return true;
    }
    return false;
  });

  return (
    <section className="w-10 h-[22px] bg-white border border-dark-300 flex items-center justify-center rounded-4">
      {icon?.icon}
    </section>
  );
};

export default CardLogo;
