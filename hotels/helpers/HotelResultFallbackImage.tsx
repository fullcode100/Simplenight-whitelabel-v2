const FALLBACK_HOTEL_RESULT = '/images/hotels/fallbackHotelResult.jpg';

export const HotelResultFallbackImage = () => {
  return (
    <section
      className="w-full h-[9.75rem] lg:w-full lg:h-full"
      style={{
        backgroundImage: `url(${FALLBACK_HOTEL_RESULT})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
