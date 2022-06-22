/**
 * Votre objectif sera de réaliser un gestionnaire d'erreur.
 * Vous allez pour ce faire réaliser une classe Logger et une class Log
 * Logger contiendra les log dans un tableau, il pourra:
 * Instancier, un log.
 * Le pousser dans le tableau des logs.
 * Afficher l'ensemble des logs.
 * 
 * Vous l'aurez compris toutes ces fonctionalité sont en faite des méthodes.
 * Un Log (la class), aura un consructeur avec un message, un groupe, un nombre et une date.
 * Faite ensuite un petit scénario qui par exemple essaie d'afficher une variable qui n'existe pas.
 * Quel syntaxe permet de gerer les erreur nativement en js et dans d'autre langage également ?
 * Essayer de trouver la réponse sur internet, si vous ne trouvez pas regarder dans les indices.
 * Faite en sorte que l'erreur ne bloque pas le programme.
 * Essayer de faire plusieur erreurs pour voir.
 * A la fin de votre programme afficher l'ensemble des erreurs.
 * 
 * Indice:
 * Allez sur mozilla developper network pour comprendre la syntaxe du mote clé static.
 * Faite des test avec votre classe.
 * N'oubliez pas de faire des console.log pour tester votre code, vous avez également la console de débug
 * Faite appel à vos collègue, trouver des solutions à plusieurs est souvent plus simple que seul.
 * Dans un exercice précedent nous avons convertie les date en format francophone
 * Regardez le try catch pour mieux comprendre la gestion des erreur
 *  try {
 *    console.log(bla);
 *  }catch (e) {
 *     Logger.newEntry({
 *      group: "catch",
 *   });
 * 
 * 
 * Refacto Bonus:
 * Dissocier votre code en plusieur fichiers graçe au import / export 
 * 

 * 
 * 
 * 
 * Bonus: 
 * 
 * Faite en sorte d'afficher la date en Français
 * Il est également possible de le faire avec un affichage DOM.
 *    Un cadre qui affiche les erreurs.
 *    Dans une modale ?
 *    Certaine erreurs devrait elle bloquer le programme selon vous ?
 * 
 * 
 * Créée un répository (si vous ne l'avez pas déjà fait), pousser votre code et envoyer moi le lien.
 * 
 */


/**
 * simply display log in console
 */
function logDisplayer(message) {
  console.log(message);
}
/**
 * Logger is a component, he display all logs at the end of the program.
 * These logs are push in logsContainer
 */
class Logger {

  static logsContainer = [];

  static displayer() {
    console.log(this.logsContainer);
    this.logsContainer.forEach((log) => {
      console.log(log);
    });
  }

  static pushLog(log) {
    console.log("Nouveau Log: \n"
     + log.message);
    this.logsContainer.push(log);
  }
  /**
   * A new entry contain an Object 
   * message: original message from the developper
   * group: for sort purpose, if i want to get DOM error i will put all of these in DOM group 
   * number is not in the args obj, newEntry will generate a number - see below
   * date: a new Date object to get the actual date 
   * @param {Obj} log 
   */
  static newEntry(log) {
    //counter take a look on the logsContainer array and add 1 to be the latest entry
    let counter = this.logsContainer.length + 1;
    let date = new Date().toLocaleDateString("fr", {
      weekday: "long",
      year: "2-digit",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    })
    let message = `${log.message}. log numero:  ${counter}`;
    let newLog = new Log(message, log.group, counter, date);
    this.pushLog(newLog);
  }

}

/**
 * class log that contain a date and a log
 */

class Log {
  constructor(message, group, number, date) {
    this.message = message;
    this.group = group;
    this.number = number;
    this.date = date;
  }
}

// logDisplayer(mapExplainer(simpleLevelPlan));

// (function () {
//   /**
//    * With the static keywords you don't need at all constructor
//    * Just call the methode like another global object Logger.displayer() Math.rand()
//    */

//   /**
//    * Begining the step
//    */

//   function callBla() {
//     try {
//       console.log(bla);
//     } catch (e) {
//       Logger.newEntry({
//         group: "catch",
//         message: e + " C'est l'erreur numero : "
//       });
//     }
//   }

//   function callArray() {
//     try {
//       let date = new Date(12,23,42,15,15,151,15,15,15,15,15,15,15,15,15,"1",azdazd,15)
//       console.log(date)
//     } catch (e) {
//       Logger.newEntry({
//         group: "catch",
//         message: e + " C'est l'erreur numero : "

//       });
//     }
//   }

//   callBla();
//   callArray();


//   /**
//    * Ending the step
//    * Each time you need to log something just do these few steps
//    */
//   console.log("that error didnt block the rest of the code !");
//   Logger.displayer();
// })();

export {Logger} ; 
