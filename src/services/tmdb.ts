// export default {
//     getHomeList : () =>{
//        return [
//            {
//                slug: 'originals',
//                title : "Originais do Netflix",
//                link : `/discover/tv/?with_network=213&`
//            },
//            {
//                slug: 'trending',
//                title : "Recomendados para Você",
//                link : `/trending/all/week?`
//            },
//            {
//                slug: 'toprated',
//                title : "Em Alta",
//                link : `/movie/top_rated?&`
//            },
//            {
//                slug: 'action',
//                title : "Ação",
//                link : `/discover/movie?with_genres=28&`
//            },
//            {
//                slug: 'comedy',
//                title : "Comédia",
//                link : `/discover/movie?with_genres=35&`
//            },
//            {
//                slug: 'horror',
//                title : "Terror",
//                link : `/discover/movie?with_genres=27&`
//            },
//            {
//                slug: 'romance',
//                title : "Romance",
//                link : `/discover/movie?with_genres=10749&`
//            },            
//            {
//                slug: 'documentary',
//                title : "Documentários",
//                link : `/discover/movie?with_genres=99&`
//            },
//        ]
//     },
// }

const basicFecth = async (endpoint: string) =>{
    return (await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`)).json();
}

export default {
     getHomeList : async () =>{
        return [
            {
                slug: 'originals',
                title : "Originais do Netflix",
                items : await basicFecth(`/discover/tv/?with_network=213&page=3&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'trending',
                title : "Recomendados para Você",
                items : await basicFecth(`/trending/all/week?language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'toprated',
                title : "Em Alta",
                items : await basicFecth(`/movie/top_rated?&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'action',
                title : "Ação",
                items : await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'comedy',
                title : "Comédia",
                items : await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'horror',
                title : "Terror",
                items : await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
            {
                slug: 'romance',
                title : "Romance",
                items : await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },            
            {
                slug: 'documentary',
                title : "Documentários",
                items : await basicFecth(`/discover/movie?with_genres=99&page=3&language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            },
        ]
     },

     getMovieInfo : async (movieId, type: string) =>{
        let info = {};
        if(movieId) {
            switch(type){
                case 'movie':
                    info = await basicFecth(`/movie/${movieId}?language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
                break;
                 case 'tv':
                    info = await basicFecth(`/tv/${movieId}?language=pt-BR&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

         return info;
     }
}