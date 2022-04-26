import { ReactNode } from 'react';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  additionalInfo?: ReactNode;
}

const SectionHeader = ({ icon, title, additionalInfo }: SectionHeaderProps) => (
  <header className="flex justify-between items-center w-full">
    <section>
      <p className="flex items-center gap-3">
        <IconRoundedContainer className="bg-primary-1000 text-white">
          {icon}
        </IconRoundedContainer>
        <span className="h4 text-dark-800">{title}</span>
      </p>
    </section>
    {additionalInfo}
  </header>
);

export default SectionHeader;
