export const getCurrentSlideForInfinityCarousel = (
  itemsLength: number,
  currentSlide: number,
) => {
  if (currentSlide === itemsLength + 1 || currentSlide === 1) {
    return itemsLength;
  }
  return currentSlide - 1;
};
