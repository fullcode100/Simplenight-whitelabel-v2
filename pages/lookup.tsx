import Image from 'next/image';

import HelpSection from 'components/global/HelpSection/HelpSection';
import { NextPageWithLayout } from 'types/layout/pageTypes';
import LookupTitle from 'components/lookup/LookupTitle/LookupTitle';
import LookupForm from 'components/lookup/LookupForm/LookupForm';

const Lookup: NextPageWithLayout = () => {
  return (
    <main>
      <section className="relative h-[480px] lg:max-h-[360px] lg:grid lg:place-items-center">
        <Image
          src={'/images/bg-image-lookup.jpg'}
          alt={''}
          layout={'fill'}
          className="object-cover"
        />
        <section className="relative grid gap-6 px-5 lg:p-6 lg:w-[45%] lg:mx-auto">
          <LookupTitle />

          <LookupForm />
        </section>
      </section>
      <section className="py-6 px-5 lg:w-[45%] lg:mx-auto lg:py-8">
        <HelpSection titleClass="lg:mt-[0px] lg:text-3.5xl" />
      </section>
    </main>
  );
};

export default Lookup;
