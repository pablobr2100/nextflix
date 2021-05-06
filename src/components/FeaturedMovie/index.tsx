import styles from './styles.module.scss'

type MovieInfo = {
    id: number;
    name: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string;
    number_of_seasons: number;
    overview: string;
    genres: {
        name: string;
    }
}

interface FeaturedProps {
    movie: MovieInfo;
}

export function FeaturedMovie({ movie }: FeaturedProps) {
    const firstDate = new Date(movie.first_air_date)
    const genres = []
    for (const i in movie.genres) {
        genres.push(movie.genres[i].name)
    }

    let description = movie.overview
    if (description.length > 200) {
        description = description.substring(0, 200)+'...'
    }

    return (
        <section className={styles.featured} style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                    <div className={styles.featuredName}>{movie.name}</div>
                    <div className={styles.featuredInfo}>
                        <div className={styles.featuredPoints}>{movie.vote_average} pontos</div>
                        <div>{firstDate.getFullYear()}</div>
                        <div>
                            {movie.number_of_seasons} temporada{movie.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className={styles.featuredDescription}>{description}</div>
                    <div className={styles.featuredButtons}>
                        <a href={`/watch/${movie.id}`} className={styles.featuredWatchButton}>► Assistir</a>
                        <a href={`/list/add/${movie.id}`} className={styles.featuredListButton}>
                            + Minha Lista
                        </a>
                    </div>
                    <div className={styles.featuredGenres}>
                        <strong>Gênero: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>

        </section>
    )
}
