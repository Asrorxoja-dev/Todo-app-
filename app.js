const modeElement = document.querySelector('.mode-btn');
const bodyElement = document.body;
const formElement = document.querySelector('form')
const ulElement = document.querySelector('.todos-list')
const textElement = document.querySelector('.textInput')
const clearElement = document.querySelector('.clear')
const itemsElement = document.querySelector('.items')
const btnElements = document.querySelectorAll('.btn')


// dark Mode
let isDark = localStorage.getItem('mode') === 'dark';

updateUI();

function updateUI() {
    if (isDark) {
        bodyElement.classList.add('dark-mode');
        modeElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" fill="#ffffff"></path></svg>';
    } else {
        bodyElement.classList.remove('dark-mode');
        modeElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z" fill="#ffffff"></path></svg>';
    }
}

modeElement.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('mode', isDark ? 'dark' : 'light');
    updateUI();
});


// ---------------------------------------------------------

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
let editTodo = null

// handle Submit
let id = 0;
formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    text = textElement.value;
    id = id + 1
    if (editTodo) {
        editTodo.text = textElement.value
        textElement.nextElementSibling.textContent = "Add"
        editTodo = null
    } else {
        todos.push({
            id: id,
            text: text,
            complated: false
        })
    }
    textElement.value = ""
    renderTodos()
    localStorage.setItem('todos', JSON.stringify(todos))
})






// Render Todos to Html
function renderTodos() {
    let html = ""
    if (todos.length) {
        todos.forEach(todo => {
            html += `<li onclick="complateTodo(${todo.id})" class="list-item ${todo.complated ? 'complated' : ""}">
            ${todo.complated ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_267)"/>
            <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" stroke-width="2"/>
            <defs>
            <linearGradient id="paint0_linear_0_267" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
            <stop stop-color="#55DDFF"/>
            <stop offset="1" stop-color="#C058F3"/>
            </linearGradient>
            </defs>
            </svg>
            ` : `<svg width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" xmlns = "http://www.w3.org/2000/svg" > <circle cx="12" cy="12" r="11.5" stroke="#E3E4F1" /><g opacity="0.01"> <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_606)" /><path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" /></g> <defs> <linearGradient id="paint0_linear_0_606" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse" ><stop stop-color="#55DDFF" /> <stop offset="1" stop-color="#C058F3" /> </linearGradient> </defs></svg>`}
             
            

            ${todo.text}
            <button onclick="event.stopPropagation(); editTodoClick(${todo.id})" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(21,17,40,1)"> <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z" ></path>
              </svg>
            </button>
            <button onclick="deleteTodo(${todo.id})" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"> <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" ></path>
              </svg>
            </button>
          </li > `
        })
    } else {
        ulElement.innerHTML = ""
    }
    ulElement.innerHTML = html;
    const items = todos.filter(todo => todo.complated !== true)
    itemsElement.textContent = `${items.length} items left`
}

renderTodos()

// Delete Todos
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Edit Todo 
function editTodoClick(id) {
    const todo = todos.find(todo => todo.id === id)
    textElement.value = todo.text
    editTodo = todo
    textElement.nextElementSibling.textContent = "Edit"
    localStorage.setItem('todos', JSON.stringify(todos))
}


// Complate Todo
function complateTodo(id) {
    const todo = todos.find(todo => todo.id === id)
    todo.complated = !todo.complated
    renderTodos()
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Clear Complated 
clearElement.addEventListener('click', () => {
    todos = todos.filter(todo => todo.complated !== true)
    renderTodos()
    localStorage.setItem('todos', JSON.stringify(todos))
})


// btnElements.forEach(btn => {
//     btn.addEventListener('click', () => {
//         btnElements.forEach(newBtn => {
//             if (newBtn == btn) {
//                 newBtn.classList.add('active-color')
//             } else {
//                 newBtn.classList.remove('active-color')
//             }
//         })

//         let compyTodos = todos

//         if (btn.textContent == 'Active') {
//             console.log('active work')
//             todos = todos.filter(todo => todo.complated == false)
//             renderTodos()
//             console.log(compyTodos);
//         }
//         else if (btn.textContent == 'Completed') {
//             console.log('complated work')
//             todos = todos.filter(todo => todo.complated !== false)
//             console.log(compyTodos);
//             renderTodos()
//         }
//         else {
//             todos = todos.filter(todo => todo.complated !== false || todo.complated === false)
//             console.log(compyTodos);
//             renderTodos()
//         }
//     })
// })