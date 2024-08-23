import { useRequest } from "ahooks";
import { useState } from "react";
import { getEpisodes } from "../api/api";

const useGetEpisodes = () => {
    const [episodes , setEpisodes] = useState([]);
    const { run: fetchEpisodes, loading: fetchEpisodesLoading } = useRequest(getEpisodes, {
        manual: true,
        onSuccess: (data) => {
            setEpisodes(data?.data);
        }
    })
    return {episodes , fetchEpisodes, fetchEpisodesLoading};
}
 
export default useGetEpisodes;