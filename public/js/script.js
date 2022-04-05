

//Modele de note pour le todo
let noteContainer, noteTitle, noteDate, noteDescription;
let init = true

//Selection de toutes les notes



//id incrementation
let idIncrement = 0;

//Selecteur du formulaire pour gerer l'ajout dans le tableau
let buttonSelector = document.querySelector("#add-note-button");
let inputTitleSelector = document.querySelector("#title-note");
let inputNoteContentSelector = document.querySelector("#note-content");
console.log(typeof inputNoteContentSelector);
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
 * 
 * @param {Array} noteArray 
 */
function initialiseApp(noteArray) {
        if(yourNotes.length !== 0){
            noteArray.forEach(note => {
                let singleNote = new Notes(note.title, note.note, note.status);
                if(singleNote.status === "todo" || singleNote.status === "verified") {
                initOneNote(singleNote);
                }else{
                    idIncrement++;
                }
            });
        }
    init = false;
};

/**
 * Permet d'ajouter une note sur le tableau
 * Prend un obj en parametre
 * @param {Obj} note 
 */
function initOneNote(note) {
    createNotes();
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
    note.setAttribute("draggable", "true");
    note.setAttribute("ondragstart", "onDragStart(event)");
    note.id = `${idIncrement}`;
    idIncrement++;
}
/********************************/
/**********CREATION NOTE*********/
/********************************/
/**
 * Fonction qui crée les éléments
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
    noteTitle.textContent = title;
    noteDate.textContent = date;
    noteDescription.textContent = description;
}

/**
 * Fonction d'affichage des éléments
 * @param {String} noteSectionSelector 
 */
function appendNotes(noteSectionSelector) {
    if (noteSectionSelector === "trash") {
        console.log("add it to historic");
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
 * une fois fait appel la fonction initOneNote en envoyant en argument l'objet fraichement
 * créée
 */
buttonSelector.addEventListener("click", function (e) {
    //Mise en place d'une verification des données entrée ?

    let newUserNote = new Notes(inputTitleSelector.value, inputNoteContentSelector.value);
    initOneNote(newUserNote);
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
    console.log(array[index]);
    array[index].status = "trash";
    console.log(array[index]);
}
/********************************/
/********DRAG & DROP*************/
/********************************/

function onDragStart(event) {

    event.dataTransfer.setData('text/plain', event.target.id);

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
    saveNotes();
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(`${id}`);
    const dropzone = event.target;
    //permet de récuperer la classe dans lequelle l'élément est déposé
    console.log(event.target.className)
    dropzone.append(draggableElement);
}
/********************************/
/**********REMOVE NOTE***********/
/********************************/

function trashDrop(event) {
    event.preventDefault();
    console.log(`you drop an element is id is ${event.dataTransfer.getData('text')}`)
    const id = event.dataTransfer.getData('text');
    console.log(`is id is actually ${id}`)
    changeStatus(yourNotes, id);
    document.getElementById(`${id}`).remove();
    saveNotes();
    console.table(yourNotes[id].status);
    
};
/**************************/
/******Sauvegarde**********/
/**************************/
function saveNotes() {
    console.log("sauvegarde lancé");
    localStorage.clear();
    let stringifiedNotes = JSON.stringify(yourNotes);
    localStorage.setItem("savedNotes", stringifiedNotes);
    console.table(yourNotes);
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