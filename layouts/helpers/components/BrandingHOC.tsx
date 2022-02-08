import React from 'react';
import { useBrandingComponent } from '../useBrandingComponent';

interface BrandingProps {
  children?: any;
  brand: string;
  path: string;
}

const BrandingHOC = ({ children, brand = '', path }: BrandingProps) => {
  const lowerCaseBrand = brand.toLowerCase();
  const BrandingComponent = useBrandingComponent(`${lowerCaseBrand}/${path}`);

  if (!BrandingComponent) return children;

  return <BrandingComponent />;
};

export default BrandingHOC;
