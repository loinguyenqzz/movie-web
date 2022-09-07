import styles from './Loading.module.scss'
import className from 'classnames/bind'

const cx = className.bind(styles)
function Loading() {
    return (
    <div className={cx('wrapper')}>
        <div className={cx('loader')}>
            <div className={cx('inner', 'one')}></div>
            <div className={cx('inner', 'two')}></div>
            <div className={cx('inner', 'three')}></div>
        </div>
    </div>);
}

export default Loading;