import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useGetEpisodes from "../hooks/useGetEpisodes";
import styled from "styled-components";
import Loading from "../components/Loading";

const Episodes = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { episodes, fetchEpisodes, fetchEpisodesLoading } = useGetEpisodes();

  useEffect(() => {
    fetchEpisodes(id);
  }, []);

  return (
    <>
      <Title>قسمت های فصل {state.seasonNumber}</Title>
      <EpisodesContainer>
        {fetchEpisodesLoading ? (
          <Loading />
        ) : (
          episodes.map((episode: any, i: number) => (
            <Episode key={i}>
              <img src={episode?.image?.original} alt="" />
              <EpisodeInfo>
                <p>قسمت: {episode?.number}</p>
              </EpisodeInfo>
            </Episode>
          ))
        )}
      </EpisodesContainer>
    </>
  );
};

export default Episodes;


const Title = styled.h1`
  margin: 20px 40px 40px;
  padding: 10px 0;
  border-radius: 10px;
  background-color: #f0f2f5;
  color: #949494;
  text-align: center;
  `;
const EpisodesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
`;
const Episode = styled.div`
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

const EpisodeInfo = styled.div`
    padding: 10px;
`