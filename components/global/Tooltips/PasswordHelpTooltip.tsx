import React, { useState } from 'react';
import Help from '@/icons/assets/help.svg';
import { useTranslation } from 'react-i18next';

const PasswordHelpTooltip = () => {
  const [t] = useTranslation('profiles');
  const [opened, setOpened] = useState(false);
  return (
    <section>
      <Help
        className={'text-red-900 cursor-pointer'}
        onClick={() => setOpened(!opened)}
      ></Help>
      {opened && (
        <section
          className={
            'flex absolute z-10 rounded-lg shadow-lg bg-white p-3 w-1/3'
          }
        >
          {t(
            'passwordValidationsParams',
            'Password should contain no less than 8 characters and no more than 15. Min. 1 uppercase, 1 number, and 1 symbol. Can’t contain same characters as email.',
          )}
        </section>
      )}
    </section>
  );
};

export default PasswordHelpTooltip;
