import Head from 'next/head'
import { useEffect, useState } from 'react'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { MovieRow } from '../components/MovieRow'
import { Header } from '../components/Header'

import tmdb from '../services/tmdb'

import styles from './home.module.scss'

export default function Home() {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      const list = await tmdb.getHomeList()

      setMovieList(list)

      const originals = list.filter(i => i.slug === 'originals')
      const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      const chosenMovie = originals[0].items.results[randomChosen]
      const chosenInfo = await tmdb.getMovieInfo(chosenMovie.id, 'tv')

      setFeatureData(chosenInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Nextflix</title>
      </Head>
      <main className={styles.homePage}>

        <Header backgroundColor={blackHeader} />

        {featuredData &&
          <FeaturedMovie movie={featuredData} />
        }

        <section className={styles.lists}>
          {movieList.map((item, key) => (
            < MovieRow key={key} title={item.title} movies={item.items} />
          ))}
        </section>

        <footer className={styles.footer}>
          Feito por Pablo Ribeiro<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site <a href="https://www.themoviedb.org/">themoviedb.org</a>
        </footer>
      </main>
    </>
  )
}
