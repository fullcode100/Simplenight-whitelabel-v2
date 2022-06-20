import React, { ReactElement } from 'react';
import HomepageLayout from 'layouts/HomepageLayout';

export const getHomepageLayout = (page: ReactElement) => (
  <HomepageLayout>{page}</HomepageLayout>
);
