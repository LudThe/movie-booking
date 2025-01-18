import { Movie } from '../../types/Movie';
import styles from './movie-select.module.css'

type Props = {
    movies: Movie[];
    selectedMovie?: Movie;
    handleMovieSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    addNew: boolean
};


export default function MovieSelect({ movies, selectedMovie, handleMovieSelect, addNew }: Props) {

    return (
        <>
            {movies.length > 0 ?
                <div className={styles.movieSelectContainer}>
                    <label htmlFor="movie">Pick a movie:</label>
                    <select
                        value={selectedMovie?.id}
                        onChange={e => handleMovieSelect(e)}
                        name="movie"
                        id="movie"
                    >
                        {addNew ? <option value={0}>Add new movie</option> : null}

                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>{`${movie.title} (${movie.price} kr)`}</option>
                        ))}
                    </select>
                </div>
                : null}
        </>
    )
}


