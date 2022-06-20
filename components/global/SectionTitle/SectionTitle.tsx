import React from 'react';

interface SectionTitleProps {
  label: string;
  className?: string;
}

const SectionTitle = ({ label, className = '' }: SectionTitleProps) => {
  return (
    <section className={`flex items-center justify-between  ${className}`}>
      <span className="my-4 h4 overflow-none mr-3">{label}</span>
      <div className="flex-1 h-[1px] bg-dark-300 after:label" />
    </section>
  );
};

export default SectionTitle;
