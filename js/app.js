let toDoList = [];

//get data from localStorage 
if (localStorage.getItem('toDoList')) {
    let array = localStorage.getItem('toDoList').split('&');
    let j = 0;
    while (j < array.length) {
        array[j] = array[j].split(",");
        j++;
    }
    toDoList = array;
}

//write todo list on page & add them to localStorage
function writeList() {
    document.getElementById('list').innerHTML = null;
    let i = 0;

    while (i < toDoList.length) {
        if (toDoList[i] != undefined && toDoList[i] != "") {
            var ch = '';
            if (toDoList[i][1] == 1) ch = "checked";
            document.getElementById("list")
                .insertAdjacentHTML('beforeend', "<div id='" + i + "' class='do'> <div class='left'> <p>" + toDoList[i][0] + "</p> </div> <div class='right'> <input type='checkbox' name='did' class='do-check do-in' onclick='change(" + i + ")' " + ch + "> <i class='delete bi bi-trash do-in' onclick='del(" + i + ")' title='delete'></i> </div> </div>");
        }
        i++;
    }
    localStorage.setItem('toDoList', toDoList.join('&'));
    console.log(localStorage.getItem('toDoList'));
    console.log(toDoList);
}

//add an item to list
function add() {
    let value = document.getElementById("text-in").value;
    console.log(value);
    if (!value == "") {
        toDoList.push([value, 0]);
        document.getElementById('text-in').value = null;
        writeList();
    } else {
        alert('please fill inputs .');
    }
}

//delete an item from list
function del(id) {
    toDoList.splice(id, 1);
    writeList();
}

//check or uncheck an item
function change(id) {
    if (toDoList[id][1] == 1) toDoList[id][1] = 0; else toDoList[id][1] = 1;
    writeList();
}

writeList();

document.getElementById("add-in").addEventListener('click', add);
document.getElementById("text-in").addEventListener('keydown', e => {
    if (e.code == 'Enter') add();
})