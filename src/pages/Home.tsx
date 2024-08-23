import { useEffect, useState } from "react";
import useGetSeries from "../hooks/useGetSeries";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { CiBookmark } from "react-icons/ci";
import { IoIosBookmark } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { ShowModel } from "../models/show";

const Home = () => {
  const [favoriteSeries, setFavoriteSeries] = useState<ShowModel[]>([]);
  
  const { fetchSeries, fetchSeriesLoading, series } = useGetSeries();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let favSeries = localStorage.getItem("favorite-series");
    if (favSeries) {
      setFavoriteSeries(JSON.parse(favSeries));
    }
  }, []);

  useEffect(() => {
    const pn = query.get("pn") ?? "1"
    fetchSeries(pn);
  }, [query.get("pn")]);

  const handleFavoriteSeries = (show: ShowModel) => {
    const isSerieExist = favoriteSeries.find((serie) => serie.id === show?.id);

    if (isSerieExist) {
      const newFavoriteSeries = favoriteSeries.filter((serie) => serie.id !== show?.id);
      setFavoriteSeries(newFavoriteSeries);
      localStorage.setItem("favorite-series",JSON.stringify(newFavoriteSeries));
    } else {
      const newFavoriteSeries = [
        ...favoriteSeries,
        {
          id: show?.id,
          name: show?.name,
          genres: show?.genres,
          image: show?.image,
          premiered: show?.premiered,
          rating: show?.rating,
        },
      ];
      setFavoriteSeries(newFavoriteSeries);
      localStorage.setItem("favorite-series",JSON.stringify(newFavoriteSeries));
    }
  };

  const renderShow = (show: ShowModel, i: number) => (
    <Show key={i}>
      <Link to={`/seasons/${show?.id}`} state={{ showName: show?.name }}>
        <img src={show?.image?.original} alt="season-image" />
      </Link>
      <ShowInfo>
        <h3>سریال {show?.name}</h3>
        <p>ژانرها: {show?.genres?.join(" , ")}</p>
        <p>سال پخش: {show?.premiered}</p>
        <p>
          امتیاز: <span>{show?.rating?.average} از 10</span>
        </p>
        <AddFavorite onClick={() => handleFavoriteSeries(show)}>
          {favoriteSeries.find((serie) => serie.id === show?.id) ? (
            <IoIosBookmark size={25} />
          ) : (
            <CiBookmark size={25} />
          )}
        </AddFavorite>
      </ShowInfo>
    </Show>
  );

  const handlePagination = (state: string) => {
    if (state === "next") {
        const pn = query.get("pn") ?? 1;
        navigate(`/?pn=${+pn+1}`)
    } else if (state === "previous") {
        const pn = query.get("pn") ?? 1;
        if (pn == 1) return;
        
        navigate(`/?pn=${+pn-1}`)
    }
  }

  return (
    <TVSeries>
      <Title>مجموعه سریال های تلویزیونی</Title>
      {favoriteSeries.length !== 0 && (
        <FavoriteSeries>
          <h2 className="title">سریال های مورد علاقه:</h2>
          <Series>
            {favoriteSeries.map((show: ShowModel, i: number) => renderShow(show, i))}
          </Series>
        </FavoriteSeries>
      )}

      <AllSeries>
        <h2 className="title">همه سریال ها:</h2>
        <Series>
          {fetchSeriesLoading ? (
            <Loading />
          ) : (
            series.map((show: ShowModel, i: number) => renderShow(show, i))
          )}
        </Series>
      </AllSeries>
      <Pagination>
        <button onClick={() => handlePagination("previous")}>
            <GrFormNext size={30} />
        </button>
        <span>
            {
              query.get("pn") ? query.get("pn") : 1
            }
        </span>
        <button onClick={() => handlePagination("next")}>
            <GrFormPrevious size={30} />
        </button>
      </Pagination>
    </TVSeries>
  );
};

export default Home;

const TVSeries = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  width: 90%;
  margin: auto;

  .title {
    color: #555555;
  }
`;
const Title = styled.h1`
  margin: 20px 0 40px;
  padding: 10px 0;
  border-radius: 10px;
  background-color: #f0f2f5;
  color: #949494;
  text-align: center;
`;
const Series = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;
const FavoriteSeries = styled.div`
  margin-bottom: 60px;
`;
const AllSeries = styled.div``;
const Show = styled.div`
  width: 300px;
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
  p {
    font-size: 16px;
  }
`;
const ShowInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  height: 200px;
`;
const AddFavorite = styled.span`
  position: absolute;
  left: 10px;
  bottom: 10px;
  align-self: flex-start;
  cursor: pointer;
`;
const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 40px 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;