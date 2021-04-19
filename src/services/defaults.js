const headers = () => {
  // const xToken = localStorage.getItem(X_TOKEN);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    //   authorization: `Bearer ${xToken}`,
  };
};

const defaultResponse = async (res) => {
  const { status } = res;
  const response = await res.json();
  //   if (status === 403) {
  //     localStorage.removeItem(X_TOKEN);
  //     window.location.href = "/#/user/login";
  //     return {
  //       resStatus: status,
  //       message: "Your token has expired, please login again.",
  //     };
  //   }
  if (status >= 400) {
    const { message } = response;
    return { resStatus: status, message };
  }
  return { ...response, resStatus: status };
};

export const get = (api) => {
  return fetch(api, {
    headers: headers(),
    // credentials: "include",
    method: "GET",
  }).then((res) => defaultResponse(res));
};
