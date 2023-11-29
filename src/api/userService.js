import { axiosLocal } from "./axiosClient";

const userService = {
  getFavorite: async (userId) => {
    const res = await axiosLocal.get(`/favorite/${userId}`);
    return res.data;
  },
  updateFavorite: async (userId, data, entityState) => {
    await axiosLocal.post(`/favorite/${userId}`, { data, entityState });
  },
  getHistory: async (userId) => {
    const res = await axiosLocal.get(`/history/${userId}`);
    return res.data;
  },
  updateHistory: async (userId, data, entityState) => {
    await axiosLocal.post(`/history/${userId}`, { data, entityState });
  },
};

export default userService;
