import { Movie } from "../types/Movie";

const url = 'http://localhost:3000'


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