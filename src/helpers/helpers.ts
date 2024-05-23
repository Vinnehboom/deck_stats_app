export const truncate = (string: string) => {
  return string.length > 35 ? `${string.substring(0, 35)}...` : string;
};
