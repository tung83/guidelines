export const formatCurrency = (text) =>
  text?.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

export const RoundToOneDec = (number) => {
  const value = Math.round(number * 10) / 10;
  if (value === 0 && number > 0.009) return 0.1;
  return value;
};
export const RoundToTwoDec = (number) => Math.round(number * 100) / 100;
