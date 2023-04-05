
// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
let dropdown = document.querySelector('select');
let form = document.querySelector('form')
fetch(`https://resource-ghibli-api.onrender.com/films/`).then(response => response.json()).then( movies => {
    for(let i = 0; i < movies.length; i++){

        let  option = document.createElement('option');
        option.textContent = movies[i].title;
        dropdown.append(option);

        option.setAttribute('value', movies[i].id);
        movieDescription(movies);
    }
})
// data.forEach(movies => {
//     let option = document.createElement('option');
//         option.textContent = movies.title;
//         dropdown.append(option);
//         option.setAttribute('value', movies.id);
// })
function movieDescription(movies) {
    dropdown.addEventListener('change', (e) => {
        e.preventDefault();
        let info = document.querySelector('#display-info');
        info.innerHTML = ''
        let h3 = document.createElement('h3')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')

        for(let i = 0; i < movies.length; i++){
            if(dropdown.value === movies[i].id) {
                h3.textContent = `${movies[i].title}`
                p1.textContent = `${movies[i].release_date}`
                p2.innerHTML = `${movies[i].description}`
                info.append(h3, p1, p2)
            }
        }
    })
}//end of function

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(dropdown.selectedIndex === 0) {
        console.log("No Movies")
    }else {
        let name = dropdown[dropdown.selectedIndex].innerHTML;
        let movieReview = document.querySelector('#review')
        let reviewInfo = movieReview.value
        const list = document.createElement('li')
        list.innerHTML = `<strong><b>${name}: </b></strong>${reviewInfo}`;
        const ul = document.querySelector('ul') 
        ul.append(list);

    }
    })
// form.addEventListener('submit' , (event) => {
//     event.preventDefault();
    
//     for(let i = 0; i < movies.length; i++){
//         if(dropdown.value === movies[i].id) {
//            let people = document.querySelector(".show-people")
//            let peopleNames = movies.people
//            let ol = document.querySelector("ol")
//             ol.append(peopleNames)
//         }//end of if
//     }


// })
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
