let books = [{
        id: 101,
        name: 'C++. Методики программирования Шилдта',
        author: 'Герберт Шилдт',
        year: 2009,
        publisher: 'ИД Питер',
        pages: 480,
        count: 9,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 102,
        name: 'Java. Методики программирования Шилдта',
        author: 'Герберт Шилдт',
        year: 2008,
        publisher: 'Эксмо',
        pages: 512,
        count: 6,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 103,
        name: 'Python для детей. Самоучитель по программированию',
        author: 'Джейсон Бриггс',
        year: 2020,
        publisher: 'Юрайт',
        pages: 320,
        count: 10,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 104,
        name: 'Computer Coding Games for Kids',
        author: 'Керол Вордерман',
        year: 2019,
        publisher: 'ИД Питер',
        pages: 222,
        count: 5,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 105,
        name: 'Sticker Dressing Pirates',
        author: 'Луи Стовелл',
        year: 2016,
        publisher: 'Добрая книга',
        pages: 34,
        count: 4,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 106,
        name: 'Head First. Патерни проєктування',
        author: 'Эрик Фримен',
        year: 2020,
        publisher: 'РИПОЛ Классик',
        pages: 672,
        count: 9,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 107,
        name: 'Алгоритмы. Построение и анализ',
        author: 'Томас Кормен',
        year: 2009,
        publisher: 'КноРус',
        pages: 1328,
        count: 8,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 108,
        name: 'Інженерія програмного забезпечення',
        author: 'Ирина Бородкина',
        year: 2018,
        publisher: 'Вильямс',
        pages: 204,
        count: 5,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 109,
        name: 'Ассемблер для Win 32. Самоучитель',
        author: 'Геннадий Галисеев',
        year: 2007,
        publisher: 'Вильямс',
        pages: 368,
        count: 10,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 110,
        name: 'Компоненты в Delphi 7. Профессиональная работа',
        author: 'Геннадий Галисеев',
        year: 2004,
        publisher: 'КноРус',
        pages: 624,
        count: 6,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 111,
        name: 'Основы глубокого обучения',
        author: 'Нихиль Будума',
        year: 2020,
        publisher: 'Росмэн',
        pages: 304,
        count: 15,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 112,
        name: 'Секреты JavaScript ниндзя',
        author: 'Джон Резиг',
        year: 2019,
        publisher: 'Азбука',
        pages: 544,
        count: 12,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 113,
        name: 'HTML5. Карманный справочник',
        author: 'Дженнифер Роббинс',
        year: 2015,
        publisher: 'Вече',
        pages: 192,
        count: 9,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 114,
        name: 'Секреты JavaScript ниндзя от Бибо',
        author: 'Бер Бибо',
        year: 2013,
        publisher: 'Вече',
        pages: 416,
        count: 11,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    },
    {
        id: 115,
        name: 'Microsoft Office 2010 для "чайников"',
        author: 'Уоллес Вонг',
        year: 2010,
        publisher: 'Лабиринт',
        pages: 368,
        count: 8,
        edit: 'image/editing.png',
        delete: 'image/delete.png'
    }
];

function searchBook(name) {
    let arrB = books;
    let arrNew = [];
    for (const it of arrB) {
        if ((`${it.id}`.indexOf(name) != -1) ||
            ((it.name).toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1) ||
            ((it.author).toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1) ||
            (`${it.year}`.indexOf(name) != -1) ||
            ((it.publisher).toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) != -1) ||
            (`${it.pages}`.indexOf(name) != -1) ||
            (`${it.count}`.indexOf(name) != -1)) {
            arrNew.push(it);

        }
    }
    return arrNew;
}

let arr = searchBook('герб');

for (const it of arr) {
    console.log(it);
}