import React from 'react';

const DiningPhoneEmail = ({
  className,
  urlSite,
  phone,
}: {
  className?: string;
  urlSite?: string;
  phone?: string;
}) => {
  return (
    <div className={className}>
      {urlSite ? (
        <a href={urlSite} className="mx-2 text-primary-1000">
          {urlSite}
        </a>
      ) : null}
      {urlSite && phone ? (
        <span className="text-xs font-normal text-dark-800">|</span>
      ) : null}
      {phone ? <span className="pl-2 text-dark-1000">{phone}</span> : null}
    </div>
  );
};

export default DiningPhoneEmail;
