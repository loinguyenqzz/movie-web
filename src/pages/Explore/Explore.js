import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import FiltterBar from "../../components/FilterBar";
import styles from "./Explore.module.scss";
import MovieCard from "../../components/movieCard";
import className from "classnames/bind";
import MovieGrid from "../../components/MovieGrid";
import { getMovieFilter } from "../../api/movieService";
import Title from "../../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import EmptyImg from "../../assets/30772f1672c8d5f5475cf1066044fb8b.png";

const cx = className.bind(styles);

const Explore = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const exploreResultRef = useRef();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState(
    keyword != undefined ? keyword : ""
  );
  const [filterParam, setFilterParam] = useState([]);
  const filterInput = useMemo(
    () => ({
      field: "title",
      operator: "like",
      value: inputText,
    }),
    [inputText]
  );
  const pageSize = 15;

  useEffect(() => {
    getFilterData();
  }, [page, filterParam]);

  const handleChangeFilter = (filterParam) => {
    setFilterParam(filterParam);
    setPage(1);
    exploreResultRef.current.scrollTop = 0;
  };

  const handleSearch = () => {
    getFilterData();
  };

  const getFilterData = async () => {
    setLoading(true);
    navigate(`../explore/${inputText}`);
    const filters = [...filterParam, filterInput];
    const res = await getMovieFilter(page, pageSize, filters);
    if (page == 1) {
      setItems(res.movies);
    } else {
      setItems([...items, ...res.movies]);
    }
    setTotalRecords(res.total_records);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      exploreResultRef.current.scrollTop = 0;
      if (page == 1) {
        getFilterData();
      } else {
        setPage(1);
      }
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom && page * pageSize < totalRecords) {
      setPage(page + 1);
    }
  };
  return (
    <div className={cx("explore")}>
      {loading && <Loading />}
      <div className={cx("container")}>
        <div className={cx("container__title")}>
          <Title>Explore</Title>
          <div className={cx("input-wraper")}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              type="text"
              className={cx("input-search")}
              placeholder="Enter keyword"
              onKeyDown={handleKeyPress}
            />
            <Button className={cx("btn-search")} onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        <div
          ref={exploreResultRef}
          className={cx("explore-result")}
          onScroll={handleScroll}
        >
          <MovieGrid>
            {items.length > 0 ? (
              items.map((item) => <MovieCard key={item.id} item={item} />)
            ) : (
              <div className={cx("state-empty")}>
                <img className={cx("img-empty")} src={EmptyImg} alt="" />
                <div>No results found.</div>
              </div>
            )}
          </MovieGrid>
        </div>
      </div>
      <FiltterBar inputSearch={inputText} onChangeFilter={handleChangeFilter} />
    </div>
  );
};

export default Explore;
