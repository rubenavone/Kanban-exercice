import { Logger } from "./Logger.js";
import { Note } from "./Note.js"


//Modele de note pour le todo
let noteContainer, noteTitle, noteDate, noteDescription, actualSavedNote, lastNote;
//permet de savoir si le programme 
let init = true
//id incrementation
let idIncrement = 0;

//Selecteur du formulaire pour gerer l'ajout dans le tableau
let inputTitleSelector = document.querySelector("#title-note");
let inputNoteContentSelector = document.querySelector("#note-content");
//Selection de toutes les notes
let buttonSelector = document.querySelector("#add-note-button");

let trashSelector = document.querySelector(".trash");
let draggablesElementSelector = document.querySelectorAll(".drag-event-js");


/**
 * Permet d'instancier à l'aide de la classe note toutes les notes contenus dans un tableau
 * @param {Array} noteArray 
 */
function initialiseApp(noteArray) {
    //       
    if (yourNotes.length !== 0) {
        noteArray.forEach(note => {
            let singleNote = new Note(note.title, note.note, note.status, note.date);

            console.log(singleNote)
            console.log("le status de la note est t'il 'trash' ?")
           
            if (singleNote.status === "trash") {
                console.log("oui on instancie pas la note");
                idIncrement++;
            } else {
                console.log("non on instancie la note");
                initOneNote(singleNote);

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
    Logger.newEntry({
        group: "information",
        message: "Dans initOneNote le status de la note est " + note.status
    })
    //Accroche la note sur la pages
    appendNotes(note.status)
    if (init === false) {
        yourNotes.push(note);
    }

    addAttrAndId(noteContainer);
    
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
    Logger.newEntry({
        group: "information",
        message: "Dans la fonction addAttrAndId"
    })
    //Ajoute l'atrr dragable pour pouvoir attraper nos éléments
    note.setAttribute("draggable", "true");
    //Ajoute l'évènement ondragstart qui lance la fonction onDragStart(event)
    note.addEventListener("dragstart", function (event) {
        //Permet lorsque l'on attrape un élément de récuperer toute les information
        //nécéssaire à son transfert
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
    })

    //Change la valeur de notre id de note
    note.id = `${idIncrement}`;
    Logger.newEntry({
        group: "information",
        message: `id de la note créée : ${note.id} valeur de idIncrement : ${idIncrement}`
    })
    console.log(note)
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
        console.log(noteSectionSelector, noteContainer);
        console.log(document.querySelector(`.${noteSectionSelector}`))
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
    let newUserNote = new Note(inputTitleSelector.value, inputNoteContentSelector.value);
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

function changeStatus(array, index, column) {
    console.log(column)
    array[index].status = column;

}
/********************************/
/********DRAG & DROP*************/
/********************************/
draggablesElementSelector.forEach(function (oneElement) {
    //Si l'element contient la class trash alors on lui met un évènement spécifique
    if (oneElement.classList.contains("trash")) {
        /********************************/
        /**********REMOVE NOTE***********/
        /********************************/
        trashSelector.addEventListener("drop", function (event) {
            //on previent le comportement par default de l'évènement.
            event.preventDefault();

            //Affichage qui permet de voir l'élément que l'on va supprimer
            console.log(`you drop an element is id is ${event.dataTransfer.getData('text')}`);

            //on stocke la donnée que l'on transfere
            const id = event.dataTransfer.getData('text/plain');

            //On verifie l'id actuel de la note que l'on a mit à la poubelle
            console.log(`is id is actually ${id}`);

            //Appel de la fonction qui gère le changement de status d'une note
            changeStatus(yourNotes, id, "trash");

            //on retire notre élément du DOM
            document.getElementById(`${id}`).remove();

            //On lance une sauvegarde
            saveNotes();

            //On verifie le status de la note 
            console.table(yourNotes[id].status);
        })
    } else {
        oneElement.addEventListener("drop", function (event) {
            //On lance la fonction de sauvegarde au dépot de la note 
            saveNotes();

            //On prévient le comportement par défaut de l'évènement
            event.preventDefault();

            //On récupère l'id de la note bouger
            const id = event.dataTransfer.getData('text/plain');

            Logger.newEntry({
                group: "information",
                message: "Actual Id : " + id
            })
            //On récupère l'élément du DOM
            const draggableElement = document.getElementById(`${id}`);

            //On cible la zone de notre élément 
            const dropzone = event.target;
            console.log(event.target);
            //permet de récuperer la valeur de l'attribut custome column
            const actualColumn = event.target.getAttribute("column");

            console.log(actualColumn + " actual column " + (actualColumn !== null))
            if (actualColumn !== null) {
                //Appel de la fonction qui gère le changement de status d'une note
                changeStatus(yourNotes, id, actualColumn);
                //On refait apparaitre l'élément dans la nouvelle zone
                dropzone.append(draggableElement);
            }
            Logger.newEntry({
                group: "information",
                message: `Affichage des notes` + localStorage.getItem("savedNotes")
            })
            //On lance une sauvegarde
            saveNotes();
        })
    }
    oneElement.addEventListener("dragover", function (event) {
        event.preventDefault();
    })
});


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
    console.log("sauvegarde en cours");
}

/***************************/
/******Chargement**********/
/**************************/
function loadNotes() {
    if (localStorage.length !== 0) {
        console.log("Chargement des données existante");
        actualSavedNote = JSON.parse(localStorage.getItem("savedNotes"));
        Logger.newEntry({
            group: "Information",
            message: " Affichage des note sauvegarder dans le local storage " + actualSavedNote
        });
        return actualSavedNote;
    } else {
        // Données personnelle qui sera rangé dans le local storage
        actualSavedNote = [];
        return actualSavedNote;
    }
}
//Init of the app 
let yourNotes = loadNotes();
initialiseApp(yourNotes);


/***
 * Utility
 */

let logDisplayerBtn = document.querySelector(".log");

logDisplayerBtn.addEventListener("click", function () {
    Logger.displayer();

})

let clearLocalStorage = document.querySelector(".clear-storage");

clearLocalStorage.addEventListener("click", function () {
    localStorage.clear();
})