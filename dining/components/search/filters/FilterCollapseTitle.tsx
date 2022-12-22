import React from 'react';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';

const FilterCollapseTitle = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <CollapseUnbordered
    initialState={true}
    title={
      <label className="text-[18px] font-semibold text-dark-1000">
        {title}
      </label>
    }
    body={children}
  />
);

export default FilterCollapseTitle;
