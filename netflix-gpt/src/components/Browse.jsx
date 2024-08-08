import { useEffect } from "react";
import Header from "./Header";
import { API_OPTIONS, TMDB_PLAYING_MOVIE_URL } from "../utils/constants";

const Browse = () => {
  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const getNowPlayingMovies = async () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4f13fdd88a60fcda615d8b98b0ce158b"
    )
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  };
  return (
    <div>
      <Header />
    </div>
  );
};
export default Browse;
