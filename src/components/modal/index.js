import className from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './Modal.module.scss'

const cx = className.bind(styles)

export default function Modal({active, setActive, className, ...props}) {
    
    
    const closeModal = () => {
        setActive(false)
    }
    
    return (
        <div className={cx('modal', active ? 'active' : '')} {...props}>
            <div className={cx('modal-content', className)}>
                {props.children}
                <div className={cx('close')} onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
};
