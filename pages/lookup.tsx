import Image from 'next/image';

import HelpSection from 'components/global/HelpSection/HelpSection';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import LookupTitle from 'components/lookup/LookupTitle/LookupTitle';
import LookupForm from 'components/lookup/LookupForm/LookupForm';

const Lookup: NextPageWithLayout = () => {
  return (
    <main>
      <section className="relative h-[480px]">
        <Image
          src={'/images/bg-image-lookup.jpg'}
          alt={''}
          layout={'fill'}
          className="object-cover"
        />
        <section className="relative grid gap-6 pt-6 px-5">
          <LookupTitle />

          <LookupForm />
        </section>
      </section>

      <section className="py-6 px-5 lg:py-12 lg:px-[419px]">
        <HelpSection />
      </section>
    </main>
  );
};

export default Lookup;
