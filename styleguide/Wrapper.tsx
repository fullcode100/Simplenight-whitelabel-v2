import React, { ReactNode } from 'react';
import 'styles/globals.css';

interface WrapperProps {
  children?: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return children;
};

export default Wrapper;
