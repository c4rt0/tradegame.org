export const isAuthenticated = () => {
  const tokenDetailsString = localStorage.getItem("tokenDetails");
  if (tokenDetailsString) {
    return true;
  } else {
    return false;
  }
};
