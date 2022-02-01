import React, { ReactElement } from 'react';
import DefaultLayout from 'layouts/DefaultLayout';

export const getDefaultLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
