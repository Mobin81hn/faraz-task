import { useRequest } from "ahooks";
import { getSeasons } from "../api/api";
import { useState } from "react";

const useGetSeasons = () => {
    const [seasons, setSeasons] = useState([])
    const { run: fetchSeasons, loading: fetchSeasonsLoading } = useRequest(getSeasons, {
        manual: true,
        onSuccess: (data) => {
            setSeasons(data?.data)
        }
    })
    return { fetchSeasons, seasons, fetchSeasonsLoading };
}
 
export default useGetSeasons;