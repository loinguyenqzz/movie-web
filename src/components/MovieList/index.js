import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./movieList.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import MovieCard from "../movieCard";
import className from "classnames/bind";
const cx = className.bind(styles);

export default function MovieList({ id, queryFunction }) {
  const swiperRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetItems();
  }, [id]);

  const handleGetItems = async () => {
    setIsLoading(true);
    const res = await queryFunction();
    setData(res);
    setIsLoading(false);
  };
  return (
    <Swiper
      modules={[Navigation]}
      grabCursor={true}
      spaceBetween={20}
      slidesPerView={"auto"}
      slidesPerGroupAuto
      navigation
      className={cx("swiper")}
    >
      {!isLoading ? (
        data.map((item, i) => (
          <SwiperSlide key={i} className={cx("swiper-slide")}>
            {<MovieCard item={item} />}
          </SwiperSlide>
        ))
      ) : (
        <>
          {new Array(Math.ceil(window.innerWidth / 200))
            .fill("")
            .map((_, index) => (
              <SwiperSlide
                key={index}
                ref={swiperRef}
                className={cx("swiper-slide")}
              >
                <Skeleton
                  count={1}
                  height={window.innerWidth < 1024 ? 225 : 300}
                  baseColor={"#4d4d4d"}
                  highlightColor={"#b3b3b3"}
                  borderRadius={10}
                  duration={1.2}
                />
                <Skeleton
                  count={1}
                  height={18}
                  baseColor={"#4d4d4d"}
                  highlightColor={"#b3b3b3"}
                  duration={1.2}
                />
                <div className={cx("skeleton-release-year")}>
                  <Skeleton
                    count={1}
                    height={14}
                    width={60}
                    baseColor={"#4d4d4d"}
                    highlightColor={"#b3b3b3"}
                    duration={1.2}
                  />
                  <Skeleton
                    count={1}
                    height={14}
                    width={30}
                    baseColor={"#4d4d4d"}
                    highlightColor={"#b3b3b3"}
                    duration={1.2}
                  />
                </div>
              </SwiperSlide>
            ))}
        </>
      )}
    </Swiper>
  );
}
