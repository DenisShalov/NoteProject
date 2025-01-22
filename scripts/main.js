
const MOCK_NOTES = [
    {
        id: 1,
        title: "К Чаадаеву",
        content: `Любви, надежды, тихой славы
Недолго нежил нас обман,
Исчезли юные забавы,
Как сон, как утренний туман;
Но в нас горит еще желанье,
Под гнетом власти роковой
Нетерпеливою душой
Отчизны внемлем призыванье.
Мы ждем с томленьем упованья
Минуты вольности святой,
Как ждет любовник молодой
Минуты верного свиданья.
Пока свободою горим,
Пока сердца для чести живы,
Мой друг, отчизне посвятим
Души прекрасные порывы!
Товарищ, верь: взойдет она,
Звезда пленительного счастья,
Россия вспрянет ото сна,
И на обломках самовластья
Напишут наши имена! `,

        color: 'green',
        isFavorite: false,
    },
    {
        id: 2,
        title: 'Жди меня, и я вернусь…',
        content: `Жди меня, и я вернусь.
Только очень жди,
Жди, когда наводят грусть
Желтые дожди,
Жди, когда снега метут,
Жди, когда жара,
Жди, когда других не ждут,
Позабыв вчера.
Жди, когда из дальних мест
Писем не придет,
Жди, когда уж надоест
Всем, кто вместе ждет.
Жди меня, и я вернусь,
Не желай добра
Всем, кто знает наизусть,
Что забыть пора.
Пусть поверят сын и мать
В то, что нет меня,
Пусть друзья устанут ждать,
Сядут у огня,
Выпьют горькое вино
На помин души…
Жди. И с ними заодно
Выпить не спеши.
Жди меня, и я вернусь,
Всем смертям назло.
Кто не ждал меня, тот пусть
Скажет: — Повезло.
Не понять, не ждавшим им,
Как среди огня
Ожиданием своим
Ты спасла меня.
Как я выжил, будем знать
Только мы с тобой, —
Просто ты умела ждать,
Как никто другой`,
        color: 'blue',
        isFavorite: false,
    },
    {
        id: 3,
        title: 'Письмо к женщине',
        content: `Вы помните,
Вы всё, конечно, помните,
Как я стоял,
Приблизившись к стене,
Взволнованно ходили вы по комнате
И что-то резкое
В лицо бросали мне.
Вы говорили:
Нам пора расстаться,
Что вас измучила
Моя шальная жизнь,
Что вам пора за дело приниматься,
А мой удел —
Катиться дальше, вниз.
Любимая!
Меня вы не любили.
Не знали вы, что в сонмище людском
Я был как лошадь, загнанная в мыле,
Пришпоренная смелым ездоком.
Не знали вы,
Что я в сплошном дыму,
В развороченном бурей быте
С того и мучаюсь, что не пойму —
Куда несет нас рок событий.
Лицом к лицу
Лица не увидать.
Большое видится на расстоянье.
Когда кипит морская гладь —
Корабль в плачевном состоянье.
Земля — корабль!
Но кто-то вдруг
За новой жизнью, новой славой
В прямую гущу бурь и вьюг
Ее направил величаво.
Ну кто ж из нас на палубе большой
Не падал, не блевал и не ругался?
Их мало, с опытной душой,
Кто крепким в качке оставался...`,
        color: 'red',
        isFavorite: false,
    },
    // ...
]

const maxNotes = 5;
let timeout;
let isTimerStarted = false;


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


    makeInvisible(DOMElement) {

        if (isTimerStarted) {
            clearTimeout(timeout);
        }
        DOMElement.classList.remove("invisible");
        isTimerStarted = true;
        timeout = setTimeout(() => {
            DOMElement.classList.add("invisible");
            isTimerStarted = false;
        }, 3000);
    },


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
            checkbox.addEventListener('change', function (event) {
                event.preventDefault()
                const noteId = +this.closest('li').id;
                const note = model.notes.find(n => n.id === noteId); 
                if (note) {
                    note.isFavorite = this.checked;
                    view.displayMessage(`Заметка "${note.title}" была ${this.checked ? 'добавлена в избранное!' : 'удалена из избранного!'} `);
                }
                model.updateNotesView();
            })
        })
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
        model.makeInvisible(messageBox);
    },
}

const controller = {
    addNote(title, content, color) {
        if (model.notes.length < maxNotes) {
            if (title.length <= 50) {
                if (title.trim() !== '' && content.trim() !== '') {
                    model.addNote(title, content, color);
                    view.displayMessage('\u2705 Заметка добавлена успешно!');
                } else {
                    view.displayMessage('⚠ Заполните все поля!', true)
                }
            } else {
                view.displayMessage('⚠ Длина заголовка не должна превышать 50 символов!', true)
            }
        } else {
            view.displayMessage(`Количество заметок не должно превышать ${maxNotes}!`, true)
        }
    },
    deleteNote(noteId) {
        model.deleteNote(noteId);
        view.displayMessage("\u2705 Заметка успешно удалена!");
    }


}

function init() {
    view.init()
}


document.addEventListener('DOMContentLoaded', init)