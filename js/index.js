(async () => {
    "use strict";
    // This is the entry point for your application. Write all of your code here.
    // Before you can use the database, you need to configure the "db" object
    // with your team name in the "js/movies-api.js" file.
    let moviesArray = [];
    const movieStars = (movie) => {
        let ratingDisplay = "";
        const fullStars = Math.floor(movie.user_rating);
        const fractionalStar = movie.user_rating % 1;
        for (let i = 0; i < fullStars; i++) {
            ratingDisplay += "<i class=\"fa-solid fa-star\"></i>";
        }
        if (fractionalStar >= 0.5) {
            ratingDisplay += "<i class=\"fa-solid fa-star-half-stroke\"></i>";
        } else if (fractionalStar > 0) {
            ratingDisplay += "<i class=\"fa-solid fa-star-half-stroke\"></i>";
        }
        return ratingDisplay;
    }

    const movies = async () => {
        let loading = `<div class="loading"><img class="img-loading m-auto" src="/images/loading.gif"></div>`;
        $("#movies").html(loading);
        const movies = await getMovies()
        moviesArray = movies;
        console.log(movies)
        let movieData = "";
        let movieCard = "";
        movies.forEach((movie) => {
            movieCard +=
                `<div class="w-100">
                 <div class="card card-custom jump">
                   <img src='${movie.poster_url}' class="card-img-top" alt="movie poster">
                    <h1 class="title">${movie.title}</h1>
                    <h3 class="movie-stars">${movieStars(movie)}</h3>
                    <h5 class="user-rating">Audience Score: ${movie.user_rating}/10</h5>                
                <!-- info div -->
                 <div class="info">
                 <p class="released">Released: <span>${movie.released_year}</span></p>
                 <p class="rating">Rated: <span>${movie.rating}</span></p>
                 <p class="director">Director: <span>${movie.director}</span></p>
                 <p class="cast">Cast: <span>${movie.cast}</span></p>
                 <p class="writers">Writers: <span>${movie.writers}</span></p>
                 <p class="awards">Awards: <span>${movie.awards}</span></p>
                 <p class="runtime">Runtime: <span>${movie.runtime}</span></p>
                 <p class="genre">Genre: <span>${movie.genre}</span></p>
                 </div>
                  <div class="plot">Plot:
                      <div class="plot-data">${movie.plot}</div>
                  </div>

                 </div>
             </div>`

            movieData += `<option value=${movie.id}>${movie.title}</option>`;

            $("#movies").html(movieCard);
            $(".delete-menu").html("<option selected>Select a movie to delete</option>" + movieData);
            $(".edit-menu").html("<option selected>Select a movie to edit</option>" + movieData);
            $(".search-menu").html("<option selected>Search movies now playing</option>" + movieData);
        });


    }

    await movies();

//This function allows the user to create and add a new movie to the database while dynamically updating the DOM
//with the new movie card.

    const updateMovieCard =  (input) => {
        let movieCard = "";
        movieCard += `<div class="card card-custom jump">
                 <img src='${input.poster_url}' class="card-img-top" alt="movie poster">
                 <h1 class="title">${input.title}</h1>
                 <h5 class="user-rating">Audience Score: ${input.user_rating}/10</h5>
                <!-- info div -->
                 <div class="info">
                 <p class="released">Released: <span>${input.released_year}</span></p>
                 <p class="rating">Rated: <span>${input.rating}</span></p>
                 <p class="director">Director: <span>${input.director}</span></p>
                 <p class="cast">Cast: <span>${input.cast}</span></p>
                 <p class="writers">Writers: <span>${input.writers}</span></p>
                 <p class="awards">Awards: <span>${input.awards}</span></p>
                 <p class="runtime">Runtime: <span>${input.runtime}</span></p>
                 <p class="genre">Genre: <span>${input.genre}</span></p>
                 </div>
                 <div class="plot">Plot:
                     <div class="plot-data">${input.plot}</div>
                 </div>
             </div>`

        $("#movies").append(movieCard);

    }
    await movies();

    //Allows the user to add movies
    $('#add-btn').on('click', () => {

        let userAddedMovieData = {
            title: $("#user-title").val(),
            rating: $("#user-rating").val(),
            released_year: $("#user-release-year").val(),
            director: $("#user-director").val(),
            plot: $("#user-plot").val(),
            genre: $('#user-genre').val(),
            user_rating: $("#user-rating-score").val(),
            poster_url: $('#user-poster').val(),
            cast: $('#user-cast').val(),
            writers: $('#user-writers').val(),
            awards: $('#user-awards').val(),
            runtime: $('#user-runtime').val()
        }

        addMovie(userAddedMovieData);
        updateMovieCard(userAddedMovieData);
    });



    //Allows the user to edit movies
    $("#edit-btn").on('click', () => {
        //Allows the user to select from a current list of available movies from the database
        let availableMovies = $(".edit-menu").val()
        // console.log(availableMovies);

        //Gets the user's input data for the movie to be edited
        let userEditInput = {
            title: $("#edit-title").val(),
            rating: $("#edit-rating").val(),
            released_year: $("#edit-release-year").val(),
            director: $("#edit-director").val(),
            plot: $("#edit-plot").val(),
            genre: $('#edit-genre').val(),
            user_rating: $("#edit-rating-score").val(),
            poster_url: $('#edit-poster').val(),
            cast: $('#edit-cast').val(),
            writers: $('#edit-writers').val(),
            awards: $('#edit-awards').val(),
            runtime: $('#edit-runtime').val()
        }

        let movieCard = "";
        for (let movie of moviesArray) {
            if (movie.id === movieCard) {
                movieCard += `<div class="w-100">
                            <div class="card card-custom jump">
                              <img src='${userEditInput.poster_url}' class="card-img-top" alt="movie poster">
                               <h1 class="title">${userEditInput.title}</h1>
                                <h5 class="user-rating">Audience Score: ${userEditInput.user_rating}/10</h5>
           <!-- info div -->
                            <div class="info">
                            <p class="released">Released: <span>${userEditInput.released_year}</span></p>
                            <p class="rating">Rated: <span>${userEditInput.rating}</span></p>
                            <p class="director">Director: <span>${userEditInput.director}</span></p>
                            <p class="cast">Cast: <span>${userEditInput.cast}</span></p>
                            <p class="writers">Writers: <span>${userEditInput.writers}</span></p>
                            <p class="awards">Awards: <span>${userEditInput.awards}</span></p>
                            <p class="runtime">Runtime: <span>${userEditInput.runtime}</span></p>
                            <p class="genre">Genre: <span>${userEditInput.genre}</span></p>
                            </div>
                            <div class="plot">Plot:
                              <div class="plot-data">${userEditInput.plot}</div>
                            </div>

                            </div>
                        </div>`
                $("#movies").append(movieCard);
            }
        }
        updateMovie(availableMovies, userEditInput);
        movies()
    });


//Delete Movie

    $("#select-delete").change( function () {
        //Gets the user selected movie data from the dropdown menu
        let userSelection = $(this).val();
        // console.log(userSelection);

        //When the submit button is clicked, the function sends the DELETE request to the database with the user selected information to be deleted.
        $("#delete-btn").on('click', function () {
            deleteMovie({id: userSelection})
            movies();
        })
    });

//Search function

    $("#search-menu").change( function () {

        let selectedMovie = $(this).val();
        console.log(selectedMovie);
        $('#movies').empty();
        let movieCard = "";
        for (let movie of moviesArray) {
            if (movie.id === selectedMovie) {
                movieCard += `<div class="w-100">
                                  <div class="card card-custom jump">
                                     <img src='${movie.poster_url}' class="card-img-top" alt="movie poster">
                                        <h1 class="title">${movie.title}</h1>
                                        <h3 class="rating">${movie.rating}</h3>
                                        <h4 class="released">Released: ${movie.released_year}</h4>
                                        <h5 class="user-rating">Rating: ${movie.user_rating}</h5>
                                        <div class="director">Directed by: ${movie.director}</div>
                                        <div class="genre">Genre: ${movie.genre}</div>
                                        <div class="plot">Plot:
                                            <div class="plot-data">${movie.plot}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            else if (selectedMovie === 'Search movies now playing'){
                $("#movies").append(movies());
            }
        }
        $("#movies").append(movieCard);


        $("#search-btn").on('click', function () {
            // console.log("Clicked")
            searchMovie({id: selectedMovie})
        });

    });

})();



