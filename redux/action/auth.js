export const SIGNUP = "SIGNUP";

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBv574Dpf-JhXuu6For9Z_jBaF_qtitSio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          emial: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
