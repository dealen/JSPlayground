document.addEventListener('DOMContentLoaded', () => {
  
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
  
    function createTask(taskContent) {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', function() {
        listItem.style.textDecoration = this.checked ? 'line-through' : 'none';
      });
      
      const textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.value = taskContent;
      textInput.className = 'editable';
      
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        listItem.remove();
      });
  
      listItem.appendChild(checkbox);
      listItem.appendChild(textInput);
      listItem.appendChild(removeButton);
  
      taskList.appendChild(listItem);
    }
  
    addButton.addEventListener('click', () => {
      if(taskInput.value.trim() !== '') {
        createTask(taskInput.value);
        taskInput.value = '';
      }
    });
  
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addButton.click();
      }
    });
  
    module.exports = { createTask };
  });