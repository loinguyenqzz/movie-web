const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "cda74d4ed2b75ebb47506360f9223b30",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  baseUrlLocal: "http://127.0.0.1:5000",
};

export default apiConfig;
