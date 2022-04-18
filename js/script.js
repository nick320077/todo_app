const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    todoData.forEach(function(item, i) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
      '<div class="todo-buttons">' +
	  '<button class="todo-remove"></button>' +
	  '<button class="todo-complete"></button>' +
	  '</div>';
     
      if(item.completed) {
         todoCompleted.append(li);
      } else {
          todoList.append(li);
      }
      
      li.querySelector('.todo-complete').addEventListener('click', function() {
           item.completed = !item.completed;
           localStorage.setItem('todo', JSON.stringify(todoData));
           render();
      });

      li.querySelector('.todo-remove').addEventListener('click', function(){
        todoData.splice(i, 1);
        localStorage.setItem('todo', JSON.stringify(todoData));
           render();
       });
      
    });
   
  
  };

if(localStorage.getItem('todo')) {
  todoData = JSON.parse(localStorage.getItem('todo'));
  render();
}

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if(!headerInput.value) return;
  const newTodo = {
        text: headerInput.value,
        completed: false,
    };
   
    todoData.push(newTodo);
    headerInput.value = '';
    localStorage.setItem('todo', JSON.stringify(todoData));

    render();

});



