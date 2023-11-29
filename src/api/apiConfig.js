const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "5287adf946083fff9c53413000dc9ab7",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
