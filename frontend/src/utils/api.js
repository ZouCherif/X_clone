import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  //timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendCode = async (email) => {
  try {
    const response = await api.post("/register/getVerificationCode", email);
    return response.data;
  } catch (err) {}
};

export const verifyCode = async (code) => {
  try {
    const response = await api.post("/register/verifyCode", code);
    return response.data;
  } catch (err) {}
};
