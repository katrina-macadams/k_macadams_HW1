(() => {
    const baseUrl = "https://swapi.dev/api/";
    const cardGrid = document.querySelector('.card-grid');
    const movieTemplate = document.querySelector('#movie-template');
    const movieCon = document.querySelector('#movie-con');

    function getChar() {
        fetch(`${baseUrl}people/`)
        .then(response => response.json())
        .then(function(response){
            console.log(response);
            const characters = response.results;
            characters.forEach(character => {
                const card = document.createElement('a');
                card.classList.add('card', 'col-span-2', 'm-col-span-3');
                card.href = '#';
                card.dataset.films = character.films.join(',');

                const cardBackground = document.createElement('div');
                cardBackground.classList.add('card-background');
                const charId = character.url.split('/')[5];
                // console.log(charId);
                cardBackground.style.backgroundImage = `url(../images/${charId}.jpg)`;
                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                const cardName = document.createElement('h3');
                cardName.classList.add('card-name');
                cardName.textContent = character.name;

                cardContent.appendChild(cardName);
                card.appendChild(cardBackground);
                card.appendChild(cardContent);
                cardGrid.appendChild(card);
            });
        })
        .then(function(){
            const links = document.querySelectorAll('.card-grid a');
            links.forEach(function(link){
                link.addEventListener("click", getFilm);
            });
        })
        .catch(function(err){
            console.error('Error fetching characters:', err);
        });
    }


    function getFilm(e) {
        e.preventDefault();
        const filmUrls = e.currentTarget.dataset.films.split(',');
        movieCon.innerHTML = ''; 

        filmUrls.forEach(filmUrl => {
            fetch(filmUrl)
            .then(response => response.json())
            .then(function(film){
                const clone = movieTemplate.content.cloneNode(true);
                const movieCrawl = clone.querySelector('.crawl-text');
                const movieTitle = clone.querySelector('.title');
                const posterBackground = clone.querySelector('.poster');
                const filmId = film.episode_id;
                // console.log(`Film ID: ${filmId}`);
                posterBackground.style.backgroundImage = `url(../images/${filmId}.png)`;
                const cardContent = document.createElement('div');
                cardContent.classList.add('card-content');

                movieCrawl.innerHTML = film.opening_crawl;
                movieTitle.innerHTML = film.title;
                movieCon.appendChild(clone);

                gsap.to(window, {duration: 1, scrollTo: {y: "#movies-sec", offsetY: 100}});
            })
            .catch(function(err){
                movieCon.innerHTML = "<p>Something went wrong</p>";
                console.error('Error fetching film:', err);
            });
        });
    }

    getChar();
})();

(() => {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const navLinks = document.querySelectorAll("#button");
    const cardLinks = document.querySelectorAll("card-grid a");


    function scrollLink(e) {    
            e.preventDefault(); 
            let selectedLink = (".card-wrapper");
            gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

    gsap.to(".card-wrapper", .5,
        {scrollTrigger: {
            trigger: "#button",
            //onEnter onLeave onEnterBack onLeaveBack
            toggleActions: "restart none reverse none",
            markers: true,
            // animation box start, scroller start
            start: "top center",
            // animatiom box end, scroller end
            end: "bottom center"
        }, ease:Bounce.easeOut

        }
    )

  
})();