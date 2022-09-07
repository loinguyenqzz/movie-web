import Tippy from '@tippyjs/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from '../../Search';
import styles from './HeaderNav.module.scss';
import { movieGenres, tvGenres } from '../../../api/tmdbApi'
import className from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { logOut } from '../../../app/slice/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faBars, faBookmark, faClockRotateLeft, faFilm, faHouse, faRightFromBracket, faTv, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { useEffect } from 'react';

const cx = className.bind(styles)

const headerNav = [
    {
        title: 'Home',
        path: '/',
        content: null,
        icon: faHouse
    },
    {
        title: 'Movies',
        path: '/movie',
        content: movieGenres,
        icon: faFilm
    },
    {
        title: 'TV Series',
        path: '/tv',
        content: tvGenres,
        icon: faTv
    }
]


export default function HeaderNav() {
    const navigate = useNavigate()
    const pathName = useLocation()
    const dispatch = useDispatch()
    const menuRef = useRef(null)
    const name = useSelector((state) => state.auth.currentUser.displayName)
    const isToken = useSelector((state) => state.auth.currentUser.accessToken)
    const avatar = useSelector((state) => state.auth.currentUser.photoURL)
    const active = headerNav.findIndex(el => el.path === pathName.pathname)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.offsetX > menuRef.current.offsetWidth) {
                menuRef.current.classList.remove(cx('active-nav'))
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    useEffect(() => {
        menuRef.current.classList.remove(cx('active-nav'))
    }, [pathName])

    const handleClick = (even, path) => {
        navigate(`../${path}/genres/${even.target.id}`)
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            dispatch(logOut())
        } catch (error) {
            console.log(error);
        }
    }

    const handleNavigation = () => {
        menuRef.current.classList.toggle(cx('active-nav'))
    }

    return (
        <div className={cx('header-nav')}>
            <Search></Search>
            <div className={cx('title-nav')}>
                {
                    headerNav.map((e, i) => (
                        <Tippy
                            key={i}
                            content={
                                e.content && (
                                    <div className={styles.wrapperContent}>
                                        {
                                            e.content.map((genres, i) =>
                                                (
                                                    <h4 id={genres.id} key={i} onClick={(even) => handleClick(even, e.path)}>{genres.name}</h4>
                                                )
                                            )
                                        }
                                    </div>
                                )
                            }

                            interactive="true"
                        >
                            <Link to={e.path} className={cx('title', i == active ? 'active' : '')}>{e.title}</Link>
                        </Tippy>
                    ))
                }
            </div>

            <div className={cx('user-features')}>
                <Tippy
                    content={(
                        <div className={cx('wrap')}>
                            {
                                isToken ? <>
                                    <Link className={cx('content')} to='/profile'>Profile
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    </Link>

                                    <Link className={cx('content')} to='/personal/favorites'>Favorite
                                        <FontAwesomeIcon className={cx('icon')} icon={faBookmark} />
                                    </Link>

                                    <Link className={cx('content')} to='/personal/historys'>History
                                        <FontAwesomeIcon className={cx('icon')} icon={faClockRotateLeft} />
                                    </Link>

                                    <Link className={cx('content')} to={'/login'} onClick={handleSignOut}>Sign out
                                        <FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} />
                                    </Link>
                                </> : (<>
                                    <Link to='/login' className={cx('content')}>Sign in
                                        <FontAwesomeIcon className={cx('icon')} icon={faArrowRightToBracket} />
                                    </Link>
                                    <Link to='/register' className={cx('content')}>Sign up
                                        <FontAwesomeIcon className={cx('icon')} icon={faUserPlus} />
                                    </Link>
                                </>)
                            }

                        </div>
                    )
                    }
                    interactive="true"
                >
                    <img src={avatar} alt="" className={cx('avatar')} />
                </Tippy>
            </div>

            <div className={cx('navigation')}>
                <FontAwesomeIcon onClick={handleNavigation} className={cx('bar')} icon={faBars}></FontAwesomeIcon>
                <div ref={menuRef} className={cx('menu')}>
                    <div className={cx('menu-group')}>
                        <div className={cx('menu-title')}>
                            <h2>MENU</h2>
                        </div>

                        {
                            headerNav.map((el, i) => (
                                <div key={i} className={cx('menu-item', i == active ? 'item-active' : '')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={el.icon} />
                                    <Link to={el.path} >{el.title}</Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className={cx('menu-group')}>
                        <div className={cx('menu-title')}>
                            <h2>GENERAL</h2>
                        </div>
                        <div className={cx('menu-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faBookmark} />
                            <Link to='./personal/favorites'>Favorite</Link>
                        </div>
                        <div className={cx('menu-item')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faClockRotateLeft} />
                            <Link to='./personal/historys'>History</Link>
                        </div>
                    </div>
                    <div className={cx('menu-group')}>
                        <div className={cx('menu-title')}>
                            <h2>ACCOUNT</h2>
                        </div>
                        {
                            isToken ? <>
                                <div className={cx('menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                    <Link to='profile'>Profile</Link>
                                </div>
                                <div className={cx('menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faRightFromBracket} />
                                    <Link to='./login' onClick={handleSignOut}>Sign out</Link>
                                </div>

                            </>
                                : <div className={cx('menu-item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faArrowRightToBracket} />
                                    <Link to='./login'>Sign in</Link>
                                </div>
                        }
                    </div>
                    <div className={cx('menu-group')}>
                        <div className={cx('user-item')}>
                            <img src={avatar} alt="" />
                            <span className={cx('user-name')}>{name ? name : 'Anonymous'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
