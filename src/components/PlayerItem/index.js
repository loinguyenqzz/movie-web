import styles from "./PlayerItem.module.scss";
import className from "classnames/bind";
import embed from "../../api/embed";
import { useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getRating, updateRating } from "../../api/movieService";

const cx = className.bind(styles);
export default ({ id }) => {
  const [rating, setRating] = useState(0);
  const uid = useSelector((state) => state.auth.currentUser.uid);

  useEffect(() => {
    if (uid) {
      getRatingData();
    }
  }, [id, uid]);

  const getRatingData = async () => {
    const res = await getRating(id, uid);
    if (res) {
      setRating(res.rating);
    } else {
      setRating(0);
    }
  };

  async function handleClick(ratingNumber) {
    if (uid) {
      if (ratingNumber != rating) {
        setRating(ratingNumber);
        toast.info("Your request is being processed");
        await updateRating(uid, id, ratingNumber);
        toast.success("Movie rating successful!");
      } else {
        setRating(0);
        toast.info("Your request is being processed");
        await updateRating(uid, id, 0);
        toast.success('Cancelled rating successfully!"');
      }
    } else {
      toast.warning("You must be logged in to use this feature!");
    }
  }

  return (
    <div className={cx("player")}>
      <iframe src={embed.getVideo(id)} />
      <div className={cx("rating")}>
        <div className={cx("rating-title")}>Rating for this movie:</div>
        <div className={cx("icon-star-wraper")}>
          {Array.from({ length: 5 }, (v, i) => (
            <FontAwesomeIcon
              className={cx(["star-icon", i <= rating - 1 ? "active" : ""])}
              icon={faStar}
              key={i}
              onClick={() => handleClick(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
