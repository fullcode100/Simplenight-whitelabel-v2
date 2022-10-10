export const getFormattedLevels = (originUrl?: string) => {
  if (!originUrl) {
    return getHostLevels();
  }

  return originUrl.toUpperCase().split('.');
};

export const getBrandCodeFromHost = (originUrl?: string) => {
  const hostLevels = getFormattedLevels(originUrl);
  return hostLevels[0];
};

export const getHostLevels = () =>
  window.location.host?.toUpperCase()?.split('.');
