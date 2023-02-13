let btnSend = document.getElementById('btnSend');
let page = 1; // Sert pour la pagination
let resultsLeft = 0; // Sert pour la pagination

btnSend.addEventListener('click', () => { 
    let xhr = new XMLHttpRequest();
    let userTitle = document.getElementById('userTitle');   //
    let userYear = document.getElementById('userYear');     // Récupère les données contenues dans le formulaire
    let userMedia = document.getElementById('mediaSelect'); //
    console.log(userMedia.value);
    console.log(userTitle.value);
    console.log(userYear.value);
    xhr.open("GET", `http://www.omdbapi.com/?apikey=61ff7244&s=${userTitle.value}&y=${userYear.value}&type=${userMedia.value}&page=1`); // Utilise les données formulaire pour faire une requête
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let test = JSON.parse(xhr.responseText);
            console.log(test);
            console.log(test.totalResults);
            resultsLeft = test.totalResults; // OMDB n'affiche que 10 résultats à la fois mais donne tout de même le nombre de resultats total
            
            let gallery = document.getElementById("gallery");
            while (gallery.firstChild) {    // Nettoie la gallery
                gallery.removeChild(gallery.firstChild);
            };

            let serachResults = document.createElement('div')
            serachResults.innerHTML = `<h3 class="text-center mb-3 mt-3 bg-dark text-light border-top border-bottom border-light border-2">Résultats de votre recherche</h3>`;
            
            let mainElement = document.getElementById('msgResults');
            while (mainElement.firstChild) {
                mainElement.removeChild(mainElement.firstChild);
            };

            mainElement.appendChild(serachResults);

            for (i = 0; i < test.Search.length; i++) { // Parcoure les infos reçues

                let newRef = document.createElement('article'); //
                let title = document.createElement('h6');       //          
                let year = document.createElement('p');         // Fabrique des éléments qui vont constituer une card bootstrap pour afficher les infos reçues
                let poster = document.createElement('img');     //
                let cardBody = document.createElement('div');   //

                newRef.classList.add('card', 'mb-3', 'bg-dark');                 //
                newRef.setAttribute('style', 'width: 350px');                    //
                cardBody.classList.add('card-body');                             //
                title.classList.add('card-title', 'text-center', 'text-light');  // Rajoute des class aux éléments fabriqué au-dessus
                year.classList.add('card-text', 'text-center', 'text-light');    // 
                poster.classList.add('card-img-top');                            //
                poster.setAttribute('style', 'width: 348px; height: 400px');     //

                title.innerHTML = `${test.Search[i].Title}`;                     //
                year.innerHTML = `${test.Search[i].Year}`;                       // Rempli les éléments fabriqués au-dessus
                if (test.Search[i].Poster == `N/A`) {                            //  
                    poster.setAttribute('src', `./assets/img/closeEnough.jpg`);  //
                }                                                                // Affiche le poster s'il y en a un sinon affiche une autre image à la place
                else {                                                           //
                    poster.setAttribute('src', `${test.Search[i].Poster}`);      //
                }

                newRef.appendChild(poster);     //
                newRef.appendChild(cardBody);   // Construit une card
                cardBody.appendChild(title)     //
                cardBody.appendChild(year);     //

                let gallery = document.getElementById('gallery');

                gallery.appendChild(newRef); // Ajoute la card à la gallerie

            }
            page = 1; // Reset page à 1 si une recherche à déjà été effectuée
            let displayPag = document.getElementById('pagination'); // Nettoie la zone de pagination si une recherche a déjà été effectuée
            while (displayPag.firstChild) {
                displayPag.removeChild(displayPag.firstChild);
            };
            while (resultsLeft > 0) { // Prend tous les résultats de la recherche (pas seulement ceux qui sont donnés) et crée un bouton pour les afficher par tranche de 10
                let pagination = document.createElement('div');
                pagination.innerHTML = `<button class="btn btn-dark btn-sm me-2" type="submit" value="${page}">${page}</button>`;
                displayPag.appendChild(pagination);
                resultsLeft = resultsLeft - 10;
                page++; // En incrémentant la valeur page on obtient les 10 résultats suivants
            }
            let btnPag = document.getElementsByTagName('button');
            for (i of btnPag) { // Les boutons de pagintation déclanchent tous la fonction useBtnPage (en-dessous) avec eux-mêmes en "valeur"
                i.addEventListener('click', function () { useBtnPag(this) });
            }
        };
    };
    xhr.send();
})

/**
 * 
 * @param {button} x correspond au bouton sur lequel on a cliqué
 */
function useBtnPag(x) { // Globalement la même fonction qu'au-dessus mais la requête change.
    let xhr = new XMLHttpRequest();
    let userTitle = document.getElementById('userTitle');
    let userYear = document.getElementById('userYear');
    let userMedia = document.getElementById('mediaSelect');
    console.log(userMedia.value);
    console.log(userTitle.value);
    console.log(userYear.value);
    let gallery = document.getElementById("gallery");
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    };
    xhr.open("GET", `http://www.omdbapi.com/?apikey=61ff7244&s=${userTitle.value}&y=${userYear.value}&type=${userMedia.value}&page=${x.value}`); // Utilise la value du bouton sur lequel on a cliqué pour obtenir les résultats de la page correspondante.
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let test = JSON.parse(xhr.responseText);
            console.log(test.Search.length);
            for (i = 0; i < test.Search.length; i++) {

                let newRef = document.createElement('article');
                let title = document.createElement('h6');
                let year = document.createElement('p');
                let poster = document.createElement('img');
                let cardBody = document.createElement('div');

                newRef.classList.add('card', 'mb-3', 'bg-dark');
                newRef.setAttribute('style', 'width: 350px');
                cardBody.classList.add('card-body');
                title.classList.add('card-title', 'text-center', 'text-light');
                year.classList.add('card-text', 'text-center', 'text-light');
                poster.classList.add('card-img-top');
                poster.setAttribute('style', 'width: 348px; height: 400px')


                title.innerHTML = `${test.Search[i].Title}`;
                year.innerHTML = `${test.Search[i].Year}`;
                if (test.Search[i].Poster == `N/A`) {
                    poster.setAttribute('src', `./assets/img/closeEnough.jpg`);
                }
                else {
                    poster.setAttribute('src', `${test.Search[i].Poster}`);
                }

                newRef.appendChild(poster);
                newRef.appendChild(cardBody);
                cardBody.appendChild(title)
                cardBody.appendChild(year);

                let gallery = document.getElementById('gallery');

                gallery.appendChild(newRef);
            }
        };

    };
    xhr.send();
}

