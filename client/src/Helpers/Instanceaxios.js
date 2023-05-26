import axios from "axios";

export const Instanceaxios = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})