
const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'green',
        isFavorite: false,
    },
    {
        id: 2,
        title: '1',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'blue',
        isFavorite: false,
    },
    {
        id: 3,
        title: '2',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: 'red',
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
        const newNote = { id, title, content, color, isFavorite}
        this.notes.unshift(newNote)
        view.renderNotes(this.notes);
        this.coutnNotes();

    },
    deleteNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
        view.renderNotes(this.notes);
        this.coutnNotes();
    },

    // ..._____________________________________________________________________________________________
    isShowOnlyFavorite: false,
    toggleShowOnlyFavorite(isShowOnlyFavorite) {
        this.isShowOnlyFavorite = isShowOnlyFavorite;
    },
    updateNotesView() {
        if (this.isShowOnlyFavorite) {
            const notesToRender = this.notes.filter((note) => note.isFavorite === this.isShowOnlyFavorite)
            view.renderNotes(notesToRender);
            this.coutnNotes();
        } else {
            view.renderNotes(this.notes);
            this.coutnNotes();
        }
    },
    //___________________________________________________________________________________________________


    coutnNotes() {
        const numberNotesElement = document.getElementById('number-of-notes');
        numberNotesElement.textContent = ` Всего заметок: ${model.notes.length} `;
    }
}

const view = {
    init() {
        this.renderNotes(model.notes);
        model.coutnNotes()
        const form = document.querySelector('.form');
        const inputTitle = document.querySelector('.input-title');
        const inputDescription = document.getElementById('note-description');
        const stack = document.querySelectorAll('.radio-button input[type = "radio"]');
        const inputFilter = document.querySelector('.filter-box input[type = "checkbox"]');

        //фильтр по избранныи элементам
        inputFilter.addEventListener('change', function (event) {
            event.preventDefault()
            model.toggleShowOnlyFavorite(this.checked);
            model.updateNotesView();
        });

        //Работа с формой, добавление новой заметки
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const title = inputTitle.value;
            const description = inputDescription.value;
            let color = "";
            const stackArr = new Array(...stack);
            for (const element of stackArr) {
                if (element.checked === true) {
                    color = colors[element.value];
                }
            }
            controller.addNote(title, description, color);

            inputTitle.value = ''
            inputDescription.value = ''
        });

        //Удаление заметки
        const list = document.querySelector('.notes-list');
        list.addEventListener('click', function (event) {
            if (event.target.classList.contains("delete-button")) {
                const noteId = +event.target.closest('li').id;
                controller.deleteNote(noteId);
            }
        });
    },


//Отрисовка заметки в браузере 

    renderNotes(notes) {
        const list = document.querySelector('.notes-list');
        let noteHTML = "";

        for (const note of notes) {
            noteHTML += `<li id="${note.id}" class="note">
                    <b class="note-title" style="background-color : ${note.color}">${note.title}
                        <b>
                            <label class="FavoriteNoteLabel">
                                <input class="isFavoriteNote" type="checkbox" ${note.isFavorite ? 'checked' : ''}></input>
                                <span class="imageNote"></span>
                            </label>
                            <button class="delete-button" type="button"><img 
                            class="delete-button"
                            src="images/icons/trash.svg" alt=""></button>
                        </b>
                    </b>
                    <p class="note-description">${note.content}</p>
                    
                    </li>`

        }
        list.innerHTML = noteHTML;
        const checkboxes = document.querySelectorAll('.isFavoriteNote');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(event) {
                event.preventDefault()
                const noteId = +this.closest('li').id; // Получаем ID заметки
                const note = model.notes.find(n => n.id === noteId); // Находим заметку по ID
                if (note) {
                    note.isFavorite = this.checked; // Обновляем состояние isFavorite
                    view.displayMessage(`Заметка "${note.title}" была ${this.checked ? 'добавлена в избранное!' : 'удалена из избранного!'} `);
                }
                model.updateNotesView();
            })})
    },

    //Отрисовка сообщений
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
    addNote(title, content, color) {
        if (title.length <= 50) {
            if (title.trim() !== '' && content.trim() !== '') {
                model.addNote(title, content, color);
                view.displayMessage('Заметка добавлена успешно!');
            } else {
                view.displayMessage('Заполните все поля!', true)
            }
        } else {
            view.displayMessage('Длина заголовка не должна превышать 50 символов!', true)
        }
    },
    deleteNote(noteId) {
        model.deleteNote(noteId);
        view.displayMessage("Заметка успешно удалена!");
    }


}

function init() {
    view.init()
   

}


document.addEventListener('DOMContentLoaded', init)