import Modal from '..';
import styles from './TrailerModal.module.scss'

const TrailerModal = ({active, setActive, src}) => {
    const onClose = () => {
        setActive(false)
    }

    return (
        <Modal active={active} onClose={onClose} setActive={setActive}>
            <iframe src={active ? src : ''} className={styles.video} title="trailer"></iframe>
        </Modal>
    )
}


export default TrailerModal