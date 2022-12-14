
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let projectList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
const listContainer = document.querySelector('[data-project-list]');
const taskContainer = document.querySelector('[data-task-list-container]');
const taskInd = document.querySelector('[data-tasks]');
const taskCount = document.querySelector('[data-task-count]');
const listTitle = document.querySelector('[data-list-title]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-task-form]')
const submitTask = document.querySelector('[data-submit-task]')
const clearCompletedTasksBtn = document.querySelector('[data-completed-tasks-btn]')

export function highlight(e){
    if(e.target.tagName.toLowerCase()=== 'li'){
        selectedListId= e.target.dataset.listId;
        renderAndSave();
    }
}

export function taskHighlight(e){
    if(e.target.tagName.toLowerCase() === 'input'){
        const selectedList = projectList.find(list => list.id===selectedListId)
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedList)
    }
}


export default function addProject(){
    // const addProjItem = document.querySelector('.add-project');
    const inputText = document.querySelector('.project-popup-input');
    const inputVal = inputText.value;
    if(inputVal == null || inputVal === "") return

    const list = createList(inputVal)
    inputText.value = null;
    projectList.push(list);
    renderAndSave();

    console.log('click')

}

export function addTask(e){
    e.preventDefault()
    const newTaskInput = document.querySelector('[data-task-input]')
    const taskName = newTaskInput.value;
    if(taskName == null || taskName === "") return
    const task = createTask(taskName)
    newTaskInput.value = null

    const selectedList = projectList.find(list => list.id === selectedListId)

    selectedList.tasks.push(task);
    renderAndSave();

    console.log('click')
}




export function createList(name){
    return {id: Date.now().toString(), name: name, tasks: [] }
}

export function createTask(name){
    return {id: Date.now().toString(), name: name, complete: false }
}

export function cancel(){
    const textToClear = document.querySelector('.project-popup-input');
    textToClear.value = "";
    console.log('cancel')

}

export function renderAndSave(){
    save();
    render();
}

export function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projectList))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

export function render(){
    clearList(listContainer)
    renderLists()
    const selectedList = projectList.find(list => list.id === selectedListId)
    if (selectedListId == null){
        taskContainer.style.display = 'none'
    } else{
        taskContainer.style.display = ''
        listTitle.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearList(taskInd);
        renderTasks(selectedList)
    }
    
}

export function renderTasks(selectedList){
    selectedList.tasks.forEach(task => {
        const taskEl = document.importNode(taskTemplate.content, true)
        const checkbox = taskEl.querySelector('input')
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskEl.querySelector('label')
        label.htmlFor = task.id;
        label.append(task.name);
        taskInd.appendChild(taskEl);
    })
}

export function renderTaskCount(selectedList) {
    const incompleteTasks = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasks === 1 ? "task" : "tasks";
    taskCount.innerText = `${incompleteTasks} ${taskString} remaining`
}

export function renderLists(){
    projectList.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('project-name');
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add("active-list");
        }
        listContainer.appendChild(listElement);
    })
}

export function clearList(element){
    while (element.firstChild){
        element.removeChild(element.firstChild)
    }
}

export function deleteProject(){
    projectList = projectList.filter(list => list.id !== selectedListId)
    selectedListId = null;
    renderAndSave();
}

export function clearTasks(){
    const selectedList = projectList.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    renderAndSave()
}
