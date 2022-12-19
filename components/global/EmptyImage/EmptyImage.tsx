import { useTranslation } from 'react-i18next';
import ImageEmpty from 'public/icons/assets/image-empty.svg';

interface iEmptyImage {
  noPading?: boolean;
}

const EmptyImage = ({ noPading }: iEmptyImage) => {
  const [t] = useTranslation('global');
  const label = t('imageComingSoon', 'Image Coming Soon');

  const Drawing = () => <ImageEmpty />;

  return (
    <section className="flex flex-col p-3">
      <section
        className={`grid place-content-center ${noPading ? '' : 'py-6'}`}
      >
        <Drawing />
      </section>
      <p className="text-center text-primary-800">{label}</p>
    </section>
  );
};

export default EmptyImage;
