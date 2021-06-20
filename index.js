window.onload = function () {
        let books = JSON.parse(localStorage.getItem('books'));

        createPrintTable(books);

        //Посик книги
        let btnSearch = document.getElementById('btn_search');
        btnSearch.addEventListener('click', function () {
            let searchName = document.getElementById('txt_search');
            let name = searchName.value;
            clearTable();
            createPrintTable(searchBook(name));
            searchName.value = '';
        })

        //Функция посика
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
            //Сортировка таблицы
            let sortBtn = document.getElementById('btn_sort');
            sortBtn.addEventListener('click', function () {
                let sortName = document.getElementById('sort');
                let val = sortName.options[sortName.selectedIndex].value;
                clearTable();
                createPrintTable(sortTable(val));
            })

            //Функция сортировки
            function sortTable(name) {
                let arrT = books;
                arrT.sort((a, b) => a[name] > b[name] ? 1 : -1);
                return arrT;
            }

            //Функция очистки
            function clearTable() {
                let divTbl = document.getElementById('table');
                divTbl.removeChild(divTbl.firstChild);
            }

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
            }

        }