import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dbFireStore } from '../../firebaseConfig'
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import className from 'classnames/bind'

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import Button, { OutlineButton } from "../../components/Button";
import MovieList from '../../components/MovieList'
import Title from "../../components/Title";
import Loading from "../../components/Loading";
import PlayerItem from '../../components/PlayerItem'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from './Detail.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import TrailerModal from "../../components/modal/TrailerModal";

const cx = className.bind(styles)

function Detail() {
    let { catagory, id } = useParams()
    const [detail, setDetail] = useState(null);
    const [casts, setCasts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [trailerActive, setTrailerActive] = useState(false)
    const [trailerSrc, setTrailerSrc] = useState('');
    const navigate = useNavigate()
    const uid = useSelector((state) => state.auth.currentUser.uid)
    const collectionRef = uid && doc(dbFireStore, 'favorites', uid);
    const collectionHistoryRef = uid && doc(dbFireStore, 'historys', uid);
    const videoRef = useRef(null)
    const movie = {
        poster: apiConfig.originalImage(detail?.poster_path),
        name: detail?.name || detail?.title
    }

    const toastifySetting = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    useEffect(() => {
        const getListFavorites = async () => {
            const docSnap = await getDoc(collectionRef)
            if (docSnap.data()) {
                setFavorites(docSnap.data().list)
            }
        }
        getListFavorites()
    }, [])

    useEffect(() => {
        let respones = null
        const params = {}
        const getDetail = async () => {
            respones = await tmdbApi.detail(catagory, id, { params })
            if (uid) {
                await setDoc(collectionHistoryRef, {
                    lists: arrayUnion({
                        id : respones.id,
                        type: catagory,
                        item: respones
                    })
                }, { merge: true })
            }
            setDetail(respones)
            window.scrollTo(0, 0);
        }
        getDetail()
    }, [catagory, id]);

    useEffect(() => {
        let res = null
        const getCast = async () => {
            res = await tmdbApi.credits(catagory, id)
            setCasts(res.cast)
        }
        getCast()
    }, [catagory, id])

    const handleGenres = (e) => {
        navigate(`../${catagory}/genres/${e.target.id}`)
    }

    const handleFavorite = async () => {
        if (uid) {
            toast.success('Sucessfully added!', toastifySetting);
                await setDoc(collectionRef, {
                    lists: arrayUnion({
                        id : detail.id,
                        type: catagory,
                        item: detail
                    })
                }, { merge: true })
        } else {
            toast.warn('You must be logged in to use this feature!', toastifySetting);
        }
    }

    const handleTrailer = async () => {
        setTrailerActive(true)
        const respones = await tmdbApi.getVideos(catagory, detail.id)
        const trailerUrl = 'https://www.youtube.com/embed/' + respones.results[0].key
        setTrailerSrc(trailerUrl)
    }

    const handleWatch = () => {
        videoRef.current.scrollIntoView({ behavior: 'smooth', block: "center" })
    }

    return (
        <>
            {
                detail ? (
                    <div className={styles.wrapper} >
                        <div className={styles.detail} style={{ backgroundImage: `url(${apiConfig.originalImage(detail.backdrop_path)})` }} >
                            <div className={styles.poster}>
                                <LazyLoadImage className={cx('poster-img')} effect="blur" src={apiConfig.originalImage(detail.poster_path)} alt="poster" />
                                <h2 className={cx('title')}>
                                    {detail.title || detail.name}
                                </h2>
                                <div className={cx('interactive')}>
                                    <div className={cx('favorite')} onClick={handleFavorite}>
                                        <FontAwesomeIcon className={styles.icon} icon={faHeart}></FontAwesomeIcon>
                                    </div>
                                    <div className={cx('trailer')} onClick={handleTrailer}>
                                        <FontAwesomeIcon className={styles.icon} icon={faFilm}></FontAwesomeIcon>
                                    </div>
                                    <Button className={cx('btn-watch')} onClick={handleWatch}>
                                        <FontAwesomeIcon icon={faPlay} />
                                        &nbsp; Watch</Button>
                                </div>
                            </div>
                            <div className={cx('infor')}>
                                <h1 className={cx('title', 'mb-2')}>
                                    {detail.title || detail.name}
                                </h1>
                                <div className={cx('genres', 'mb-2')}>
                                    {
                                        detail.genres && detail.genres.map((item, i) => <OutlineButton key={i} id={item.id} className='small' onClick={handleGenres} >{item.name}</OutlineButton>)
                                    }
                                </div>
                                <div className={cx('overview', 'mb-2')}>
                                    {
                                        detail.overview
                                    }
                                </div>
                                <div className={styles.casts}>
                                    <h2>Casts</h2>
                                    <div className={cx('castList')}>
                                        {
                                            casts.slice(0, 5).map((cast, i) => <div key={i} className={cx('castProfile')}>
                                                <LazyLoadImage effect="blur" src={apiConfig.originalImage(cast.profile_path)} alt="" />
                                                <h5>{cast.name}</h5>
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <TrailerModal active={trailerActive} src={trailerSrc} setActive={setTrailerActive} />
                        </div>

                        <div ref={videoRef} className={cx('player')}>
                            {/* <PlayerItem id={id} catagory={catagory} seasons={detail.seasons ? detail.seasons : null} movie={catagory == 'movie' ? movie : null} /> */}
                        </div>

                        <div className={cx('similar', 'mb-3')}>
                            <Title>Similar</Title>

                            <MovieList category={catagory} id={id} similar></MovieList>
                        </div>
                    </div>
                ) : <Loading></Loading>
            }
            <ToastContainer />
        </>
    )
}

export default Detail;