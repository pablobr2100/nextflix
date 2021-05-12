import { useEffect, useState } from "react"
import Head  from "next/head"
import { useRouter } from "next/router"

import { Header } from "../../components/Header"
import { MovieModal } from "../../components/MovieModal"

export default function MoviePage() {
    const router = useRouter()
    const { movieId } = router.query

    console.log(movieId)

    const [blackHeader, setBlackHeader] = useState(false)

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
                <title>Nextflix | {movieId}</title>
            </Head>
            <main>
                <Header backgroundColor={blackHeader} />
                <MovieModal movieId={movieId} />
            </main>
        </>
    )
}