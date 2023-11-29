import { Range } from "react-range";
import styles from "./FilterBar.module.scss";
import className from "classnames/bind";
import { useEffect, useState, useMemo } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GENRES } from "../../utils/constants";
import { useLocation } from "react-router-dom";

const cx = className.bind(styles);

const FiltterBar = ({ inputSearch, onChangeFilter }) => {
  const location = useLocation();
  const [runtime, setRuntime] = useState([0, 200]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [genreList, setGenreList] = useState([]);
  const formatDate = (date) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const filterParam = useMemo(
    () => [
      {
        field: "runtime",
        operator: "gt",
        value: runtime[0],
      },
      {
        field: "runtime",
        operator: "lt",
        value: runtime[1],
      },
      {
        field: "title",
        operator: "like",
        value: inputSearch,
      },
      {
        field: "release_date",
        operator: "gt",
        value: formatDate(fromDate),
      },
      {
        field: "release_date",
        operator: "lt",
        value: toDate ? formatDate(toDate) : "2023-12-30",
      },
      {
        field: "genres",
        operator: "like_json",
        value: genreList,
      },
    ],
    [runtime, inputSearch, fromDate, toDate, genreList]
  );

  useEffect(() => {
    if (location.state?.genres) {
      setGenreList(location.state?.genres);
    }
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      onChangeFilter(filterParam);
    } else {
      setIsFirstRender(false);
    }
  }, [toDate, fromDate, genreList]);

  const handleSelectedGenre = (id) => {
    if (genreList.length > 0 && genreList.includes(id)) {
      setGenreList(genreList.filter((item) => item != id));
    } else {
      setGenreList([...genreList, id]);
    }
  };
  return (
    <div className={cx("filter-bar")}>
      <div className={cx(["filter-item", "range"])}>
        <div className={cx(["filter-title"])}>Runtime</div>
        <Range
          values={runtime}
          step={1}
          min={0}
          max={200}
          onChange={(value) => setRuntime(value)}
          onFinalChange={() => onChangeFilter(filterParam)}
          renderTrack={({ props, children }) => (
            <div {...props} className={cx("render-track")}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={cx("render-thumb")} />
          )}
        />
        <div className={cx("range-text")}>
          <p>
            <b>From</b>: {runtime[0]} min
          </p>
          <p>
            <b>To</b>: {runtime[1]} min
          </p>
        </div>
      </div>
      <div className={cx(["filter-item", "date"])}>
        <div className={cx("filter-title")}>Release Dates</div>
        <div className={cx("date-item")}>
          <div className={cx("date-item__title")}>From</div>
          <label>
            <ReactDatePicker
              selected={fromDate}
              onChange={(value) => setFromDate(value)}
              dateFormat="dd/MM/yyyy"
              className={cx("datepicker")}
              placeholderText="Select from date"
            />
            <FontAwesomeIcon icon={faCalendar} className={cx("icon-date")} />
          </label>
        </div>
        <div className={cx("date-item")}>
          <div className={cx("date-item__title")}>To</div>
          <label>
            <ReactDatePicker
              selected={toDate}
              onChange={(value) => setToDate(value)}
              dateFormat="dd/MM/yyyy"
              className={cx("datepicker")}
              placeholderText="Select to date"
            />
            <FontAwesomeIcon icon={faCalendar} className={cx("icon-date")} />
          </label>
        </div>
      </div>
      <div className={cx(["filter-item", "genres"])}>
        <div className={cx("filter-title")}>Genres</div>
        <div className={cx("genres-wrap")}>
          {GENRES.map((genre) => (
            <div
              key={genre.id}
              className={cx([
                "genres-item",
                genreList.length > 0 && genreList.includes(genre.id)
                  ? "genres-active"
                  : "",
              ])}
              onClick={() => handleSelectedGenre(genre.id)}
            >
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltterBar;
