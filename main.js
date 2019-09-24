// http://www.omdbapi.com/?i=tt3896198&apikey=beca4155
// i=... === movie id

/* Requirements
A form to search for a movie based on its title.

When the form is submitted, the user should see a list of movies matching the search.

For each movie in the search results list, the user should see its title and release year.

If no movies match the search, the user should see a 'No movies match the title of: <insert search title here>' message.

Make the SPA look cool.
*/

const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
const movieInfo     = document.querySelector('.movie-info');

let ajaxResults;

const handleSubmit = (e) => {
  e.preventDefault();  
  
  let query = searchInput.value;

  fetch(`http://www.omdbapi.com/?t=${query}&plot=full&apikey=beca4155`)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      ajaxResults = response;
      response.Response === 'True' ? populateGallery(ajaxResults) : noMoviesMatched(query);
    })
    .catch(err => {console.log(err)
    });
}

const noMoviesMatched = (query) => {
  let noMatch = document.createElement('h2');
  noMatch.innerText = `No movies match the title of: ${query}`;
  movieInfo.innerHTML = '';
  movieInfo.append(noMatch);
}

const populateGallery = (results) => {
  movieInfo.innerHTML = '';

  const title = document.createElement('h2');
  title.innerText = results.Title;
  movieInfo.append(title);

  const year = document.createElement('h3');
  year.innerText = `(${results.Year})`;
  movieInfo.append(year);

  const movieDetails = document.createElement('div');
  movieDetails.setAttribute('class', 'movie-details');
  movieInfo.append(movieDetails);

  const containerL = document.createElement('div');
  containerL.setAttribute('class', 'container-left');
  movieDetails.append(containerL);
  
  const containerR = document.createElement('div');
  containerL.setAttribute('class', 'container-right');
  movieDetails.append(containerR);

  const poster = document.createElement('img');
  poster.setAttribute('src', results.Poster);
  containerL.append(poster);

  const plot = document.createElement('p');
  plot.innerText = results.Plot;
  containerR.append(plot);
}


searchBtn.addEventListener('click', handleSubmit);



