import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./movieCard.module.scss";
import apiConfig from "../../api/apiConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import className from "classnames/bind";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImgDefault from "../../assets/2c50546d5d820eefdd2925c9aec17466.jpg";
const cx = className.bind(styles);

export default function MovieCard({ item, onClick }) {
  const imgSrc = apiConfig.originalImage(
    item.poster_path || item.backdrop_path
  );
  const link = "/movie/" + item.id;

  function truncate(str, n) {
    str = str.toString();
    if (str.length <= n) {
      return str;
    }
    const subString = str?.slice(0, n - 1); // the original check
    return subString.slice(0, subString.lastIndexOf(" ")) + "...";
  }

  const briefTitle = truncate(item.title || item.name, 20);
  return (
    <Link to={link}>
      <div
        className={styles.movieCard}
        onClick={onClick ? () => onClick() : null}
      >
        <div className={cx("wrapper-poster")}>
          <LazyLoadImage
            effect="blur"
            src={imgSrc}
            className={cx("poster")}
            placeholderSrc={ImgDefault}
          />

          {/* <div className={cx("popular")}>Popular : {item.popularity}</div> */}
          <FontAwesomeIcon icon={faPlay} className={cx("iconPlay")} />
        </div>
        <h4 className={styles.title}>{briefTitle}</h4>
        <div className={cx("more-infor")}>
          <span className={cx("realease-date")}>
            {item.release_date || item.first_air_date}
          </span>
          <div className={cx("rating")}>
            <FontAwesomeIcon icon={faStar} className={cx("icon")} />
            <span className={cx("rate-count")}>
              {(item.vote_average / 2).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
