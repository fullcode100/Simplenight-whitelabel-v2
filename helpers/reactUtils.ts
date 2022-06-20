import React from 'react';

export const injectProps = (
  Component:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined,
  props: { [key: string]: any },
) => {
  if (!Component) return null;
  return React.cloneElement(Component, props);
};
