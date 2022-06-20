export const checkUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (e) {
    return false;
  }
};
