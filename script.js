const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input'); 
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length>0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo,todoIndex){
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";

    todoLI.innerHTML = `
       <input type="checkbox" id="${todoID}">
       <label class="custom-checkbox" for="${todoID}">
           <img src="icons/check.png" alt="check">
       </label>

       <label for="${todoID}" class="todo-text">
            ${todoText}
       </label>

       <button class="delete-button">
           <img src="icons/delete.png" alt="delete">
       </button>
    `
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosJson = JSON.stringify(allTodos); // convert todos to JSON bcz local storage format is string not array
    localStorage.setItem("todos", todosJson); // store todos in local storage
}

function getTodos(){
    const todos = localStorage.getItem("todos") || [];
    return JSON.parse(todos); // convert JSON to array
}

