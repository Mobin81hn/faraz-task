import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import useGetSeasons from "../hooks/useGetSeasons";
import styled from "styled-components";
import Loading from "../components/Loading";

const Seasons = () => {
    const params = useParams();
    const { state } = useLocation();

    const { fetchSeasons, fetchSeasonsLoading, seasons } = useGetSeasons()

    useEffect(() => {
        fetchSeasons(params.id)
    },[])
    
    return ( 
        <>
            <Title>فصل های سریال {state.showName}</Title>
            <SeasonsContainer>
                {
                    fetchSeasonsLoading ? (
                        <Loading/>
                    ) : (
                        seasons.map((show: any,i: number) => (
                            <Season to={`/episodes/${show?.id}`} state={{seasonNumber: show?.number}} key={i}>
                                <img src={show?.image?.original} alt="" />
                                <SeasonInfo>
                                    <p>شماره فصل: {show?.number}</p>
                                    <p>قسمت ها: {show?.episodeOrder}</p>
                                    <p>سال پخش: {show?.endDate}</p>
                                </SeasonInfo>
                            </Season>
                        ))
                    )
                }
            </SeasonsContainer>
        </>
     );
}
 
export default Seasons;

const Title = styled.h1`
    margin: 20px 40px 40px;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #f0f2f5;
    color: #949494;
    text-align: center;
`
const SeasonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    padding-bottom: 60px;
`
const Season = styled(Link)`
    width: 280px;
    background-color: #fff;
    color: gray;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    
    img {
        width: 100%;
        height: 300px;
    }
`

const SeasonInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`