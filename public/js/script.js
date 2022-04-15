//Modele de note pour le todo
let noteContainer, noteTitle, noteDate, noteDescription;
let init = true

//id incrementation
let idIncrement = 0;

//Selecteur du formulaire pour gerer l'ajout dans le tableau
//Selection de toutes les notes
let buttonSelector = document.querySelector("#add-note-button");
let inputTitleSelector = document.querySelector("#title-note");
let inputNoteContentSelector = document.querySelector("#note-content");

/*
    Class Pour les note
    title = titre de la note
    note = contenus de votre note
    status = colonne dans laquelles sera la note
    date = génére une date à la création de la note
    */
class Notes {
    constructor(title, content, status = "todo") {
        this.title = title,
            this.date = new Date().toLocaleDateString(navigator.language, {
                day: "numeric",
                year: "numeric",
                month: "long",
                weekday: "long",
                hour: "numeric",
                minute: "numeric"
            });
        this.note = content,
        this.status = status
    }
};

/**
 * Permet d'instancier à l'aide de la classe note toutes les notes contenus dans un tableau
 * @param {Array} noteArray 
 */
function initialiseApp(noteArray) {
        //       
        if(yourNotes.length !== 0){
            noteArray.forEach(note => {
                let singleNote = new Notes(note.title, note.note, note.status);
                if(singleNote.status === "todo" || singleNote.status === "verified" || singleNote.status === "verified") {
                initOneNote(singleNote);
                }else{
                    idIncrement++;
                }
            });
        }
    init = false;
};
/*
 * Permet d'ajouter une note sur le tableau
 * Prend un obj en parametre
 * @param {Obj} note 
 */
function initOneNote(note) {
    //crée une note
    createNotes();
    //Insere les information de la note
    fillsNotes(note.title, note.date, note.note);
    appendNotes(note.status)

    if (init === false) {
        yourNotes.push(note);
    }

    if (init === true) {
        lastNote = document.querySelectorAll("article");
    } else {
        lastNote = document.querySelectorAll(".todo article");
    }
    addAttrAndId(lastNote[lastNote.length - 1]);
}
/********************************/
/*************ADD ATTR***********/
/********************************/
/**
 * Permet d'ajouter les élément nécéssaire au drag and drop
 * Permet également d'attribuer un id a notre note
 * @param {querySelector or querySelectorAll} note 
 */
function addAttrAndId(note) {
    //Ajoute l'atrr dragable pour pouvoir attraper nos éléments
    note.setAttribute("draggable", "true");
    //Ajoute l'évènement ondragstart qui lance la fonction onDragStart(event)
    note.setAttribute("ondragstart", "onDragStart(event)");
    //Change la valeur de notre id de note
    note.id = `${idIncrement}`;
    //Incremente l'id de notre note
    idIncrement++;
}
/********************************/
/**********CREATION NOTE*********/
/********************************/
/**
 * Fonction qui crée les éléments nécéssaire à notre note
 */
function createNotes() {
    noteContainer = document.createElement("article");
    noteTitle = document.createElement("h4");
    noteDate = document.createElement("time");
    noteDescription = document.createElement("p");
}

/**
 * Fonction qui change le contenus des éléments créées
 * @param {String} title 
 * @param {Date} date 
 * @param {String} description 
 */
function fillsNotes(title, date, description) {
    //On remplis la notes avec les informations envoyé en arguent
    noteTitle.textContent = title;
    noteDate.textContent = date;
    noteDescription.textContent = description;
}

/**
 * Fonction d'affichage des éléments
 * @param {String} noteSectionSelector 
 */
function appendNotes(noteSectionSelector) {
    //Si la note à le status trash alors on ne l'affiche pas
    if (noteSectionSelector === "trash") {
        console.log("add it to historic");
        //sinon on affiche la note
    } else {
        document.querySelector(`.${noteSectionSelector}`).append(noteContainer);
        noteContainer.append(noteTitle);
        noteContainer.append(noteDescription);
        noteContainer.append(noteDate);
    }
}

/********************************/
/**********ADD ONE NOTE**********/
/********************************/
/**
 * évènement lié au bouton envoyer
 * récupère les info dans les champ et instancie une nouvelle Note
 * une fois fait, appel la fonction initOneNote en envoyant en argument l'objet fraichement
 * créée
 */
