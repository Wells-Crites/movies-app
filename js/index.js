(async () => {
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object 
    // with your team name in the "js/movies-api.js" file.
    let loading = `<div class="loading"><img class="img-loading m-auto" src="/images/loading.gif"></div>`;
    $("#movies").html(loading);
    const movies = await getMovies()
    console.log(movies);
    let movieData = "";
    let movieCard = "";
    movies.forEach((movie) => {
        movieCard +=
            `<div class="col-lg-4 col-md-6 col-sm-12">
                 <div class="card jump">
<!--                   <img src="images/default-movie-poster.png" class="card-img-top" alt="No movie poster image available">-->
                   <img src='${movie.poster_url}' class="card-img-top" alt="movie poster">
                            <h1 class="title">${movie.title}</h1>
                            <h3 class="rating">${movie.rating}</h3>
                            <h4 class="released">Released: ${movie.released_year}</h4>
                            <h5 class="user-rating">Rating: ${movie.user_rating}</h5>
                            <div class="director">Directed By: ${movie.director}</div>
                            <div class="plot">Plot:
                                <div>${movie.plot}</div>
                            </div>
                 </div>
             </div>`

                movieData += `<option value=${movie.id}>${movie.title}</option>`;
                $("#movies").html(movieCard);
                $(".delete-menu").html("<option selected>Select a movie to delete</option>" + movieData);
                $(".edit-menu").html("<option selected>Select a movie to edit</option>" + movieData);
                $(".search-menu").html("<option selected>Search for a movie</option>" + movieData);
                });


//     Add movies
    $('#add-btn').on('click', (event) => {
        event.preventDefault();

        let userAddedMovieData = {
            title: $("#user-title").val(),
            rating: $("#user-rating").val(),
            released_year: $("#user-release-year").val(),
            director: $("#user-director").val(),
            plot: $("#user-plot").val(),
            genre: $('#user-genre').val(),
            user_rating: $("#user-rating-score").val(),
            poster_url: $('#user-poster').val()
        }
        addMovie(userAddedMovieData)
    });

})();

//Edit Movies

$("#edit-btn").on('click', (event) => {
    event.preventDefault();
    //Allows the user to select from a current list of available movies from the database
    let availableMovies = $(".edit-menu").val()

    //Gets the user's input data for the movie to be edited
    let userEditInput = {
        title: $("#edit-title").val(),
        rating: $("#edit-rating").val(),
        released_year: $("#edit-release-year").val(),
        director: $("#edit-director").val(),
        plot: $("#edit-plot").val(),
        genre: $('#edit-genre').val(),
        user_rating: $("#edit-rating-score").val(),
        poster_url: $('#edit-poster').val()
    }

    updateMovie(availableMovies, userEditInput);
});

//Delete Movie

$("#select-delete").change( function () {
    //Gets the user selected movie data from the dropdown menu
    let userSelection = $(this).val();
    console.log(userSelection);

    //When the submit button is clicked, the function sends the DELETE request to the database with the user selected information to be deleted.
    $("#delete-btn").on('click', function (){
       deleteMovie({id:userSelection})
    })



});

