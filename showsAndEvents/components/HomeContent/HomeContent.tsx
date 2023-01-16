import React from 'react';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import TrendingCarousel from './Trending';
import FeaturedCarousel from './Featured';

interface HomeContentProps {
  Category: CategoryOption;
}

const HomeContent = ({ Category }: HomeContentProps) => {
  return (
    <section className="grid gap-8 px-5 py-6 lg:px-20 lg:py-12">
      <TrendingCarousel Category={Category} />
      {/* <FeaturedCarousel Category={Category} /> */}
    </section>
  );
};

export default HomeContent;
