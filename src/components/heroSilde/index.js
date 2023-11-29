import { useState, useEffect, useRef } from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import "swiper/css/effect-fade";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../Button";
import styles from "./heroSlide.module.scss";
import TrailerModal from "../modal/TrailerModal";
import Loading from "../Loading";
import { getMoviePopular } from "../../api/movieService";

const cx = classNames.bind(styles);

function HeroSlide() {
  const [loading, setLoading] = useState(false);
  const [movieItem, setMovieItem] = useState([]);
  const [trailerActive, setTrailerActive] = useState(false);
  const [trailerSrc, setTrailerSrc] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await getMoviePopular();
        setMovieItem(response.slice(1, 5));
        setLoading(true);
      } catch (error) {
        console.log("error");
      }
    };

    getMovies();
  }, []);

  return loading ? (
    <div className={cx("heroSlide")}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {movieItem.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                setTrailerActive={setTrailerActive}
                setTrailerSrc={setTrailerSrc}
              />
            )}
          </SwiperSlide>
        ))}
        <TrailerModal
          active={trailerActive}
          src={trailerSrc}
          setActive={setTrailerActive}
        />
      </Swiper>
    </div>
  ) : (
    <Loading />
  );
}

function HeroSlideItem({ item, className, setTrailerActive, setTrailerSrc }) {
  let navigate = useNavigate();

  const setModalActive = async () => {
    setTrailerActive(true);
    const videos = await tmdbApi.getVideos(category.movie, item.id);
    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      setTrailerSrc(videoSrc);
    }
  };

  function truncate(str, n) {
    if (str.length <= n) {
      return str;
    }
    const subString = str?.slice(0, n - 1); // the original check
    return subString?.slice(0, subString.lastIndexOf(" ")) + "...";
  }

  const briefOverview = truncate(item.overview, 250);

  const background = apiConfig.originalImage(
    window.innerWidth < 600 ? item.poster_path : item.backdrop_path
  );
  return (
    <div
      className={cx("heroSlide-item", className)}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={cx("container")}>
        <div className={cx("infor")}>
          <h2 className={styles.title}>{item.title}</h2>
          <div className={styles.overview}>
            {window.innerWidth < 600 ? briefOverview : item.overview}
          </div>
          <div className={cx("wrap-btn")}>
            <Button
              className={cx("btn-watch")}
              onClick={() => {
                navigate(`../movie/${item.id}`);
              }}
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>

        <div className={styles.poster}>
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
