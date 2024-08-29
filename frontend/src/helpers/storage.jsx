const USER_DETAILS = "user";

export const SetloginUser = (user) => {
  localStorage.setItem(USER_DETAILS, JSON.stringify(user));
};

export const isLogin = () => {
  if (localStorage.getItem(USER_DETAILS)) {
    return true;
  }
  return false;
};

export const getLoginUser = () => {
  return JSON.parse(localStorage.getItem(USER_DETAILS));
};

export const setLogout = () => {
  localStorage.removeItem(USER_DETAILS);
};
