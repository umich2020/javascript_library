var myLibrary = [];
var id_counter = 2
function Book(title, author, pages, readed, id) {
    this.title= title;
    this.author=author;
    this.pages=pages;
    this.read=readed;
    this.id = id
}
Book.prototype.toggle = function(object) {
    if(object.read===true) {
        object.read=false
    }
    else {
        object.read=true
    }
    displayBooks()
}
function addBook(title, author, pages, readed,id) {
    var newBook = new Book(title, author, pages, readed,id)
    myLibrary.push(newBook)
}
function addElement(location, words, id) {
    const container = document.querySelector(location)
    const newDiv = document.createElement("p")
    newDiv.classList.add(location)
    newDiv.classList.add(id)
    newDiv.textContent = words
    container.appendChild(newDiv)
}
function addToggleRead(location,id) {
    const container = document.querySelector(location)
    const newButton = document.createElement("button")
    newButton.setAttribute("type","checkbox")
    newButton.classList.add(id)
    newButton.textContent = "Read Book?"
    container.appendChild(newButton)
}
function addRemoveElement(location,id) {
    const container = document.querySelector(location)
    const newButton = document.createElement("button")
    newButton.setAttribute("type","button")
    newButton.classList.add(id)
    newButton.setAttribute("id","rmButton")
    newButton.textContent = "Delete book?"
    container.appendChild(newButton)
}
function removeElements(id) {
    const elements = document.getElementsByClassName(id)
    while (elements.length > 0 ) {
        elements[0].parentNode.removeChild(elements[0])
    }
}
//powers//
//////////
//add individual delete book buttons
function addRemovePower () {
    var rmButtonss = document.querySelectorAll("#rmButton")
    rmButtonss.forEach((button) =>{
        button.addEventListener("click", () => {
            removeElements(button.getAttribute("class"))
        for (var i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === Number(button.getAttribute("class"))) {
                myLibrary.splice(i, 1);
                i--;
            }}
        })
    })
}
function addTogglePower () {
    var toggles = document.querySelectorAll("toggle > button")
    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            for (var i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id === Number(toggle.getAttribute("class"))) {
                   myLibrary[i].toggle(myLibrary[i])
            }}
        })
    })
}

function displayBooks() {
    for (let i =0; i < myLibrary.length; i++) {
        removeElements(i)
        addElement("titles",myLibrary[i].title,i)
        addElement("author",myLibrary[i].author,i)
        addElement("pages",myLibrary[i].pages,i)
        addElement("readed",myLibrary[i].read,i)
        addRemoveElement("remove",i)
        addToggleRead("toggle", i)
    }
    addRemovePower()
    addTogglePower()
}

//interacts with the dialog
const dialog = document.querySelector("dialog")
const showButton = document.querySelector("dialog + button")
const closeButton =document.querySelector("dialog button")
showButton.addEventListener("click", () => {
    dialog.showModal();
})
closeButton.addEventListener("click", ()=>{
    dialog.close();
})

//gets the new book detail when clicking buttong
const submitButton=document.querySelector("#submit_form")
submitButton.addEventListener("click", () => {
    const titleElement = document.getElementById("title")
    const titleInput =  titleElement.value
    const authorElement = document.getElementById("author")
    const authorInput =  authorElement.value
    const pagesElement = document.getElementById("pages")
    const pagesInput =  pagesElement.value
    const readElement = document.getElementById("read")
    const readInput =  readElement.checked
    const id = id_counter++
    addBook(titleInput,authorInput,pagesInput,readInput,id)
    dialog.close()
    displayBooks()
})

addBook("book1","author1","100",true,0)
addBook("book2","author2","200",true,1)
addBook("book3","author3","300",true,2)
// object.setPrototypeOf()
displayBooks()
