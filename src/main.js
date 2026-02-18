const myLibrary = [];
//get author element
const author_elem = document.querySelector(".book-author");
//get title element
const title_elem = document.querySelector(".book-title");
//get page count element
const page_count_elem = document.querySelector(".book-page-count");
//get read status element
const read_status_elem = document.querySelector(".book-read-status");
//get prev button
const prev_button_elem = document.querySelector(".book-button-prev");
//get next button
const next_button_elem = document.querySelector(".book-button-next");
//get add button
const add_button_elem = document.querySelector(".book-add");
//get ok submit button
const modal_submit_elem = document.querySelector(".book-modal-submit");
// get cancel submit button
const modal_cancel_elem = document.querySelector(".book-modal-cancel")
//get modal
const modal_elem = document.querySelector(".book-modal");
//get dialog form inputs
const modal_input_elems = document.querySelectorAll("input");
//get dialog form checkbox
const modal_input_checkbox_elem = document.querySelector("input[type='checkbox']");
//get dialog form
const form_elem = document.querySelector("form");
//get delete button
const del_button_elem= document.querySelector(".book-delete");
//get read status button
const read_status_button = document.querySelector(".read-status-button");

//refrence to index of current book
let book_index = 0;

function modifyInputErrorMsg(){
    const authorInput = document.querySelector("input[name='author']");
    const titleInput = document.querySelector("input[name='title']");
    const pageNumInput = document.querySelector("input[name='page_count']")

    if(authorInput.validity.valueMissing){
        authorInput.setCustomValidity("Please enter a name")
    }else{
        authorInput.setCustomValidity("")
    }

    if(titleInput.validity.valueMissing){
        titleInput.setCustomValidity("Please enter a book title") 
    }else{
        titleInput.setCustomValidity("")
    }

    if(pageNumInput.validity.valueMissing  ){
        pageNumInput.setCustomValidity("Can you enter a number?")
    }else{
        pageNumInput.setCustomValidity("")
    }
}

modal_submit_elem.addEventListener("click", function(){
    modifyInputErrorMsg();
})

function Book(BookAuthor, BookTitle, BookPageCount, BookReadStatus) {
    this.author = BookAuthor;
    this.title = BookTitle;
    //TO DO : make sure to run verification at some point to verify they are a number and a boolean
    this.pageCount = BookPageCount; 
    this.readStatus = BookReadStatus;
    this.toggleRead = function(){
        if (this.readStatus == true){
            this.readStatus = false;
        }else if (this.readStatus == false){
            this.readStatus = true;
        };
    }
};

function addToLibrary(BookAuthor, BookTitle, BookPageCount, BookReadStatus) {
    let newBook = new Book(BookAuthor, BookTitle, BookPageCount, BookReadStatus);
    myLibrary.push(newBook);
};

function changeBookInfo(book){

    //displays the current book in their respected elements
    author_elem.textContent = book.author;
    author_elem.dataset.index = myLibrary.indexOf(book)
    title_elem.textContent = book.title;
    page_count_elem.textContent = book.pageCount;
    read_status_button.textContent = book.readStatus;
    if (book.readStatus == false){
        read_status_button.classList.remove("book-read-status-default")
        read_status_button.classList.remove("book-read-status-true")
        read_status_button.classList.add("book-read-status-false")
    }
    if (book.readStatus == true){
        read_status_button.classList.remove("book-read-status-false")
        read_status_button.classList.add("book-read-status-true")
    }
};

function displayBook(element){
    //determines what button was pressed
    let button = element.srcElement.innerText;
    let prev_book = myLibrary[Number(author_elem.dataset.index) -1];
    let next_book = myLibrary[Number(author_elem.dataset.index) + 1];
    
    if (button == "PREV" && prev_book != undefined){
        changeBookInfo(prev_book)
    }
    if (button == "NEXT" && next_book != undefined){
        changeBookInfo(next_book)
    }

}

function clearDialogInputs(){
    if (modal_elem.hasAttribute("open") == false){
        for (let i = 0; i < Array.from(modal_input_elems).length; i++){
            modal_input_elems[i].value = ""
        }
        modal_input_checkbox_elem.checked = false
    }
};


    prev_button_elem.addEventListener("click", function(e){displayBook(e)});
    next_button_elem.addEventListener("click", function(e){displayBook(e)});

    add_button_elem.addEventListener("click", function(){
        modal_elem.showModal();
    })
    del_button_elem.addEventListener("click", ()=> {

        if (Number(author_elem.dataset.index) == 0 && myLibrary.length > 1){
            myLibrary.splice(0,1)
            changeBookInfo(myLibrary[0])
            
            console.log("next")
        }else if (Number(author_elem.dataset.index) == 0 && myLibrary.length == 1){
            myLibrary.splice(author_elem.dataset.index,1)
            author_elem.textContent = ""
            author_elem.dataset.index = ""
            title_elem.textContent = ""
            page_count_elem.textContent = ""
            read_status_elem.textContent = ""
            console.log("clear")
        }else{
            myLibrary.splice(author_elem.dataset.index,1)
            changeBookInfo(myLibrary[Number(author_elem.dataset.index) - 1])
            console.log("prev")
        }
        console.log(author_elem.dataset.index)
    })

    modal_cancel_elem.addEventListener("click", function(){
        modal_elem.close();
        clearDialogInputs();
    })
    
    form_elem.addEventListener("submit",(e)=>{
    e.preventDefault();
    let newBookParams = [];

    for (let i = 0; i < Array.from(modal_input_elems).length - 1; i++){
        newBookParams.push(modal_input_elems[i].value)
    }
    newBookParams.push(modal_input_checkbox_elem.checked);

    let newBook = new Book(newBookParams[0],newBookParams[1],newBookParams[2],newBookParams[3]);
    myLibrary.push(newBook)
    changeBookInfo(myLibrary[myLibrary.length - 1])

    modal_elem.close();
    clearDialogInputs();
    })

    read_status_button.addEventListener("click", function(e){
        current_book = myLibrary[Number(author_elem.dataset.index)]
        current_book.toggleRead()
        changeBookInfo(current_book)


    })

//tests