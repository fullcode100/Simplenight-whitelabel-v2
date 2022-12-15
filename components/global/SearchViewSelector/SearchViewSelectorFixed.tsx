import SearchViewSelector from './SearchViewSelector';

const SearchViewSelectorFixed = () => {
  return (
    <>
      <section className="pt-16 lg:hidden" />
      <section className="fixed bottom-0 left-0 z-10 w-full px-4 py-2 bg-white lg:hidden shadow-[0_0px_10px_0px_rgba(0,0,0,0.1)]">
        <SearchViewSelector />
      </section>
    </>
  );
};

export default SearchViewSelectorFixed;
