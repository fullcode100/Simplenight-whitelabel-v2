import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import useMediaViewport from 'hooks/media/useMediaViewport';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { useTranslation } from 'react-i18next';
import { useOnOutsideClick } from 'hooks/windowInteraction/useOnOutsideClick';

interface DropdowMenuProps {
  items: {
    label: string;
    icon?: any;
    value: string;
  }[];
  onChange: (value: string) => void;
  alingDirection: 'left' | 'right';
  menuIcon?: any;
  label: string;
  active?: string;
}

const DropdownMenu = ({
  items,
  onChange,
  alingDirection,
  menuIcon,
  label,
  active,
}: DropdowMenuProps) => {
  const ref = useRef<HTMLElement>(null);
  const activeItem = items?.find((item) => item.value === active);
  const [showMenu, setShowMenu] = useState(false);
  const [tg] = useTranslation('global');
  const applyText = tg('apply', 'Apply');

  useOnOutsideClick(ref, () => {
    setShowMenu(false);
  });
  const { isDesktop } = useMediaViewport();

  return (
    <section className="relative justify-start tems-center">
      <button
        className="flex items-center whitespace-nowrap bg-white rounded border border-gray-300 hover:border-dark-500 focus:border-dark-1000 w-full h-8 p-[8px] text-sm text-dark-1000"
        onClick={() => setShowMenu((p) => !p)}
      >
        <span className="flex flex-row items-center gap-1 text-xs font-semibold text-left text-dark-1000">
          <span>{activeItem?.icon || menuIcon}</span>
          <span>{activeItem?.label}</span>
        </span>
      </button>
      {isDesktop ? (
        <section
          className={`absolute z-[21] border border-dark-300 rounded shadow-container top-[100%] ${alingDirection}-0 bg-white w-[256px] transition-all duration-500 text-dark-1000 ${
            !showMenu && 'opacity-0 invisible'
          }`}
          ref={ref}
        >
          {items.map(({ label, icon, value }, index) => (
            <button
              className={classnames(
                'flex items-center border-b border-gray-300 w-full h-11 py-2 px-[13px] text-sm',
                value === active
                  ? 'bg-primary-100 text-primary-1000 fill-primary-1000'
                  : 'bg-white text-dark-1000 hover:bg-primary-100 hover:text-primary-1000 hover:fill-primary-1000',
              )}
              onClick={() => {
                onChange(value);
                setShowMenu(false);
              }}
              key={index}
            >
              <span className="flex flex-row items-center gap-1 text-xs font-semibold text-left">
                <span>{icon}</span>
                <span>{label}</span>
              </span>
            </button>
          ))}
        </section>
      ) : (
        <FullScreenModal
          open={showMenu}
          closeModal={() => setShowMenu(false)}
          title={label}
          primaryButtonText={applyText}
          primaryButtonAction={() => setShowMenu(false)}
          hasMultipleActions={false}
          className={
            'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
          }
        >
          <div className="h-full py-6">
            {items.map(({ label, icon, value }, index) => (
              <button
                className={classnames(
                  'flex items-center border-b border-gray-300 w-full h-11 py-2 px-[13px] text-sm',
                  value === active
                    ? 'bg-primary-100 text-primary-1000 fill-primary-1000'
                    : 'bg-white text-dark-1000 hover:bg-primary-100 hover:text-primary-1000 hover:fill-primary-1000',
                )}
                onClick={() => onChange(value)}
                key={index}
              >
                <span className="flex flex-row items-center gap-1 text-xs font-semibold text-left">
                  <span>{label}</span>
                </span>
              </button>
            ))}
          </div>
        </FullScreenModal>
      )}
    </section>
  );
};

export default DropdownMenu;
