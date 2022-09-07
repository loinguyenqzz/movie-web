import { OutlineButton } from '../../components/Button'
import HeroSilde from '../../components/heroSilde'
import MovieList from '../../components/MovieList'
import Title from '../../components/Title'

export default function Home() {
    return (
        <>
            <HeroSilde></HeroSilde>

            <div className='container'>
                <div className='section mb-3'>
                    <div className="section_header">
                        <Title>Trending Movie</Title>
                    </div>
                    <MovieList category='movie' type='popular'></MovieList>
                </div>

                <div className='section mb-3'>
                    <div className="section_header">
                        <Title>Trending TV</Title>
                    </div>
                    <MovieList category='tv' type='popular'></MovieList>
                </div>
            </div>
        </>
    )
};
