const movieTitlesSelect = document.getElementById('movie-titles');
const peopleDetailsDiv = document.getElementById('people-details');
const movieDetailsDiv = document.getElementById("display-info");
const reviewInput = document.getElementById('review');
const submitReviewBtn = document.getElementById('submit-review');
const reviewsList = document.getElementById('reviews-list');
const resetReviewsBtn = document.getElementById('reset-reviews');
const showPeopleBtn = document.getElementById('show-people');
var movieName = ""

// Fetch movie titles and populate the select element
fetch('https://resource-ghibli-api.onrender.com/films')
  .then(response => response.json())
  .then(data => {
    console.log('data ', data);
    data.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie.id;
      option.text = movie.title;
      movieTitlesSelect.appendChild(option);
    });
  });

// Get movie details and display them
function displayMovieDetails(movieId) {
  fetch(`https://resource-ghibli-api.onrender.com/films/${movieId}`)
    .then(response => response.json())
    .then(movie => {
        movieName = movie.title;
      movieDetailsDiv.innerHTML = `
        <h3>${movie.title}</h3>
        <p>Director: ${movie.director}</p>
        <p>Producer: ${movie.producer}</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>${movie.description}</p>
      `;
    });
}

showPeopleBtn.addEventListener('click', event => {
    event.preventDefault();
    const movieId = movieTitlesSelect.value;
    if (!movieId) {
      alert('Please select a movie first');
      return;
    }

    fetch(`https://resource-ghibli-api.onrender.com/people`)
      .then(response => response.json())
      .then(people => {
        const peopleList = document.createElement('ol');
        peopleDetailsDiv.innerHTML=""
        people.forEach(person => {
          if(person.films.includes(`/films/${movieId}`)){
            const listItem = document.createElement('li');
            listItem.innerText = person.name;
            peopleList.appendChild(listItem);
          }
          else{
            console.log('person ', person.films);
            console.log('movie Id ', movieId);

          }
        });
        peopleDetailsDiv.appendChild(peopleList);
      });
  });

// Handle submit review form
submitReviewBtn.addEventListener('click', event => {
    event.preventDefault();
    const review = reviewInput.value;
    const movieId = movieTitlesSelect.value;
    if (!movieId) {
      alert('Please select a movie first');
      return;
    }
    if (review) {
      const li = document.createElement('li');
      let movieNameBox = `<strong>${movieName}</strong>`
      li.innerHTML = "<strong>" + movieName + "</strong>" + "    " +  review;
      reviewsList.appendChild(li);
      reviewInput.value = '';
    }
  });
  
// Handle reset reviews button click
resetReviewsBtn.addEventListener('click', () => {
  reviewsList.innerHTML = '';
});

// Listen for changes on the movie select element
movieTitlesSelect.addEventListener('change', () => {
  const movieId = movieTitlesSelect.value;
  if (movieId) {
    displayMovieDetails(movieId);
  } else {
    movieDetailsDiv.innerHTML = '';
  }
});
