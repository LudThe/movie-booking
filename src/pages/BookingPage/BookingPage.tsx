import { useEffect, useState, useRef } from "react"
import { Movie } from "../../types/Movie";
import { Booking } from "../../types/Booking";
import { fetchMovies, fetchBookingsByMovieId } from "../../api/api";
import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./booking-page.module.css";

export default function BookingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const totalSeats: number = 48;
  const seatsPerRow: number = 8;
  const rows: number = totalSeats / seatsPerRow;


  useEffect(() => {
    async function getMovies() {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
    }

    getMovies();
  }, []);


  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[0])
      getBookings(movies[0].id!)
    }
  }, [movies]);


  async function getBookings(movieId: string) {
    const fetchedBookings = await fetchBookingsByMovieId(movieId);
    setBookings(fetchedBookings);
  }


  function handleMovieSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    let tempMovie = movies.find((el) => el.id == e.target.value);

    getBookings(tempMovie?.id!)
    setSelectedMovie(tempMovie);
    setSelectedSeats([]);
  }


  function handleSeatAvailability(seatId: number) {
    let tempSeat: string = "free";

    bookings.forEach((booking) => {
      booking.bookedSeats.forEach((seat) => {
        if (seat == seatId) {
          tempSeat = "occupied"
        }
      });
    });

    selectedSeats.forEach(seat => {
      if (seat == seatId) {
        tempSeat = "selected"
      }
    });

    return tempSeat;
  }


  function handleSeatSelect(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let tempSeat: DOMStringMap = e.currentTarget.dataset;
    let tempAvailability: string | undefined = tempSeat.availability;
    let tempSeatId: number = parseInt(tempSeat.seatId || '');

    if (tempAvailability == "free") {
      setSelectedSeats([...selectedSeats, tempSeatId]);
    }

    if (tempAvailability == "selected") {
      let filtered: number[] = selectedSeats.filter((seat) => seat !== tempSeatId);
      setSelectedSeats(filtered);
    }
  }


  function toggleDialog() {
    if (dialogRef.current) {
      dialogRef.current.hasAttribute("open") ?
        dialogRef.current.close() :
        dialogRef.current.showModal();
    }
  }


  return (
    <div className={styles.booking}>

      {movies.length > 0 ?
        <div className="movie-container">
          <label htmlFor="movie">Pick a movie:</label>
          <select
            value={selectedMovie?.id}
            onChange={e => handleMovieSelect(e)}
            name="movie"
            id="movie"
          >
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>{`${movie.title} (${movie.price} kr)`}</option>
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
        <>

          <div className={styles.theaterContainer}>
            <div className={styles.screen}></div>

            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                  const seatId = rowIndex * seatsPerRow + seatIndex + 1;
                  return seatId <= totalSeats ? (
                    <div
                      key={seatId}
                      className={styles.seat}
                      data-seat-id={seatId}
                      data-availability={handleSeatAvailability(seatId)}
                      onClick={(e) => handleSeatSelect(e)}
                    ></div>
                  ) : null;
                })}
              </div>
            ))}

          </div>


          <p className="text">
            You have selected
            <span> {selectedSeats.length} </span>
            seats for a price of
            <span> {selectedSeats.length * selectedMovie?.price} </span>
            kr
          </p>


          <button
            className={styles.bookBtn}
            onClick={toggleDialog}
            disabled={selectedSeats.length > 0 ? false : true}
          >
            Book seats
          </button>

          <BookingForm
            selectedMovie={selectedMovie}
            selectedSeats={selectedSeats}
            toggleDialog={toggleDialog}
            ref={dialogRef}
          />

        </> : null
      }

    </div>
  )
}


