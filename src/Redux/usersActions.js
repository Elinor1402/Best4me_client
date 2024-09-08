//these functions activated when user log innto the site and lot out from it.They are the only source of information for the store and are dispatched to trigger state changes.
export const loginAction = () => {
  const isLogged = true;
  return {
    type: "LOGIN",
    payload: isLogged,
  };
};

export const logoutAction = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("CompanyID");
  localStorage.removeItem("userID");
  const isLogged = false;
  return {
    type: "LOGIN",
    payload: isLogged,
  };
};
