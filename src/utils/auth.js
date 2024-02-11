import axios from "axios";
export const createOrUpdateUser = (authToken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = (authToken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentAdmin = (authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
