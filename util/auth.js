import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_URL;

export const addUser = async (email, password) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return res.data.idToken;
};

export const login = async (email, password) => {
  const res = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return res.data.idToken;
};
