import React, { ReactNode } from 'react';
import classnames from 'classnames';

import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';

interface ViewActionsProps {
  isListView: boolean;
  setview: React.Dispatch<React.SetStateAction<string>>;
}

export const ViewActions = ({ isListView, setview }: ViewActionsProps) => {
  return (
    <section className="flex rounded-4 overflow-hidden w-[5.5rem] border border-primary-1000">
      <ViewButton isListView={isListView} setview={setview} viewParam="list">
        <ListIcon className="w-[1.3rem] h-[1.3rem]" />
      </ViewButton>
      <ViewButton isListView={isListView} setview={setview} viewParam="map">
        <MapIcon className="w-[1.3rem] h-[1.3rem]" />
      </ViewButton>
    </section>
  );
};

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
  isListView: boolean;
  setview: React.Dispatch<React.SetStateAction<string>>;
}

const ViewButton = ({
  children,
  viewParam,
  isListView,
  setview,
}: ViewButtonProps) => {
  const active = viewParam === 'list' ? isListView : !isListView;
  const onClick = () => {
    setview(viewParam);
  };
  return (
    <button
      onClick={onClick}
      className={classnames(
        'h-[2.75rem] w-[2.75rem] grid place-content-center',
        {
          'bg-white text-primary-1000': !active,
          'bg-primary-1000 text-white': active,
        },
      )}
    >
      {children}
    </button>
  );
};
