const baseUrl = "https://2embed.org/";

export default {
  getVideo: (id, season = null, episode = null) => {
    return season
      ? baseUrl + "series.php?id=" + id + "/" + season + "/" + episode
      : baseUrl + "e.php?id=" + id;
  },
};
