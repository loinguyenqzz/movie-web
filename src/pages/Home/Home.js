import { useSelector } from "react-redux";
import { getMoviePopular, getMovieRecommender } from "../../api/movieService";
import { OutlineButton } from "../../components/Button";
import HeroSilde from "../../components/heroSilde";
import MovieList from "../../components/MovieList";
import Title from "../../components/Title";

export default function Home() {
  const uid = useSelector((state) => state.auth.currentUser.uid);
  console.log(uid);
  return (
    <>
      <HeroSilde></HeroSilde>
      <div className="container">
        {/* <div className="section mb-3">
          <div className="section_header">
            <Title>Poppular Movie</Title>
          </div>
          <MovieList queryFunction={getMoviePopular}></MovieList>
        </div> */}

        <div className="section mb-3">
          <div className="section_header">
            <Title>Recommender</Title>
          </div>
          <MovieList
            queryFunction={() => getMovieRecommender(uid || 0)}
          ></MovieList>
        </div>
      </div>
    </>
  );
}
