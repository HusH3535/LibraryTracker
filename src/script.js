const Bookshelf = document.querySelector('#bookshelf');

const addBookBtn = document.getElementById('save-book');

const addTestBtn = document.getElementById('test');

const bookTitle = document.getElementById('addBookTitle');
const bookAuthor = document.getElementById('addBookAuthor');


const myLibrary = [];


refreshDOM();

addTestBtn.onclick = () =>{
    addBookToLibrary(new Book("Test Book", "Test Author"))
    refreshDOM();
}

addBookBtn.onclick = () =>{
    if(bookTitle.value!='' && bookAuthor.value != ''){
        addBookToLibrary(new Book(bookTitle.value,bookAuthor.value))
        refreshDOM();
        bookTitle.value = '';
        bookAuthor.value = '';
    }else{
        alert("please fill in the information about the book!");
    }
    
}

function Book(name, author) {
    this.name = name;
    this.author = author;
    this.currentPage = 0;
    this.totalPages = 0;

    //---------------------------------
    this.card = document.createElement('div');
    this.card.setAttribute('class','card m-2 col-md-3 col-10 border border-warning');

    this.cardBody = document.createElement('div');
    this.cardBody.setAttribute('class','card-body ');

    this.cardTitle = document.createElement('h5');
    this.cardTitle.setAttribute('class','card-title text-nowrap');
    this.cardTitle.textContent = this.name;

    this.cardAuthor = document.createElement('p');
    this.cardAuthor.setAttribute('class','card-text text-nowrap');
    this.cardAuthor.textContent = this.author;

    this.cardButton = document.createElement('button');

    this.cardButton.onclick = () => {
        if (this.cardButton.textContent == 'Read') {
            this.cardButton.setAttribute('class','btn btn-warning container-fluid text-nowrap col-md-6 col-12');
            this.cardButton.textContent = 'Not Read';
            this.card.setAttribute('class','card m-2 col-md-3 col-10 border border-warning');
        }else{
            this.cardButton.textContent = 'Read';
            this.cardButton.setAttribute('class','btn btn-success container-fluid text-nowrap col-md-6 col-12');
            this.card.setAttribute('class','card m-2 col-md-3 col-10 border border-success');
        }

    }
    this.cardButton.setAttribute('class','btn btn-warning container-fluid text-nowrap col-md-6 col-12');
    this.cardButton.textContent = 'Not Read';

    this.deleteButton = document.createElement('button');
    this.deleteButton.textContent = 'Delete';
    this.deleteButton.setAttribute('class', "btn btn-danger container-fluid text-nowrap col-md-3 col-4 m-2");

    this.deleteButton.onclick = () => {
        let index = 0;
        myLibrary.forEach(book => {
            if(book == this){
                myLibrary[index] = null;
            }
            index = index + 1;
        });
        refreshDOM();
    }

    this.card.appendChild(this.cardBody);
    this.cardBody.appendChild(this.cardTitle);
    this.cardBody.appendChild(this.cardAuthor);
    this.cardBody.appendChild(this.cardButton);
    this.cardBody.appendChild(this.deleteButton);
}


function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function refreshDOM(){
    removeAllChildNodes(Bookshelf);

    myLibrary.forEach(Book => {
        if (Book!=null) {
            Bookshelf.appendChild(Book.card);
        }
    });
    
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
