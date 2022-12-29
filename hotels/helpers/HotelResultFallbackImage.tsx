const FALLBACK_HOTEL_RESULT = '/images/hotels/fallbackHotelResult.jpg';

export const HotelResultFallbackImage = () => {
  return (
    <section
      className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] "
      style={{
        backgroundImage: `url(${FALLBACK_HOTEL_RESULT})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
