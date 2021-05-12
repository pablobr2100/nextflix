import { useRouter } from 'next/router';
import Link from 'next/link'
import Modal from 'react-modal'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import styles from './styles.module.scss'
import { MovieModal } from '../MovieModal';

Modal.setAppElement("#__next")

type MovieInfo = {
    id: number;
    name: string;
    backdrop_path: string;
    number_of_seasons: number;
    overview: string;
}

interface FeaturedProps {
    movie: MovieInfo;
}

export function FeaturedMovie({ movie }: FeaturedProps) {
    const router = useRouter()

    let description = movie.overview
    if (description.length > 200) {
        description = description.substring(0, 200) + '...'
    }

    return (
        <section className={styles.featured} style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                    <div className={styles.featuredName}>{movie.name}</div>
                    <div className={styles.featuredInfo}>
                        <div>
                            Assista agora à temporada {movie.number_of_seasons}
                        </div>
                    </div>
                    <div className={styles.featuredDescription}>{description}</div>
                    <div className={styles.featuredButtons}>
                        <Link href={`/movie/${movie.id}`} >
                            <a className={styles.featuredWatchButton}>► Assistir</a>
                        </Link>
                        <Link
                            href={`/?movieId=${movie.id}`}
                            as={`/movie/${movie.id}`}
                        >
                            <a
                                className={styles.featuredListButton}
                            >
                                <InfoOutlinedIcon style={{ fontSize: 24 }} />
                                <span>Mais informações</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={!!router.query.movieId}
                onRequestClose={() => router.push("/")}
                className={styles.featuredModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.80)',
                        zIndex: 9999
                    },
                    content: {
                        position: 'absolute',
                        backgroundColor: '#141414',
                        top: '40px',
                        left: '220px',
                        right: '220px',
                        bottom: '0px',
                        borderRadius: '5px',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        outline: 'none',
                        padding: '0px'
                    }
                }}
            >
                <>
                    <div className={styles.modalCloseArea}>
                        <a className={styles.modalCloseButtom} onClick={() => router.push("/")}>
                            <CloseOutlinedIcon style={{ fontSize: 25 }} />
                        </a>
                    </div>
                    <MovieModal movieId={movie.id} />
                </>
            </Modal>

        </section>
    )
}
