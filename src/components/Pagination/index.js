import { OutlineButton } from '../Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import styles from './Pagination.module.scss';
import className from 'classnames/bind'
const cx = className.bind(styles)

const Pagination = ({currentPage, setCurrentPage, totalPages, siblingCount = 2}) => {

    const handleNextPage = () => {
        currentPage < totalPages && setCurrentPage(currentPage + 1)
    }

    const handlePrePage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1)
    }

    const handleSetpage = (e) => {
        setCurrentPage(parseInt(e.target.innerText))
    }

    return (
        <div className={styles.pagination}>
            <OutlineButton className="small" onClick={handlePrePage}>
                <FontAwesomeIcon icon={faArrowLeftLong} className={styles.icon} />
            </OutlineButton>
            <div className={styles.page}>
                <h3  className={cx('page-number', currentPage == 1 && 'active')} onClick={handleSetpage} >1</h3>
                {currentPage - siblingCount > 2 && <h3>&hellip;</h3>}
                {
                    new Array(siblingCount*2 + 1)
                    .fill('')
                    .map((_, index) => currentPage - siblingCount + index > 1 && currentPage - siblingCount + index < totalPages
                    && <h3 key={index} className={cx(siblingCount == index && 'active', 'page-number')} onClick={handleSetpage}>{currentPage - siblingCount + index}</h3>)
                }
                {currentPage + siblingCount < totalPages - 1 && <h3>&hellip;</h3>}
                <h3 className={cx('page-number', currentPage == totalPages && 'active')} onClick={handleSetpage}>{totalPages}</h3>
            </div>
            <OutlineButton className="small" onClick={handleNextPage} >
                <FontAwesomeIcon icon={faArrowRightLong} className={styles.icon} />
            </OutlineButton>
        </div>
    )
}

export default Pagination