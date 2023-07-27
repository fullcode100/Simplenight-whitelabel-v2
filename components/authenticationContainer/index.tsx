import React from 'react';
import SNIcon from '@/icons/logos/sn-mobile-logo.svg';

interface IAuthenticationContainerProps {
  children: React.ReactNode;
}
const AuthenticationContainer = (props: IAuthenticationContainerProps) => {
  return (
    <section className="flex h-full flex-col justify-center content-center">
      {props.children}
    </section>
  );
};

interface IAuthenticationBodyProps {
  children: React.ReactNode;
  className?: string;
}

const Body = ({ children, className }: IAuthenticationBodyProps) => {
  return (
    <section className={`flex flex-1 flex-col ${className}`}>
      {children}
    </section>
  );
};
AuthenticationContainer.Body = Body;

const Footer = ({ children }: IAuthenticationBodyProps) => {
  return <section>{children}</section>;
};
AuthenticationContainer.Footer = Footer;

const Icon = ({ children }: IAuthenticationBodyProps) => {
  return (
    <section className={'flex flex-row justify-center mb-4'}>
      {children}
    </section>
  );
};
AuthenticationContainer.Icon = Icon;

const SimpleNightLogo = () => (
  <SNIcon
    width={300}
    height={90}
    className="flex lg:hidden align-middle self-center"
  />
);

AuthenticationContainer.SimpleNightLogo = SimpleNightLogo;

export default AuthenticationContainer;
