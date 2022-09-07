import styles from './MoiveGrid.module.scss'

export default function MovieGrid({children}) {
    return (
        <div className={styles.MovieGrid}>{children}</div>
    )
};
