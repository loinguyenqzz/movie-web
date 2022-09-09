import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './movieList.module.scss'
import tmdbApi, { category, tvType, movieType } from '../../api/tmdbApi'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import "swiper/css"
import "swiper/css/navigation";
import { Navigation } from "swiper";

import MovieCard from '../movieCard';
import className from 'classnames/bind'
const cx = className.bind(styles)

export default function MovieList(props) {
    const [items, setItems] = useState(null)
    const swiperRef = useRef(null)

    useEffect(() => {
        let params = {}

        const getList = async () => {
            let list = null

            if (props.similar) {
                list = await tmdbApi.similar(props.category, props.id)
            }
            else if (props.type) {
                switch (props.category) {
                    case category.tv:
                        list = await tmdbApi.getTvList(tvType[props.type], { params })
                        break
                    case category.movie:
                        list = await tmdbApi.getMoviesList(movieType[props.type], { params })
                        break
                    default:
                        console.log('Invalid');
                }
            }
            else if (props.genres_id) {
                params = {
                    with_genres: props.genres_id
                }
                list = await tmdbApi.discover(props.category, { params })
            }
            setItems(list.results)
        }
        getList()

    }, [props.category, props.id, props.genres_id])

    return (
        <Swiper
            modules={[Navigation]}
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={'auto'}
            slidesPerGroupAuto
            navigation
            className={cx('swiper')}
        >
            {
                items?.map((item, i) => (
                    <SwiperSlide key={i} className={cx('swiper-slide')}>
                            {
                                <MovieCard category={props.category} item={item} />
                            }  
                    </SwiperSlide>
                )) || 
                (<>
                    {
                        new Array(Math.ceil(window.innerWidth / 200))
                            .fill("")
                            .map((_, index) => (
                                <SwiperSlide key={index} ref={swiperRef} className={cx('swiper-slide')}>
                                    <Skeleton count={1} 
                                    height={window.innerWidth < 1024 ? 225 : 300}
                                    baseColor={'#4E4E50'} 
                                    highlightColor={'#939597'} 
                                    duration={1} />
                                </SwiperSlide>
                            ))
                    }
                </>)

            }
        </Swiper>
    )
};
