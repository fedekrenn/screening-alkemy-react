// React
import { useEffect, useState } from 'react';
// Librerías
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
// Componentes
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import MovieCard from '../../components/MovieCard/MovieCard';



const MovieList = () => {

    let token = sessionStorage.getItem('token')
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=d492a22487e205c56d74c2e5d17a5013&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data.results;
                setMoviesList(apiData)
                setLoading(false)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Error al conectar con la API',
                })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !token ?
            <Navigate to="/" replace />
            :
            loading ?
                <LoaderSpinner />
                :
                <>
                    <h2>Las mejores películas</h2>
                    <section className="total-movies">
                        {moviesList.map((movie, i) => <MovieCard key={i} movie={movie} />)}
                    </section>
                </>
    )
}

export default MovieList;