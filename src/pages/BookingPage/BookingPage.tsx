import { useEffect, useState } from "react"
import { Movie } from "../../types/Movie";
import { fetchMovies } from "../../api/api";
import styles from "./booking-page.module.css";

export default function BookingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const totalSeats: number = 48;
  const seatsPerRow: number = 8;
  const rows: number = Math.ceil(totalSeats / seatsPerRow);


  useEffect(() => {
    async function getMovies() {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
    }

    getMovies();
  }, []);


  useEffect(() => {
    setSelectedMovie(movies[0])
  }, [movies]);


  function handleMovieSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    let tempMovie = movies.find((el) => el.Id == e.target.value);
    setSelectedMovie(tempMovie);
  }


  function handleSeatSelect(seatId: number) {
    console.log(seatId);
  }


  function handleSeatStyling(seatId: number) {
    let tempClassName: string = styles.seat;

    selectedMovie?.BookedSeats.forEach(seat => {
      if (seat == seatId) {
        tempClassName += ` ${styles.occupied}`;
      }
    });

    selectedSeats.forEach(seat => {
      if (seat == seatId) {
        tempClassName += ` ${styles.selected}`;
      }
    });

    return tempClassName;
  }


  return (
    <div className={styles.booking}>

      {movies.length > 0 ?
        <div className={styles.movieContainer}>
          <label htmlFor="movie">Pick a movie:</label>
          <select
            value={selectedMovie?.Id}
            onChange={e => handleMovieSelect(e)}
            name="movie"
            id="movie">
            {movies.map((movie) => (
              <option key={movie.Id} value={movie.Id}>{`${movie.Title} (${movie.Price}kr)`}</option>
            ))}
          </select>
        </div>
        : null
      }


      <ul className={styles.showcase}>
        <li>
          <div className={styles.seat}></div>
          <small>N/A</small>
        </li>
        <li>
          <div className={`${styles.seat} ${styles.selected}`}></div>
          <small>Selected</small>
        </li>
        <li>
          <div className={`${styles.seat} ${styles.occupied}`}></div>
          <small>Occupied</small>
        </li>
      </ul>



      {selectedMovie != null ?
        <div className={styles.theaterContainer}>
          <div className={styles.screen}></div>

          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatId = rowIndex * seatsPerRow + seatIndex + 1;
                return seatId <= totalSeats ? (
                  <div
                    key={seatId}
                    className={handleSeatStyling(seatId)}
                    onClick={() => handleSeatSelect(seatId)}
                  ></div>
                ) : null;
              })}
            </div>
          ))}

        </div> : null
      }

    </div>
  )
}


