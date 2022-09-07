const baseUrl = "https://2embed.org/embed/" 

export default {
    getVideo : (id, season = null, episode = null) => {
        return season ? baseUrl + id + "/" +  season + "/" +  episode : baseUrl + id
    }
}