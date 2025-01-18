import { forwardRef } from 'react';
import { useNavigate } from 'react-router';
import { FieldValues, useForm } from 'react-hook-form';
import { Movie } from '../../types/Movie';
import { Booking } from '../../types/Booking';
import { addBooking } from '../../api/api';
import styles from './booking-form.module.css'

type Props = {
    selectedMovie: Movie;
    selectedSeats: number[];
    toggleDialog: () => void;
};


export default forwardRef<HTMLDialogElement, Props>(function BookingForm({ selectedMovie, selectedSeats, toggleDialog }, ref) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    async function onSubmit(data: FieldValues) {
        const newBooking: Booking = {
            movieId: selectedMovie.id!,
            name: data.name,
            phoneNumber: data.phone,
            bookedSeats: [...selectedSeats]
        }

        const res = await addBooking(newBooking);

        if (res) {
            navigate("/success/add-booking");
        } else {
            alert("Something went wrong")
        }
    }


    return (
        <dialog
            ref={ref}
            // closes the dialog if background is clicked
            onClick={(e) => {
                if (e.currentTarget === e.target) {
                    toggleDialog();
                }
            }}
        >
            <div className={styles.booking}>
                <button onClick={toggleDialog}>X</button>

                <form noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>

                    <div>
                        <label htmlFor="phone">Phone number</label>

                        <input type="text" id="phone"
                            {...register("phone",
                                {
                                    required: "Phone number required",
                                    validate: {
                                        matchPattern: (v) =>
                                            /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/.test(v) ||
                                            "Phone number must be valid",
                                    }
                                })}
                        />

                        <small className="error">{errors.phone?.message?.toString()}</small>
                    </div>


                    <div>
                        <label htmlFor="name">Name</label>

                        <input type="text" id="name"
                            {...register("name", { required: "Name required" })}
                        ></input>

                        <small className="error">{errors.name?.message?.toString()}</small>
                    </div>


                    <button type="submit">Book seats</button>
                </form>
            </div>
        </dialog>
    );
});



