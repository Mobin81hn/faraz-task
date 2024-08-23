import { useRequest } from "ahooks";
import { getSeries } from "../api/api";
import { useState } from "react";

const useGetSeries = () => {
    const [series, setSeries] = useState([])
    const { run: fetchSeries, loading: fetchSeriesLoading } = useRequest(getSeries, {
        manual: true,
        onSuccess: (data) => {
            setSeries(data?.data);
        }
    })
    return { series, fetchSeries, fetchSeriesLoading };
}
 
export default useGetSeries;