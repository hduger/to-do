import addProject, { cancel, render, createList, highlight, deleteProject, renderLists } from  './project'

const deleteList = document.querySelector('[data-delete-btn]');

const listContainer = document.querySelector('[data-project-list]');

listContainer.addEventListener('click', e => {
    highlight(e);
})

deleteList.addEventListener('click', e =>{
    deleteProject(e);
})


const projBtn = document.querySelector('.add');
projBtn.addEventListener('click', addProject)


const cancelBtn = document.querySelector('.cancel')
cancelBtn.addEventListener('click', cancel)
console.log("hunter is the best!!!")

render()

