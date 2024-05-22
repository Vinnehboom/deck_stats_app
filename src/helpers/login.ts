export const vsLogUserEmailString = "@vsloguser.com";

export const authUsername = (username: string) => {
  return `${username}${vsLogUserEmailString}`;
};

export const isEmail = (email: string) => {
  return email.match(/^\S+@\S+\.\S+$/);
};
