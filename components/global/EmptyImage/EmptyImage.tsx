import { useTranslation } from 'react-i18next';
import ImageEmpty from 'public/icons/assets/image-empty.svg';

const EmptyImage = () => {
  const [t, i18next] = useTranslation('global');
  const label = t('imageComingSoon', 'Image Coming Soon');

  const Drawing = () => <ImageEmpty />;

  return (
    <section className="flex flex-col p-3">
      <section className="grid place-content-center py-6">
        <Drawing />
      </section>
      <p className="text-center text-primary-800">{label}</p>
    </section>
  );
};

export default EmptyImage;
