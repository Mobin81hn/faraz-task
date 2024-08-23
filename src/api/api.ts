import axios from "axios"

export const getSeries = (page: string) : Promise<any> => {
    return axios.get(process.env.REACT_APP_API_URL + "/shows", {params: { page }})
}
export const getSeasons = (movieId: string | undefined) : Promise<any> => {
    return axios.get(process.env.REACT_APP_API_URL + `/shows/${movieId}/seasons`)
}
export const getEpisodes = (seasonId: string | undefined) : Promise<any> => {
    return axios.get(process.env.REACT_APP_API_URL + `/seasons/${seasonId}/episodes`)
}