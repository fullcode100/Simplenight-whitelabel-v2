export const checkUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (e) {
    return false;
  }
};

const bogDomains = [
  'bog.simplenight',
  'bog-dev.simplenight',
  'bog-qa.simplenight',
];

export const checkBog = (url: string) => {
  const isBog = bogDomains.some((i) => url.includes(i));

  return isBog;
};
