let numberNotes = 5;



const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'green',
        isFavorite: false,
    },
    // ...
]

const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}


const model = {
    notes: MOCK_NOTES,
    addNote(title, content, color, isFavorite) {
        const id = Math.random()
        const newNote = { id, title, content, color, isFavorite }
        this.notes.unshift(newNote)
        view.renderNotes(this.notes);
        this.coutnNotes();

    },
    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
        view.renderNotes(this.notes);
        this.coutnNotes();
    },

    coutnNotes() {
        const numberNotesElement = document.getElementById('number-of-notes');
        numberNotesElement.textContent = ` Всего заметок: ${model.notes.length} `;
    }
}

const view = {
    init() {
        this.renderNotes(model.notes);

        const form = document.querySelector('.form');
        const inputTitle = document.querySelector('.input-title');
        const inputDescription = document.getElementById('note-description');
        const stack = document.querySelectorAll('.radio-button input[type = "radio"]');

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const title = inputTitle.value;
            const description = inputDescription.value;
            controller.addNote(title, description);

            inputTitle.value = ''
            inputDescription.value = ''

            const stackArr = new Array(...stack);
            for (const element of stackArr) {
                if(element.checked === true)
                    {
                        console.log(element.value);
                    }
            }
        });

        const list = document.querySelector('.notes-list');
        list.addEventListener('click', function (event) {

            if (event.target.classList.contains("delete-button")) {
                const noteId = +event.target.closest('li').id;
                controller.deleteNote(noteId);
            }
        });
    },



    renderNotes(notes) {
        const list = document.querySelector('.notes-list');
        let noteHTML = "";

        for (const note of notes) {
            noteHTML += `<li id="${note.id}" class="note">
                    <b class="note-title">${note.title}
                        <b>
                            <label class="FavoriteNoteLabel">
                                <input class="isFavoriteNote" type="checkbox"></input>
                                <span class="imageNote"></span>
                            </label>
                            <button class="delete-button" type="button"><img 
                            class="delete-button"
                            src="images/icons/trash.svg" alt=""></button>
                        </b>
                    </b>
                    <p class="note-description">${note.content}</li>`
        }
        list.innerHTML = noteHTML;

    },
    displayMessage(message, isError = false) {
        const messageBox = document.querySelector('.message-box')
        messageBox.textContent = message
        if (isError) {
            messageBox.classList.remove('success')
            messageBox.classList.add('error')
        } else {
            messageBox.classList.remove('error')
            messageBox.classList.add('success')
        }
    },
}

const controller = {
    addNote(title, content) {
        if(title.length<=50){
        if (title.trim() !== '' && content.trim() !== '') {
            model.addNote(title, content);
            view.displayMessage('Заметка добавлена успешно!');
        } else {
            view.displayMessage('Заполните все поля!', true)
        }
    }else{
        view.displayMessage('Длина заголовка не должна превышать 50 символов!', true)}
    },
    deleteNote(noteId) {
        model.deleteNote(noteId);
        view.displayMessage("Заметка успешно удалена!");
    }
}

function init() {
    view.init()
    model.coutnNotes()

}


document.addEventListener('DOMContentLoaded', init)