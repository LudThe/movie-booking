import { Movie } from "../types/Movie";
import { Booking } from "../types/Booking";

const url = 'http://localhost:3000'


// movies
export async function fetchMovies(): Promise<Movie[]> {
    try {
        const response = await fetch(`${url}/movies`);
        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        const movies: Movie[] = await response.json();
        return movies;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function addMovie(movie: Movie): Promise<boolean> {
    try {
        const response = await fetch(`${url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });
        if (!response.ok) {
            throw new Error(response.status.toString());
        } else {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function updateMovie(movie: Movie): Promise<boolean> {
    try {
        const response = await fetch(`${url}/movies/${movie.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });
        if (!response.ok) {
            throw new Error(response.status.toString());
        } else {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function deleteMovie(movie: Movie): Promise<boolean> {
    try {
        const response = await fetch(`${url}/movies/${movie.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(response.status.toString());
        } else {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}



// bookings 
export async function fetchBookingsByMovieId(movieId: string): Promise<Booking[]> {
    try {
        const response = await fetch(`${url}/bookings?movieId=${movieId}`);
        if (!response.ok) {
            throw new Error(response.status.toString());
        }
        const bookings: Booking[] = await response.json();
        return bookings;
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function addBooking(booking: Booking): Promise<boolean> {
    try {
        const response = await fetch(`${url}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        });
        if (!response.ok) {
            throw new Error(response.status.toString());
        } else {
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}