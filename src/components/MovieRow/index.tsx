import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useState } from 'react';

import styles from './styles.module.scss'

interface MovieResults {
    id: number;
    name: string;
    poster_path: string;
}

interface MovieProps {
    results: MovieResults[];
}

interface MovieRowProps {
    title: string;
    movies: MovieProps;
}

export function MovieRow({ title, movies }: MovieRowProps) {
    const [scrollHorizontal, setScrollHorizontal] = useState(0)
    const handleLeftArrow = () => {
        let horizontal = scrollHorizontal + Math.round(window.innerWidth / 2)
        if (horizontal > 0) {
            horizontal = 0
        }
        setScrollHorizontal(horizontal)
    }

    const handleRightArrow = () => {
        const listWidth = movies.results.length * 150
        let horizontal = scrollHorizontal - Math.round(window.innerWidth / 2)
        if ((window.innerWidth - listWidth) > horizontal) {
            horizontal = (window.innerWidth - listWidth) - 60
        }
        setScrollHorizontal(horizontal)
    }

    return (
        <div className={styles.movieRow}>
            <h2>{title}</h2>
            <div className={styles.movieRowLeft} onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className={styles.movieRowRight} onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
            <div className={styles.movieRowListArea}>
                <div className={styles.movieRowList} style={{
                    marginLeft: scrollHorizontal,
                    width: movies.results.length * 150
                }}>
                    {movies.results.length > 0 && movies.results.map(movie => (
                        <div key={movie.id} className={styles.movieRowItem}>
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
