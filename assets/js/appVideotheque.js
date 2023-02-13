var films = [
    { name: "Deadpool", years: 2016, authors: "Tim Miller" },
    { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
    { name: "Scream", years: 1996, authors: "Wes Craven" },
    { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" }
];

window.onload = function () { refreshTable() };

function cleanTable() { // Permet de supprimer le tableau affiché
    let movieTable = document.getElementById("tableau");
    while (movieTable.firstChild) {
        movieTable.removeChild(movieTable.firstChild);
    };
};

function refreshTable() { // Affiche le contenu de films dans un tableau
    for (i = 0; i < films.length; i++) {

        let newRow = document.createElement('tr');
        let titleCell = document.createElement('td');
        let yearCell = document.createElement('td');
        let directorCell = document.createElement('td');
        let deleteRow = document.createElement('td');

        titleCell.innerHTML = films[i].name;
        yearCell.innerHTML = films[i].years;
        directorCell.innerHTML = films[i].authors;
        deleteRow.innerHTML = '<button type="submit" class="btn btn-danger btn-sm" name="btnDelete" title="Supprimer film">X</button>'; // Crée un bouton pour supprimer la ligne où il se trouve

        newRow.appendChild(titleCell);
        newRow.appendChild(yearCell);
        newRow.appendChild(directorCell);
        newRow.appendChild(deleteRow);

        let movieTable = document.getElementById('tableau');

        movieTable.appendChild(newRow);
    }
    let btnDelete = document.getElementsByName('btnDelete');
    for (i of btnDelete) {                                      // Tous les boutons ajoutés au-dessus peuvent déclancher la fonction qui supprime la ligne où ils se trouvent
        i.addEventListener('click', function () { removeRow(this) });
    }
};


/**
 * 
 * @param {this} x correspond au bouton sur lequel on a cliqué
 */
function removeRow(x) {
    Swal.fire({  // Utilisation de la libraire sweetalert2 pour confirmer ou annuler la suppression d'un film dans le tableau
        title: 'En êtes-vous sûr?',
        text: "Cette action est irréversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Terminé!',
                'Votre film a bien été supprimé.',
                'success'
            )
            let splicer = 0;
            console.log(x.parentNode.parentNode.rowIndex - 1);
            splicer = x.parentNode.parentNode.rowIndex - 1; // Récupère l'index de la ligne dans laquelle se trouve le bouton -1 (puisque ça commence à 1 et non 0)
            console.log(splicer);
            let sp = films.splice(splicer, 1) // Retire l'élément de films à l'index obtenu prédédemment (splicer)
            console.log(sp);
            console.log(films);
            cleanTable();
            refreshTable();
        }
    })

};

function clearErrorArea() { // Supprime le contenu de la zone affichant les messages d'erreur et de succès
    let errorArea = document.getElementById('error');
    while (errorArea.firstChild) {
        errorArea.removeChild(errorArea.firstChild);
    };
}


function addRow() { // Ajoute une ligne dans l'array films
    let userTitle = document.getElementById('userTitle').value;
    let userYear = document.getElementById('userYear').value;
    let userDirector = document.getElementById('userDirector').value;
    let errorArea = document.getElementById('error');
    let year = new Date();
    let thisYear = year.getFullYear();

    clearErrorArea();

    if (userTitle.length >= 2 && userYear.length == 4 && userYear >= 1900 && userYear <= thisYear && userDirector.length >= 5) { // Vérifie que les données entrées sont valides
        console.log(thisYear);
        let firstLetterToUC = (txt) => txt.charAt(0).toUpperCase() + txt.substr(1); // Passe la première lettre d'une string en Maj
        let userTitleToUC = firstLetterToUC(userTitle);
        let userDirectorToUC = firstLetterToUC(userDirector);

        films.push({ name: userTitleToUC, years: userYear, authors: userDirectorToUC });
        console.log(films);

        let success = document.createElement('p')
        success.innerHTML = '<p class="bg-success text-light d-flex justify-content-center">Film ajouté avec succès</p>'; // Fait apparaître un message si le film est bien ajouté
        errorArea.appendChild(success);

        cleanTable();
        refreshTable();
        setTimeout(clearErrorArea, 3000); // Fait disparaître le message après 3s
    }
    if (userTitle.length < 2) { // Affiche un message si le titre est trop court
        let titleError = document.createElement('p');
        titleError.innerHTML = '<p class="bg-danger text-light d-flex justify-content-center">Le titre doit comporter au moins deux lettres</p>';
        errorArea.appendChild(titleError);
        setTimeout(clearErrorArea, 5000);
    }
    if (userYear.length < 4 || userYear < 1900 || userYear > thisYear) { // Affiche un message si l'année n'est pas valide
        let yearError = document.createElement('p');
        yearError.innerHTML = `<p class="bg-danger text-light d-flex justify-content-center">L'année de sortie doit être comprise entre 1900 et ${thisYear}</p>`;
        errorArea.appendChild(yearError);
        setTimeout(clearErrorArea, 5000);
    }
    if (userDirector.length < 5) { // Affiche un message si le nom du réalisateur est trop court
        let directorError = document.createElement('p');
        directorError.innerHTML = '<p class="bg-danger text-light d-flex justify-content-center">Le nom du réalisateur doit comporter au moins 5 lettres</p>';
        errorArea.appendChild(directorError);
        setTimeout(clearErrorArea, 5000); 
    }
};


function sortByDate() { // Trie l'array films par date décroissante
    let sortedFilmsByDate = films.sort((a, b) => b.years - a.years);
    films = sortedFilmsByDate;
    cleanTable();
    refreshTable();
};

let btnSortDate = document.getElementById('btnSortDate');
btnSortDate.addEventListener('click', function () { sortByDate() });

function sortByName() { //Trie l'array films par ordre alphabétique (des titres)
    let sortedFilmsByName = films.sort((a, b) => a.name.localeCompare(b.name));
    films = sortedFilmsByName;
    cleanTable();
    refreshTable();
};

let btnSortName = document.getElementById('btnSortName');
btnSortName.addEventListener('click', function () { sortByName() });

function addMovie() { // Remplace le bouton "Ajouter un film" par un formulaire permettant d'ajouter un film
    let newUserData = document.getElementById('userData');
    while (newUserData.firstChild) {
        newUserData.removeChild(newUserData.firstChild);
    };

    let newTitle = document.createElement('div');
    let newYear = document.createElement('div');
    let newDirector = document.createElement('div');
    let cfrmBtn = document.createElement('div');

    newTitle.innerHTML = ` <input type="text" class="form-control bg-dark text-light" title="Titre du film" id="userTitle" placeholder="Titre" />`;
    newYear.innerHTML = `<input type="number" class="form-control bg-dark text-light" title="Année de sortie" id="userYear" placeholder="Année" />`;
    newDirector.innerHTML = `<input type="text" class="form-control bg-dark text-light" title="Réalisateur" id="userDirector" placeholder="Réalisateur" />`;
    cfrmBtn.innerHTML = `<input type="button" class="btn btn-dark  ml-5" value="Valider" id="btnAddMovie">`;

    newUserData.appendChild(newTitle);
    newUserData.appendChild(newYear);
    newUserData.appendChild(newDirector);
    newUserData.appendChild(cfrmBtn);

    let btnAddMovie = document.getElementById('btnAddMovie');
    btnAddMovie.addEventListener('click', function () { addRow() });
}

let btnDisplayAddMovie = document.getElementById('btnDisplayAddMovie');
btnDisplayAddMovie.addEventListener('click', function () { addMovie() });

