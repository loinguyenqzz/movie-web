import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

import MovieCard from "../../components/movieCard";
import MovieGrid from "../../components/MovieGrid";
import Pagination from "../../components/Pagination";
import styles from "./SearchPage.module.scss";
import className from "classnames/bind";
import Loading from "../../components/Loading";
import Typing from "react-typing-effect";

const cx = className.bind(styles);

export default function SearchPage() {
  // const { keyword } = useParams()
  // const [items, setItems] = useState([]);
  // const [activeTab, setActiveTab] = useState('movie')
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //     window.scrollTo(0, 0)
  //     const params = {
  //         page: currentPage,
  //         query: keyword
  //     }
  //     const getSearchResults = async () => {
  //         const res = await tmdbApi.search(activeTab, { params })
  //         setItems(res.results)
  //         setTotalPages(res.total_pages)
  //         setLoading(true)
  //     }
  //     getSearchResults()
  // }, [keyword, activeTab, currentPage]);

  // useEffect(() => {
  //     setCurrentPage(1)
  // }, [keyword, activeTab])

  // const handleActiveTab = (e) => {
  //     setActiveTab(e.target.id)
  //     console.log(e.target.id);
  // }

  return (
    <div className={styles.search}>
      {/* <div className={cx('tab')}>
                <div id='movie' className={cx('tab-item', activeTab == 'movie' ? 'acive-tab' : '')} onClick={handleActiveTab} >
                    Movies
                </div>
                <div id='tv' className={cx('tab-item', activeTab == 'tv' ? 'acive-tab' : '')} onClick={handleActiveTab} >
                    Tv series
                </div>
            </div>
            <div className={cx('mb-3')}>
                <MovieGrid>
                    {
                        isLoading ? items.map((item, i) => (
                            <MovieCard key={i} item={item} category='movie'></MovieCard>
                        )) : <Loading/>
                    }
                </MovieGrid>
            </div>
            <div>
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
            </div> */}
      <div className={cx("about-us")}>
        <section className={cx("section")}>
          <h2>My Story</h2>
          <p>
            Welcome to DailyMovie, where we bring you personalized movie
            recommendations based on your viewing history and preferences.
          </p>
          <p>
            I started as a movie enthusiast who was dissatisfied with the lack
            of personalized recommendations on streaming services. I decided to
            create a recommendation system that takes into account each user's
            unique tastes and interests, and thus my website was born. I am
            committed to making it easier for people to discover new and
            exciting movies that they'll love through a personalized movie
            recommendation system.
          </p>
          <p>
            My mission is to make it easier for people to discover new and
            exciting movies that they'll love. I believe that everyone deserves
            a personalized movie recommendation system, and I'm committed to
            making that a reality.
          </p>
        </section>

        <section className={cx("section")}>
          <h2>My Recommendation System</h2>
          <p>
            My recommendation system uses a combination of collaborative
            filtering and content-based filtering to provide personalized
            recommendations to my users. I analyze each user's viewing history
            and preferences, and use that information to suggest movies that I
            think they'll enjoy.
          </p>
        </section>

        <section className={cx("section")}>
          <h2>Contact me</h2>
          <p>
            If you have any questions or comments, please don't hesitate to
            contact me:
          </p>
          <ul>
            <li>Email: 19020350@vnu.edu.vn</li>
            <li>Phone: 0343396***</li>
            <li>Address: 144 Xuan Thuy, Cau Giay, Viet Nam</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
