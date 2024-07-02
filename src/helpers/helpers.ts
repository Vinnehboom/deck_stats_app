export const truncate = (string: string) => {
  return string.length > 35 ? `${string.substring(0, 35)}...` : string;
};

export const capitalizeFirstLetter = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
