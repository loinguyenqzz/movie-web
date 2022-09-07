import { useNavigate, useParams } from 'react-router-dom';

import { movieGenres, tvGenres } from '../../api/tmdbApi';
import { OutlineButton } from '../../components/Button';
import MovieList from '../../components/MovieList';
import Title from '../../components/Title';
import styles from './Catalog.module.scss';

export default function Catalog() {
    const navigate = useNavigate()
    const { catagory } = useParams()
    let genres = catagory == 'movie' ? movieGenres : tvGenres
    const handleOnClick = (e) => {
        navigate(`../${catagory}/genres/${e.target.id}`)
    }

    return (
        <div className={styles.catalog}>
            {
                genres.map((el, i) => (
                    <div key={i}>
                        <div className='section_header'>
                            <Title>{el.name}</Title>
                            <OutlineButton id={el.id} className='small' onClick={handleOnClick}>See more</OutlineButton>
                        </div>
                        <MovieList category={catagory} genres_id={el.id}></MovieList>
                    </div>
                ))
            }
        </div>
    )
};

