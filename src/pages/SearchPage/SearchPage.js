import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi";

import MovieCard from '../../components/movieCard'
import MovieGrid from "../../components/MovieGrid";
import Pagination from '../../components/Pagination'
import styles from './SearchPage.module.scss'
import className from 'classnames/bind'
import Loading from "../../components/Loading";

const cx = className.bind(styles)

export default function SearchPage() {
    const { keyword } = useParams()
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState('movie')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        const params = {
            page: currentPage,
            query: keyword
        }
        const getSearchResults = async () => {
            const res = await tmdbApi.search(activeTab, { params })
            setItems(res.results)
            setTotalPages(res.total_pages)
            setLoading(true)
        }
        getSearchResults()
    }, [keyword, activeTab, currentPage]);


    useEffect(() => {
        setCurrentPage(1)
    }, [keyword, activeTab])

    const handleActiveTab = (e) => {
        setActiveTab(e.target.id)
        console.log(e.target.id);
    }

    return (
        <div className={styles.search}>
            <div className={cx('tab')}>
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
            </div>
        </div>
    )
};
