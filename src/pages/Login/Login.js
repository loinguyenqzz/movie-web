import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import { loginSuccess, loginStart, loginFailed } from '../../app/slice/authSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind'
import { OutlineButton } from '../../components/Button'
import styles from './Login.module.scss'
import Loading from '../../components/Loading'
import avatar from '../../assets/kindpng_4212275.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = className.bind(styles)


export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false);

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
        setLoading(true)
        getRedirectResult(auth).then((result) => {
            console.log(result);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }, [])

    const handleLoginWithProvider = (Provider) => async () => {
        dispatch(loginStart())
        setLoading(true)
        try {
            if (window.innerWidth < 1024) {
                await signInWithRedirect(auth, Provider)
            }
            else await signInWithPopup(auth, Provider)

        } catch (error) {
            console.log(error);
            dispatch(loginFailed())
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('login');
                dispatch(loginSuccess({
                    uid: auth.currentUser.uid,
                    accessToken: auth.currentUser.accessToken,
                    email: auth.currentUser.email,
                    emailVerified: auth.currentUser.emailVerified,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL ? auth.currentUser.photoURL : avatar
                }))
                navigate('/')
            } else {
                navigate('/login')
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await signInWithEmailAndPassword(auth, email, password)
            dispatch(loginStart())
        } catch (error) {
            dispatch(loginFailed())
            switch (error.code) {
                case 'auth/wrong-password':
                    toast.error('Incorrect password!', toastifySetting);
                    break
                case 'auth/invalid-email':
                    toast.error('Invalid email!', toastifySetting);
                    break
                case 'auth/user-not-found':
                    toast.error('User not found!', toastifySetting);
                    break
                default:
                    console.log(error.code);
            }

        }
    }

    return (
        <>
            <div className={styles.login}>
                <div className={cx('title')}>
                    Sign In To DailyMovie
                </div>
                <div className={cx('login-with-provider')}>
                    <p>Or sign in with:</p>
                    <div className={cx('btn')}>
                        <button
                            className={cx('fb')}
                            onClick={handleLoginWithProvider(new FacebookAuthProvider)}></button>
                        <button
                            className={cx('gg')}
                            onClick={handleLoginWithProvider(new GoogleAuthProvider)}></button>
                    </div>
                </div>

                <form action="" className={cx('login-form')}>
                    <div className={styles.formGroup}>
                        <label className={cx('label', email ? 'label-active' : "")}>Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <FontAwesomeIcon className={cx('icon')} icon={faUser}></FontAwesomeIcon>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={cx('label', password ? 'label-active' : "")}>Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <FontAwesomeIcon className={cx('icon')} icon={faLock}></FontAwesomeIcon>
                    </div>

                    <OutlineButton className={cx('btn-login')} type="submit" onClick={handleSubmit}>Sign in</OutlineButton>
                </form>

                <div className={cx('navigate')}>
                    Not a member?
                    <Link to='/register' className={cx('link')}> Sign Up</Link>
                </div>
                <ToastContainer />
            </div>
            {
                isLoading && <Loading />
            }
        </>
    )
}


