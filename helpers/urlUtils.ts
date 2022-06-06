export const checkUrl = async (url: string) => {
  const result = await fetch(url, { method: 'HEAD' });
  return result.ok;
};
