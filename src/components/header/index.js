import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import logo from '../../assets/19783450.png'
import styles from './Header.module.scss'

import HeaderNav from './HeaderNav';

const cx = classNames.bind(styles)

function Header() {
    useEffect(() => {
        const shrink = () => {
            if (document.body.scrollTop > 0
                || document.documentElement.scrollTop > 0) {
                headerRef.current.classList.add(styles.shrink)
            } else {
                headerRef.current.classList.remove(styles.shrink)
            }
        }
        window.addEventListener('scroll', shrink)

        return () => {
            window.removeEventListener('scroll', shrink)
        }
    }, [])

    const headerRef = useRef(null)


    return (
        <div ref={headerRef} className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <img src={logo} alt="" className={styles.logoImg} />
                    <Link to='/' className={styles.logoName}>
                        <span className={cx('daily')}>Daily</span>
                        <span className={cx('movie')}>Movie</span>
                    </Link>
                </div>
                <HeaderNav />
            </div>
        </div>
    )
}

export default Header