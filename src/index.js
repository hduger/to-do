import addProject, { cancel, render, createList, highlight, deleteProject, renderLists, addTask, createTask, taskHighlight, renderTasks, clearTasks } from  './project'

const deleteList = document.querySelector('[data-delete-btn]');
const clearCompletedTasksBtn = document.querySelector('[data-completed-tasks-btn]')

const listContainer = document.querySelector('[data-project-list]');
const taskContainer = document.querySelector('[data-tasks]')
const newTaskBtn = document.querySelector('[data-submit-task]');
const newTaskInput = document.querySelector('[data-task-input]')
const newTaskForm = document.querySelector('[data-task-form]')


newTaskForm.addEventListener('submit', e => {
    addTask(e);
})

listContainer.addEventListener('click', e => {
    highlight(e);
})

taskContainer.addEventListener('click', e => {
    taskHighlight(e);
})

deleteList.addEventListener('click', e =>{
    deleteProject(e);
})

clearCompletedTasksBtn.addEventListener('click', e => {
    clearTasks(e)
})


const projBtn = document.querySelector('.add');
projBtn.addEventListener('click', addProject)


const cancelBtn = document.querySelector('.cancel')
cancelBtn.addEventListener('click', cancel)
console.log("hunter is the best!!!")

render()

