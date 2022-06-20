interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ExternalLink = ({ href, children, className, ...others }: LinkProps) => {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...others}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
