import React, { ReactElement } from 'react';
import SearchLayout from 'layouts/SearchLayout';

export const getSearchLayout = (page: ReactElement) => (
  <SearchLayout>{page}</SearchLayout>
);
