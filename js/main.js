(() => {
    const movieBox = document.querySelector('#movie-box');
    const reviewTemplate = document.querySelector('#review-template');
    const reviewCon = document.querySelector('#review-con');
    const baseUrl = "https://search.imdbot.workers.dev";

    function getMovies() {
        fetch(`${baseUrl}?q=terminator`)
        .then(response => response.json())
        // fetch json string and then take the response and convert it to json object
        .then(function(response){
            console.log(response);
            const movies = response.description;
            const ul = document.createElement('ul');
            movies.forEach(movie => {
                const li = document.createElement('li');
                const a =document.createElement('a');
                a.textContent = movie["#TITLE"];
                a.dataset.review = movie["#IMDB_ID"];
                li.appendChild(a);
                ul.appendChild(li);
            })
            movieBox.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll("#movie-box li a");
            links.forEach(function(link){
                link.addEventListener("click", getReview)
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    function getReview(e) {
        // console.log("Review Called");
        // console.log(e.currentTarget.dataset.review);
        const reviewID = e.currentTarget.dataset.review;
        fetch(`${baseUrl}?tt=${reviewID}`)
        .then(response => response.json())
        .then(function(response){
            console.log(response.short.review.reviewBody);
            reviewCon.innerHTML = "";
            const clone = reviewTemplate.content.cloneNode(true);
            const reviewDescription = clone.querySelector(".review-description");
            reviewDescription.innerHTML = response.short.review.reviewBody;
            reviewCon.appendChild(clone);
        })
        .catch(function(err) {
            reviewCon.innerHTML = "<p>No review found</p>";
            console.log(err);
        });
    }
    
    // object.aka (no pound sign)
    // object[#aka] (with pound sign)
    
    // for homework include spinners
    // for home name images with numbers (6.jpg) because the api uses nubers for their unique id's so that would just make it easier
    
    getMovies();

})();
