import className from 'classnames/bind'
import { useSelector } from 'react-redux'
import { dbFireStore } from '../../firebaseConfig';
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import MovieGrid from '../../components/MovieGrid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MovieCard from '../../components/movieCard';
import Title from '../../components/Title';
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble, faCircleXmark, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Personal.module.scss'

const cx = className.bind(styles)

export default () => {
    const { feature } = useParams()
    const uid = useSelector((state) => state.auth.currentUser.uid)
    const collectionRef = doc(dbFireStore, feature, uid)
    const [items, setItems] = useState([])
    const [itemsTab, setItemsTab] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true)
                const docSnap = await getDoc(collectionRef)
                if (docSnap.data()) {
                    setItems(docSnap.data().lists)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getItems()
    }, [feature])

    useEffect(() => {
        setActiveTab('all')
    }, [feature])

    useEffect(() => {
        setItemsTab(items)
    }, [items])

    const handleTab = () => {
        setActiveTab('all')
        setItemsTab(items)
    }

    const handleMovieTab = () => {
        setActiveTab('movie')
        setItemsTab(items.filter((e) => e.type == 'movie'))
    }

    const handleTvTab = () => {
        setActiveTab('tv')
        setItemsTab(items.filter((e) => e.type == 'tv'))
    }

    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleSelected = (id) => () => {
        if (selected.includes(id)) {
            setSelected(selected.filter((e) => e != id))
            setSelectAll(false)
        } else {
            setSelected([...selected, id])
        }
    }

    const handleSelectedAll = () => {
        setSelectAll(!selectAll)
        setSelected(itemsTab.map((e) => e.item.id))
        if (selectAll) {
            setSelected([])
        }
    }

    const handleDelete = () => {
        const listSelected = itemsTab.filter((e) => selected.includes(e.item.id))
        setItems(items.filter((e) => !selected.includes(e.item.id)))
        toast.success('Delete success!')
        try {
            listSelected.forEach(async (e) => {
                await updateDoc(collectionRef, {
                    lists: arrayRemove(e)
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    return <div className={cx('personal')}>
        <Title>{feature == 'favorites' ? 'My favorites' : 'My Historys'}</Title>
        <div className={cx('content')}>
            <div className={cx('nav')}>
                <ul className={cx('tab-label')}>
                    <li className={cx('title', activeTab == 'all' ? 'active' : "")} onClick={handleTab}>All</li>
                    <li className={cx('title', activeTab == 'movie' ? 'active' : "")} onClick={handleMovieTab}>Movie</li>
                    <li className={cx('title', activeTab == 'tv' ? 'active' : "")} onClick={handleTvTab}>Tv Series</li>
                </ul>


                <div className={cx('edit-wrap')}>
                    {
                        edit ?
                            <>
                                <div className={cx('edit-option')} onClick={handleSelectedAll}>
                                    <FontAwesomeIcon icon={faCheckDouble}></FontAwesomeIcon>
                                    <h3>&nbsp;Select all</h3>
                                </div>

                                <div className={cx('edit-option')} onClick={handleDelete}>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    <h3>&nbsp;Delete</h3>
                                </div>

                                <div className={cx('edit-option')} onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
                                    <h3>&nbsp;Cancel</h3>
                                </div>
                            </> : <div className={cx('edit-option')}>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                <h3 onClick={handleEdit}>&nbsp;Edit</h3>
                            </div>
                    }
                </div>

            </div>
            <MovieGrid>
                {
                    itemsTab.length > 0 ? itemsTab.map((element, i) => <div className={cx('movie-item')} key={i}>
                        <div className={cx('wrapper')}><MovieCard item={element.item} category={element.type} ></MovieCard></div>
                        {
                            edit && <div className={cx('select')} onClick={handleSelected(element.item.id)}>
                                {
                                    selected.includes(element.item.id) && <FontAwesomeIcon icon={faCheck} className={cx('icon')} />
                                }
                            </div>
                        }
                    </div>) : <h2>No favorite</h2>
                }
            </MovieGrid>
            <ToastContainer />
            {
                loading && <Loading />
            }
        </div>
    </div>
}
