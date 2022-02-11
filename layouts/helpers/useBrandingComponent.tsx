import { useIsDev } from 'hooks/layoutAndUITooling/useIsDev';
import componentAssociations from './componentAssociations';

const findBrandingComponent = (pathLevels: string[]) => {
  let currentLevel = pathLevels[0];
  let levelIndex = 0;
  let currentAssociationObject = componentAssociations;

  while (levelIndex < pathLevels.length) {
    currentAssociationObject = currentAssociationObject[currentLevel];
    currentLevel = pathLevels[++levelIndex];
  }

  return currentAssociationObject as React.LazyExoticComponent<
    React.ComponentType<any>
  >;
};

export const useBrandingComponent = (path: string) => {
  const isDev = useIsDev();
  const pathLevels = path.split('/');
  let currentAssociationObject = null;

  try {
    currentAssociationObject = findBrandingComponent(pathLevels);
  } catch (e) {
    if (isDev) console.error(`No branding in ${path} \n\n ${e}`);
    return null;
  }

  return currentAssociationObject;
};
