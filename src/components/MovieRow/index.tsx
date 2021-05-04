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

    return (
        <div className={styles.movieRow}>
            <h2>{title}</h2>
            <div className={styles.movieRowListArea}>
                <div className={styles.movieRowList} >
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
