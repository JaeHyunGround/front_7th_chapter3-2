export const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString()}`;
};

export const formatPriceWon = (price: number): string => {
  return `${price.toLocaleString()}원`;
};
