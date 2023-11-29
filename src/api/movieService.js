import { axiosLocal } from "./axiosClient";

export const getMoviePopular = async (topN = 20) => {
  const res = await axiosLocal.get("/popular/" + topN);
  return res.data;
};

export const getSimilar = async (movieId, userId) => {
  const res = await axiosLocal.get(`/similar/${movieId}/${userId}`);
  return res.data;
};

export const getMovieFilter = async (page = 1, pageSize = 20, filters = []) => {
  const res = await axiosLocal.post("/movies/filter", {
    filters: filters,
    page: page,
    page_size: pageSize,
  });
  return res.data;
};

export const updateRating = async (userId, movieId, rating) => {
  await axiosLocal.post(`/rating/${movieId}/${userId}`, {
    rating,
  });
};

export const getRating = async (movieId, userId) => {
  const res = await axiosLocal.get(`/rating/${movieId}/${userId}`);
  return res.data;
};

export const getMovieRecommender = async (userId) => {
  const res = await axiosLocal.get(`/movies/recommender/${userId}`);
  return res.data.movies;
};
