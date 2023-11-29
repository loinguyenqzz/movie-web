import className from "classnames/bind";
import { useSelector } from "react-redux";
import MovieGrid from "../../components/MovieGrid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovieCard from "../../components/movieCard";
import Title from "../../components/Title";
import Loading from "../../components/Loading";
import EmptyImg from "../../assets/30772f1672c8d5f5475cf1066044fb8b.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckDouble,
  faCircleXmark,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Personal.module.scss";
import userService from "../../api/userService";
import Button from "../../components/Button";

const cx = className.bind(styles);

export default () => {
  const { feature } = useParams();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth.currentUser.uid);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        let res = [];
        if (feature == "favorites") {
          res = await userService.getFavorite(uid);
        } else {
          res = await userService.getHistory(uid);
        }
        setItems(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getItems();
  }, [feature]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSelected = (id) => () => {
    if (selected.includes(id)) {
      setSelected(selected.filter((e) => e != id));
      setSelectAll(false);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectedAll = () => {
    setSelectAll(!selectAll);
    setSelected(items.map((e) => e.id));
    if (selectAll) {
      setSelected([]);
    }
  };

  const handleDelete = async () => {
    if (selected.length == 0) {
      toast.warn("You haven't selected a movie yet");
      return;
    }
    setItems(items.filter((e) => !selected.includes(e.id)));
    toast.success("Delete success!");
    try {
      if (feature == "favorites") {
        await userService.updateFavorite(uid, selected, 3);
      } else {
        await userService.updateHistory(uid, selected, 3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("personal")}>
      <Title>{feature == "favorites" ? "My favorites" : "My Historys"}</Title>
      <div className={cx("content")}>
        <div className={cx("nav")}>
          {/* <ul className={cx('tab-label')}>
                    <li className={cx('title', activeTab == 'all' ? 'active' : "")} onClick={handleTab}>All</li>
                    <li className={cx('title', activeTab == 'movie' ? 'active' : "")} onClick={handleMovieTab}>Movie</li>
                    <li className={cx('title', activeTab == 'tv' ? 'active' : "")} onClick={handleTvTab}>Tv Series</li>
                </ul> */}

          {items.length > 0 && (
            <div className={cx("edit-wrap")}>
              {edit ? (
                <>
                  <div
                    className={cx("edit-option")}
                    onClick={handleSelectedAll}
                  >
                    <FontAwesomeIcon icon={faCheckDouble}></FontAwesomeIcon>
                    <h3>&nbsp;Select all</h3>
                  </div>

                  <div className={cx("edit-option")} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    <h3>&nbsp;Delete</h3>
                  </div>

                  <div className={cx("edit-option")} onClick={handleEdit}>
                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                    <h3>&nbsp;Cancel</h3>
                  </div>
                </>
              ) : (
                <div className={cx("edit-option")} onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  <h3>&nbsp;Edit</h3>
                </div>
              )}
            </div>
          )}
        </div>
        <MovieGrid>
          {items.length > 0 ? (
            items.map((element, i) => (
              <div className={cx("movie-item")} key={i}>
                <div className={cx("wrapper")}>
                  <MovieCard item={element}></MovieCard>
                </div>
                {edit && (
                  <div
                    className={cx("select")}
                    onClick={handleSelected(element.id)}
                  >
                    {selected.includes(element.id) && (
                      <FontAwesomeIcon icon={faCheck} className={cx("icon")} />
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={cx("state-empty")}>
              <img className={cx("img-empty")} src={EmptyImg} alt="" />
              <h4>No results found.</h4>
              <Button onClick={() => navigate("../explore")}>
                Explore now
              </Button>
            </div>
          )}
        </MovieGrid>
        {loading && <Loading />}
      </div>
    </div>
  );
};
