import axios from "axios";

const API = axios.create({
  baseURL: "https://pomodro-timer.onrender.com",
});

export const signIn = (formData) => API.post("/users/signin", formData);
