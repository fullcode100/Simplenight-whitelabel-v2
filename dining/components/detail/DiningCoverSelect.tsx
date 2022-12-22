import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'components/global/Select/Select';

const DiningCoverSelect = ({
  onChange,
  defaultCovers = 1,
}: {
  onChange?: (covers: number) => void;
  defaultCovers?: number;
}) => {
  const [t] = useTranslation('dining');
  const people = [
    `1 ${t('person')}`,
    `2 ${t('people')}`,
    `3 ${t('people')}`,
    `4 ${t('people')}`,
    `5 ${t('people')}`,
    `6 ${t('people')}`,
    `7 ${t('people')}`,
    `8 ${t('people')}`,
    `9 ${t('people')}`,
    `10 ${t('people')}`,
  ];

  const onSelect = (value: string) => {
    const covers = people.findIndex((p) => p === value);
    if (onChange) {
      onChange(covers + 1);
    }
  };

  return (
    <Select
      label={t('tableFor')}
      options={people}
      onChange={onSelect}
      defaultValue={people[defaultCovers - 1]}
    />
  );
};

export default DiningCoverSelect;
