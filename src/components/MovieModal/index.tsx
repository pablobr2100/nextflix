import styles from './styles.module.scss'
import useSWR from "swr"
import Link from 'next/link'

import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined'


type MovieInfo = {
  id: number;
  name: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  overview: string;
  tagline: string;
  genres: {
    name: string;
  };
  created_by: {
    name: string;
  }
}

const fetchCurrency = (movieId) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/tv/${movieId}?language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((response) => response.json());

export function MovieModal({ movieId }) {
  const { data, error } = useSWR<MovieInfo>(movieId, fetchCurrency);

  if (error) return <div>Ocorreu algum problema. Tente novamente mais tarde.</div>;
  if (!data) return <div>Carregando...</div>;

  const firstDate = new Date(data.first_air_date)

  const genres = []
  for (const i in data.genres) {
    genres.push(data.genres[i].name)
  }

  const created = []
  for (const i in data.created_by) {
    created.push(data.created_by[i].name)
  }

  console.log(data)

  return (
    <div className={styles.infoBody} >
      <section className={styles.infoCover} style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
      }}>
        <div className={styles.infoCoverVertical}>
          <h1>{data.name}</h1>
          <div className={styles.infoCoverButtons}>
            <Link href={`/movie/${data.id}`} >
              <a className={styles.featuredWatchButton}>► Assistir</a>
            </Link>
            <div>
              <AddOutlinedIcon style={{ fontSize: 20 }} />
            </div>
            <div>
              <ThumbUpOutlinedIcon style={{ fontSize: 20 }} />
            </div>
            <div>
              <ThumbDownOutlinedIcon style={{ fontSize: 20 }} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.infoData}>
        <div className={styles.infoDataLeft}>
          <div className={styles.infoTop}>
            <div className={styles.infoPoints}>{data.vote_average} pontos</div>
            <div>{firstDate.getFullYear()}</div>
            <div>
              {data.number_of_seasons} temporada{data.number_of_seasons !== 1 ? 's' : ''}
            </div>
          </div>
          <div className={styles.infoTagLine}>{data.tagline}</div>
          <div className={styles.infoDescription}>{data.overview}</div>
        </div>

        <div className={styles.infoDataRight}>
          <div>
            <strong>Gênero: </strong>
            {genres.join(', ')}
          </div>
          <div>
            <strong>Criação: </strong>
            {created.join(', ')}
          </div>
        </div>
      </section>
    </div>
  );
}