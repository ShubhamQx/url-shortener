export const getShortUrl = (code: string) => {
  return `${import.meta.env.VITE_SHORT_BASE_URL}/${code}`;
};
