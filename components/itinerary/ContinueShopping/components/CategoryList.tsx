import CustomArrow from 'components/global/CarouselNew/components/CustomArrow';
import Carousel from 'react-multi-carousel';
import CategoriesIcons from './CategoriesIcons';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categoryList: any[];
}

const CategoryList = ({ categoryList }: CategoryListProps) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      partialVisibilityGutter: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      partialVisibilityGutter: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      partialVisibilityGutter: 20,
    },
  };

  return (
    <Carousel
      partialVisible={true}
      responsive={responsive}
      infinite={false}
      draggable
      autoPlay={false}
      shouldResetAutoplay={false}
      sliderClass="px-5 mt-6 flex gap-3"
      itemClass="!w-[120px] lg:!w-40"
      customLeftArrow={
        <CustomArrow
          className="z-[5] absolute left-2 -translate-y-7"
          position="left"
        />
      }
      customRightArrow={
        <CustomArrow
          className="z-[5] absolute right-2 -translate-y-7"
          position="right"
        />
      }
    >
      {categoryList.map((category) => {
        return (
          <CategoryItem
            key={category.name}
            text={category.name}
            type={category.type}
            url={category.slug}
          />
        );
      })}

      {/*  {categoryList.map((singleCategory, index) => {
        const categoryItem = CategoriesIcons.find((categories) => {
          if (categories.category.includes(singleCategory[0])) {
            return true;
          }
          return false;
        });

        if (categoryItem) {
          return (
            <CategoryItem
              key={categoryItem.category}
              text={categoryItem.text}
              icon={categoryItem.icon}
              url={categoryItem.category}
            />
          );
        }
      })} */}
    </Carousel>
  );
};

export default CategoryList;
