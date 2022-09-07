import styles from './PlayerItem.module.scss'
import className from 'classnames/bind'
import apiConfig from '../../api/apiConfig'
import embed from '../../api/embed'
import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
const cx = className.bind(styles)

export default ({ seasons, id, catagory, movie }) => {
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const handleOnclick = (season, episode) => () => {
        setSeason(season)
        setEpisode(episode)
    }

    const handleSelectSeason = (season) => () => {
        setSeason(season)
    }

    return <div className={cx('player')}>
        {
            catagory == 'movie' ? <iframe src={embed.getVideo(id)} />
                : <iframe src={embed.getVideo(id, season, episode)} />
        }
        <div className={cx('player-item')} >
            {
                seasons?.map((e, i) => {
                    const img = apiConfig.originalImage(e.poster_path)
                    if (e.season_number != 0) {
                        return <div key={i} className={cx('season')} onClick={handleSelectSeason(e.season_number)}>
                            <div className={cx('season-header')}>
                                <LazyLoadImage src={img} alt="" />
                                <div className={cx('infor-season')}>
                                    <h2 className={cx('season-name')}>{e.name}</h2>
                                    <h3>Episode number : {e.episode_count}</h3>
                                </div>
                            </div>
                            <div className={cx('episode', season == e.season_number ? 'active' : '')}>
                                {
                                    new Array(e.episode_count)
                                        .fill('')
                                        .map((_, i) => <button key={i} className={cx('episode-number', i + 1 == episode ? 'active-btn' : '')} onClick={handleOnclick(e.season_number, i + 1)}>{i + 1}</button>)
                                }
                            </div>
                        </div>
                    }
                }) || <div className={cx('type-movie')}>
                    <div className={cx('poster')}>
                        <LazyLoadImage src={movie.poster} className={cx('img')} />
                    </div>
                    <div className={cx('infor')}>
                        <h3>{movie.name}</h3>
                    </div>
                </div>
            }
        </div>
    </div>
}

