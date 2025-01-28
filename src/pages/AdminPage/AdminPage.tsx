import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import { fetchMovies, addMovie, updateMovie, deleteMovie } from "../../api/api";
import MovieSelect from "../../components/MovieSelect/MovieSelect";
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import styles from "./admin-page.module.css";

export default function AdminPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();


    useEffect(() => {
        async function getMovies() {
            const fetchedMovies = await fetchMovies();
            setMovies(fetchedMovies);
        }

        getMovies();
    }, []);


    function handleMovieSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const tempMovie = movies.find((el) => el.id == e.target.value);

        setValue("title", tempMovie?.title);
        setValue("price", tempMovie?.price);
        setSelectedMovie(tempMovie);
    }


    async function onSubmit(data: FieldValues) {
        if (selectedMovie != null) {
            const updatedMovie: Movie = {
                id: selectedMovie.id,
                title: data.title,
                price: data.price
            }

            const res = await updateMovie(updatedMovie);

            if (res) {
                navigate("/success/update-movie");
            } else {
                alert("Something went wrong")
            }

        } else {
            const newMovie: Movie = {
                title: data.title,
                price: data.price
            }

            const res = await addMovie(newMovie);

            if (res) {
                navigate("/success/add-movie");
            } else {
                alert("Something went wrong")
            }
        }
    }


    async function onClickDelete() {
        if (selectedMovie) {
            const res = await deleteMovie(selectedMovie);

            if (res) {
                navigate("/success/delete-movie");
            } else {
                alert("Something went wrong")
            }
        }
    }


    return (
        <div className={styles.adminPage}>

            <MovieSelect
                movies={movies}
                selectedMovie={selectedMovie}
                handleMovieSelect={handleMovieSelect}
                addNew={true}
            />


            <div className={styles.formContainer}>
                <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>

                    <div>
                        <label htmlFor="title">Title</label>

                        <input type="text" id="title"
                            {...register("title", { required: "Title required" })}
                        ></input>

                        <small className="error">{errors.title?.message?.toString()}</small>
                    </div>


                    <div>
                        <label htmlFor="price">Price</label>

                        <input type="number" id="price"
                            {...register("price", { required: "Price required" })}
                        ></input>

                        <small className="error">{errors.price?.message?.toString()}</small>
                    </div>


                    <button type="submit">Save</button>
                </form>

                <button
                    onClick={onClickDelete}
                    disabled={selectedMovie == null ? true : false}
                >
                    Delete
                </button>
            </div>


        </div>
    )
}


