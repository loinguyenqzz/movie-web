import styles from "./footer.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const cx = className.bind(styles);

function Footer() {
  const uid = useSelector((state) => state.auth.currentUser.uid);
  return (
    <div className={styles.footer}>
      <div className={cx("content")}>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/about">About</Link>
      </div>
      {uid && (
        <div className={cx("content")}>
          <Link to="/profile">Profile</Link>
          <Link to="/personal/favorites">Favorites</Link>
          <Link to="/personal/historys">History</Link>
        </div>
      )}
      <div className={cx("content")}>
        <a target="_blank" href="https://www.facebook.com/loinguyenqzz/">
          Facebook
        </a>
        <a target="_blank" href="https://github.com/loinguyenqzz">
          Github
        </a>
      </div>
    </div>
  );
}

export default Footer;
