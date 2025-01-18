# Movie booking site

This project is made with React and `react-router`.

To get access to the data in `db.json` run the command `npx json-server data/db.json`

## `BookingPage`

This is the start page. On first render it fetches all movies in an array, populates the `MovieSelect` dropdown, and sets the first movie in the array as the `selectedMovie`. 

Everytime a movie is selected the bookings for it are fetched and the seats that are already occupied cannot be selected by the user. 

Each seat is a `<div>` that has a `data-seat-id` and a `data-availability` attribute on them. These data attributes are used to handle the logic for when a user clicks and toggles the seats for booking, and are also used to apply the CSS styling. 

When a user has selected seats they can click the "Book seats" button and a `<dialog>` is opened. The form is handled and validated with the help of the `react-hook-form` package. 

If all input fields are valid the booking is posted to the `/bookings` endpoint and saved in the `db.json` file, and the user is redirected to the `SuccessPage`.


## `AdminPage`

Similarly to the `BookingPage`, all movies are fetched on first render and then sent to the `MovieSelect` dropdown. The difference here is that the first `<option>` in the dropdown is called "Add new movie", and if it's selected, the input fields in the form are emptied. If the fields are filled out and valid and the user clicks "Save" a new movie is added to `db.json`.

If an already existing movie is selected, the input fields are populated with its data, and the "Save" button makes a `PUT` call to update the selected movie by its id. 

If an existing movie is selected the "Delete" button is enabled, and when clicked it deletes it from `db.json`.

## `SuccessPage`

Everytime the user is redirected to here, a specific `message-id` is also added to the URL. On first render that parameter is checked and the message shown on screen matches whatever action the user performed, like "Seats booked!" or "Movie added!".

Confetti from the `react-confetti` package is also raining down from the top. 
