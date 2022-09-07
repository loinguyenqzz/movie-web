import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import tmdbApi, { movieGenres, tvGenres } from "../../api/tmdbApi";

import MovieCard from '../../components/movieCard'
import styles from './Genres.module.scss'
import Title from "../../components/Title";
import MovieGrid from '../../components/MovieGrid';
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Pagination from '../../components/Pagination';


function Genres() {
    let { catagory, genres_id } = useParams()
    const [items, setItems] = useState([])
    let genres = catagory == 'movie' ? movieGenres : tvGenres
    genres = genres.find((el) => el.id == genres_id)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        const getListItem = async () => {
            const params = {
                with_genres: genres_id,
                page: currentPage
            }
            let res = await tmdbApi.discover(catagory, { params })
            setItems(res.results)
            setTotalPages(res.total_pages < 500 ? res.total_pages : 500)
        }

        getListItem()
    }, [genres_id, currentPage])

    useEffect(() => {
        setCurrentPage(1)
    }, [genres_id])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    return (
        <div className={styles.wrapper}>
            <Title>{genres.name}</Title>
            <MovieGrid>
                <LazyLoadComponent>
                    {
                        items.map((item, i) => <MovieCard key={i} item={item} category={catagory} />)
                    }
                </LazyLoadComponent>
            </MovieGrid>
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
        </div>)
}

export default Genres;