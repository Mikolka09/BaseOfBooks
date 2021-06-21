window.onload = function () {
    let books = JSON.parse(localStorage.getItem('books'));
    let res = true;

    //Стара создания таблицы
    start();

    //Добавление новой книги
    let newBook = document.getElementById('btn_new');
    newBook.addEventListener('click', function () {
        let modul = document.getElementById('modul_wind')
        let modulBack = document.getElementById('div_back')
        modulBack.style.opacity = 0.4;
        modulBack.style.pointerEvents = 'none';
        modul.style.display = 'block';
        let subOK = document.getElementById('sub_ok');
        let subCan = document.getElementById('sub_cancel');
        subOK.addEventListener('click', function () {
            if (checkId()) alert('"Id" введен не некорректно! "id" должно быть только из цифр или уже есть такое "id"! Попробуйте еще раз!');
            else {
                modul.style.display = 'none';
                modulBack.style.opacity = 1;
                modulBack.style.pointerEvents = 'auto';
                let arrTest = books;
                localStorage.clear();
                arrTest.push(createNewBook());
                localStorage.setItem('books', JSON.stringify(arrTest));
                clearTable();
                createPrintTable(arrTest);
                alert(`Ваша книга добавлена в базу!`);
                window.location.reload();
            }
        });
        subCan.addEventListener('click', function () {
            modul.style.display = 'none';
            modulBack.style.opacity = 1;
            modulBack.style.pointerEvents = 'auto';
            clearModulInput();
            documetn.location.reload();
        });

    });

    //Удаление или редактирование книги
    function trackingClickingEditDel() {
        let arrImg = document.getElementsByClassName('table_img');
        for (const it of arrImg) {
            it.addEventListener('click', function (e) {
                let idIm = e.target.id;
                let arr = idIm.split('_');
                if (arr[1] === 'del' && confirm("Вы хотите удалить эту книгу?")) {
                    clearTable();
                    createPrintTable(deleteBook(arr[0]));
                    alert(`Книга с ID - ${arr[0]} удалена!`);
                    window.location.reload();
                } else if (arr[1] === 'edit') {
                    editBook(arr[0]);
                }
            });
        };
    }

    trackingClickingEditDel();

    //Поиск книги
    let btnSearch = document.getElementById('btn_search');
    btnSearch.addEventListener('click', function () {
        let searchName = document.getElementById('txt_search');
        let name = searchName.value;
        clearTable();
        createPrintTable(searchBook(name));
        searchName.value = '';
        trackingClickingEditDel();
    });

    //Функция старта скрипта
    function start() {
        let divTbl = document.getElementById('table');
        if (divTbl.value == null)
            createPrintTable(books);
    }

    //Функция проверки ID
    function checkId() {
        let arr = books;
        let newId = document.getElementById('inp_id');
        let nameId = newId.value;
        let reg = new RegExp('^\\d+$');
        if (!reg.test(nameId)) return true;
        else {
            let count = 0;
            for (const it of arr) {
                if (`${it.id}`.indexOf(nameId) != -1) {
                    count++;
                }
            }
            return (count === 0 ? false : true);
        }
    }

    //Функция очистки строк ввода
    function clearModulInput() {
        document.getElementById('inp_id').value = '';
        document.getElementById('inp_name').value = '';
        document.getElementById('inp_auth').value = '';
        document.getElementById('inp_year').value = '';
        document.getElementById('inp_publ').value = '';
        document.getElementById('inp_pag').value = '';
        document.getElementById('inp_cnt').value = '';
    };

    //Функция создания новой книги
    function createNewBook() {
        let newId = document.getElementById('inp_id');
        let newName = document.getElementById('inp_name');
        let newAuth = document.getElementById('inp_auth');
        let newYear = document.getElementById('inp_year');
        let newPubl = document.getElementById('inp_publ');
        let newPag = document.getElementById('inp_pag');
        let newCnt = document.getElementById('inp_cnt');
        let newB = {
            id: parseInt(newId.value),
            name: newName.value,
            author: newAuth.value,
            year: parseInt(newYear.value),
            publisher: newPubl.value,
            pages: parseInt(newPag.value),
            count: parseInt(newCnt.value),
            edit: 'image/editing.png',
            delete: 'image/delete.png'
        };
        clearModulInput();
        return newB;
    };

    //Функция удаления книги
    function deleteBook(name) {
        let arrNew = books;
        let arr = arrNew.filter(x => x.id != name);
        localStorage.clear();
        localStorage.setItem('books', JSON.stringify(arr));
        return arr;
    }

    //Функция редактирования данных книги
    function editBook(name) {
        let arrNew = books;
        let arr = arrNew.find(x => x.id == name);
        document.getElementById('inp_id').value = arr.id;
        document.getElementById('inp_name').value = arr.name;
        document.getElementById('inp_auth').value = arr.author;
        document.getElementById('inp_year').value = arr.year;
        document.getElementById('inp_publ').value = arr.publisher;
        document.getElementById('inp_pag').value = arr.pages;
        document.getElementById('inp_cnt').value = arr.count;
        document.getElementById('modul_head').innerHTML = 'EDIT BOOK';
        let modul = document.getElementById('modul_wind');
        let modulBack = document.getElementById('div_back')
        modulBack.style.opacity = 0.4;
        modulBack.style.pointerEvents = 'none';
        let subOK = document.getElementById('sub_ok');
        let subCan = document.getElementById('sub_cancel');
        modul.style.display = 'block';
        subOK.addEventListener('click', function () {
            modul.style.display = 'none';
            let modulBack = document.getElementById('div_back')
            modulBack.style.opacity = 1;
            modulBack.style.pointerEvents = 'auto';
            let arrTest = deleteBook(name);
            localStorage.clear();
            arrTest.push(createNewBook());
            arrTest.sort((a, b) => a.id > b.id ? 1 : -1);
            localStorage.setItem('books', JSON.stringify(arrTest));
            clearTable();
            createPrintTable(arrTest);
            alert(`Книга с ID - ${name} отредактированая!`);
            window.location.reload();
        });
        subCan.addEventListener('click', function () {
            modul.style.display = 'none';
            modulBack.style.opacity = 1;
            modulBack.style.pointerEvents = 'auto';
            clearModulInput();
            window.location.reload();
        });
    }

    //Функция поиска
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
        if (arrNew.length === 0) {
            alert('По вашиму запросу книг не найдено! Измените запрос и попробуйте еще раз!');
            document.getElementById('txt_search').value = '';
            window.location.reload();
        } else return arrNew;
    };

    //Сортировка таблицы
    let sortBtn = document.getElementById('btn_sort');
    sortBtn.addEventListener('click', function () {
        let sortName = document.getElementById('sort');
        let val = sortName.options[sortName.selectedIndex].value;
        clearTable();
        createPrintTable(sortTable(val));
        trackingClickingEditDel();
    });

    //Функция сортировки
    function sortTable(name) {
        let arrT = books;
        if (res) {
            arrT.sort((a, b) => a[name] > b[name] ? 1 : -1);
            res = false;
        } else {
            arrT.sort((a, b) => a[name] > b[name] ? -1 : 1);
            res = true;
        }
        return arrT;
    };

    //Функция очистки
    function clearTable() {
        let divTbl = document.getElementById('table');
        divTbl.removeChild(divTbl.firstChild);
    };

    //Создание и печать таблицы
    function createPrintTable(books) {
        let divTbl = document.getElementById('table');
        let table = document.createElement('table');
        table.setAttribute('border', '3px solid gray');
        table.setAttribute('style', 'width:100%; border-collapse: collapse; text-align: center; font-size: 18pt');
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');
        let arrKey = Object.keys(books[0]);

        let tr = document.createElement('tr');
        for (let i = 0; i < arrKey.length; i++) {
            let th = document.createElement('th');
            th.setAttribute('style', 'text-transform: uppercase; padding:15px;')
            th.appendChild(document.createTextNode(arrKey[i]));
            tr.appendChild(th);
            thead.appendChild(tr);
        }
        let arrBooks = Object.values(books).map(v => Object.values(v));
        for (let i = 0; i < arrBooks.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < arrBooks[i].length; j++) {
                let td = document.createElement('td');
                td.setAttribute('style', 'padding:10px;')
                if (j === (arrBooks[i].length - 1) || j === (arrBooks[i].length - 2)) {
                    let img = document.createElement('img');
                    img.setAttribute('src', arrBooks[i][j]);
                    if (j === (arrBooks[i].length - 2)) img.id = arrBooks[i][0] + '_' + 'edit';
                    else img.id = arrBooks[i][0] + '_' + 'del';
                    img.className = 'table_img';
                    img.setAttribute('style', 'width:40px; height:40px; text-decoration: none;');
                    td.appendChild(img);
                } else td.appendChild(document.createTextNode(arrBooks[i][j]));
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        divTbl.appendChild(table);
    };

};