const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;

const { createTask } = require('./todo');

describe('Todo App', () => {

  // Mock the DOM for testing
  // document.body.innerHTML = `
  //   <div id="todo-app">
  //     <input type="text" id="new-task" placeholder="What needs to be done?">
  //     <button id="add-task">Add Task</button>
  //     <ul id="task-list"></ul>
  //   </div>
  // `;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="todo-app">
        <input type="text" id="new-task" placeholder="What needs to be done?">
        <button id="add-task">Add Task</button>
        <ul id="task-list"></ul>
      </div>
    `;
  
    // Re-require/re-initialize your app here if necessary to reset the state
    // delete require.cache[require.resolve('./app')];
    // const app = require('./app');
  });
  
  // Require the app after the DOM is mocked
  const app = require('./todo'); // This path may vary

  it('should add a new task', () => {
    // Set up your test here
    // For example, type a new task into the input and simulate a button click

    const taskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-task');

    taskInput.value = 'New Task';
    addButton.click(); // You'll need to trigger this programmatically in app.js for this test to work

    // Assert that the task was added to the DOM
    const taskList = document.getElementById('task-list');
    expect(taskList.children.length).toBe(1);
    expect(taskList.firstChild.querySelector('input[type="text"]').value).toBe('New Task');
  });

  it('should remove a task', () => {
    // Add a task, then remove it, and test whether it has been removed.
    const addButton = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');

    // Add a task
    taskInput.value = 'Task to remove';
    addButton.click();

    // Now remove it
    const removeButton = document.querySelector('button'); // This should be more specific in your app
    removeButton.click();

    // Assert that the task was removed from the DOM
    const taskList = document.getElementById('task-list');
    expect(taskList.children.length).toBe(0);
  });

  // Add more tests as needed for other functionality

});