buttonSelector.addEventListener("click", function (e) {
    //Mise en place d'une verification des données entrée ?

    //Instanciation d'une nouvel note
    let newUserNote = new Notes(inputTitleSelector.value, inputNoteContentSelector.value);
    //Lancement de la fonction initOneNote(noteInstancié)
    initOneNote(newUserNote);
    //Sauvegarde des notes de la session en cours
    saveNotes();
})

/**
 * Lorsqu'une personne met un note sur la poubelle
 * elle n'est pas supprimer, la note change juste de status
 * ce qui fait qu'elle n'est plus crée affiché lors de l'init suivante
 * parcontre elle reste disponible dans l'historique
 * @param {*} array 
 * @param {*} index 
 */

function changeStatus(array, index) {  
    array[index].status = "trash";
}
/********************************/
/********DRAG & DROP*************/
/********************************/

function onDragStart(event) {
    //Permet lorsque l'on attrape un élément de récuperer toute les information
    //nécéssaire à son transfert
    let data = event.dataTransfer.setData('text/plain', event.target.id);
    console.log(typeof data);

    //Le code ci dessou permet de changer la couleur des élément
    // let currentTargetStyle =  event.currentTarget.style.backgroundColor;
    // if(currentTargetStyle == "green"){
    //     event.currentTarget.style.backgroundColor = "yellow";
    //     event.currentTarget.style.color = "black";
    // }else{
    //     event.currentTarget.style.backgroundColor = "green";
    //     event.currentTarget.style.color = "white";
    // }
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    //On lance la fonction de sauvegarde au dépot de la note 
    saveNotes();
    //On prévient le comportement par défaut de l'évènement
    event.preventDefault();
    //On récupère l'id de la note bouger
    const id = event.dataTransfer.getData('text');
    //On récupère l'élément du DOM
    const draggableElement = document.getElementById(`${id}`);
    //On cible la zone de notre élément 
    const dropzone = event.target;
    //permet de récuperer la classe dans lequelle l'élément est déposé
    console.log(event.target.className)
    //On refait apparaitre l'élément dans la nouvelle zone
    dropzone.append(draggableElement);
}
/********************************/
/**********REMOVE NOTE***********/
/********************************/

function trashDrop(event) {
    //on previent le comportement par default de l'évènement.
    event.preventDefault();
    //Affichage qui permet de voir l'élément que l'on va supprimer
    console.log(`you drop an element is id is ${event.dataTransfer.getData('text')}`)
    //on stocke la donnée que l'on transfere
    const id = event.dataTransfer.getData('text');
    //On verifie l'id actuel de la note que l'on a mit à la poubelle
    console.log(`is id is actually ${id}`) 
    //Appel de la fonction qui gère le changement de status d'une note
    changeStatus(yourNotes, id);
    //on retire notre élément du DOM
    document.getElementById(`${id}`).remove();
    //On lance une sauvegarde
    saveNotes();
    //On verifie le status de la note 
    console.table(yourNotes[id].status);  
};
/**************************/
/******Sauvegarde**********/
/**************************/
function saveNotes() {
    //Message pour annoncé la sauvegarde
    console.log("sauvegarde lancé");
    //Nettoyage du localStorage avant sauvegarder
    localStorage.clear();
    //Transformation du tableau en STRING pour le stocker dans le localStorage
    let stringifiedNotes = JSON.stringify(yourNotes);
    //On enregistre la note dans le localStorage
    localStorage.setItem("savedNotes", stringifiedNotes);
    console.log("sauvegarde Terminé");
}

/***************************/
/******Chargement**********/
/**************************/
function loadNotes() {
    console.log("Chargement des données")
    if (localStorage.length !== 0) {
        actualSavedNote = JSON.parse(localStorage.getItem("savedNotes"));
        return actualSavedNote;
    } else {
        // Données personnelle qui sera rangé dans le local storage
        actualSavedNote = [

        ];
        return actualSavedNote;
    }

}

//Init of the app 
let yourNotes = loadNotes();
initialiseApp(yourNotes);