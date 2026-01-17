import axios from "axios";

export const login = async (email: string, password: string) => {
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
};

export const signup = async (name: string, email: string, password: string) => {
  await axios.post("http://localhost:5000/api/auth/signup", {
    name,
    email,
    password,
  });
};
