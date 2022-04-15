export const isAdminRole = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin) {
    return true;
  } else {
    return false;
  }
};
