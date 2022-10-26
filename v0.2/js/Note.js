/*
    Class Pour les note
    title = titre de la note
    note = contenus de votre note
    status = colonne dans laquelles sera la note
    date = génére une date à la création de la note
    */
    class Note {
        constructor(title, content, status = "todo", date = null) {
            this.title = title
            if (date) this.date = date
            else {
                this.date = new Date().toLocaleDateString(navigator.language, {
                    day: "numeric",
                    year: "numeric",
                    month: "long",
                    weekday: "long",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                });
            }
            this.note = content
            this.status = status
        }
    };

    export {Note};