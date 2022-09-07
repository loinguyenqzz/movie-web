import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Button ({id, className, children, ...props}) {
    return (<button
        id={id}
        className={cx('btn', className)}
        {...props}>
        {children}
    </button>);
}

export function OutlineButton ({id, className, children, ...props}) {
    return (<button
        id={id}
        className={cx('outline-btn', className)}
        {...props} >
        {children}
    </button>);
}

export default Button;