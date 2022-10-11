import SearchViewSelector from './SearchViewSelector';

const SearchViewSelectorFixed = () => {
  return (
    <>
      <section className="pt-16 lg:hidden" />
      <section className="bg-white fixed bottom-0 left-0 px-4 py-2 w-full lg:hidden">
        <SearchViewSelector />
      </section>
    </>
  );
};

export default SearchViewSelectorFixed;
