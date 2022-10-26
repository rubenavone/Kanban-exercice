/**
 * Logger is a component, he display all logs when you click on displayLog button
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



export {Logger} ; 
