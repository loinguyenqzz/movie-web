import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons'

import styles from './movieCard.module.scss'
import apiConfig from '../../api/apiConfig'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import className from 'classnames/bind'
const cx = className.bind(styles)

export default function MovieCard(props) {
    const item = props.item
    const imgSrc = apiConfig.originalImage(item.poster_path || item.backdrop_path)
    const link = '/' + props.category + '/' + item.id

    function truncate(str, n) {
        if (str.length <= n) { return str}
        const subString = str.slice(0, n - 1); // the original check
        return subString.slice(0, subString.lastIndexOf(" ")) + '...'
    }

    const briefTitle = truncate(item.title || item.name, 20)

    return (
        <Link to={link}>
            <div className={styles.movieCard} onClick={props.onClick ? () => props.onClick() : null}>
                <div className={cx('wrapper-poster')}>
                    <LazyLoadImage effect="blur" src={imgSrc} className={cx('poster')} />
                    <div className={cx('popular')}>Popular : {item.popularity}</div>
                    <FontAwesomeIcon icon={faPlay} className={cx('iconPlay')} />
                </div>
                <h4 className={styles.title}>{briefTitle}</h4>
                <div className={cx('more-infor')}>
                    <span className={cx('realease-date')}>{item.release_date || item.first_air_date}</span>
                    <div className={cx('rating')}>
                        <FontAwesomeIcon icon={faStar} className={cx('icon')} />
                        <span className={cx('rate-count')}>{(item.vote_average / 2).toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};
