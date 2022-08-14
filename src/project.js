
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let projectList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
const listContainer = document.querySelector('[data-project-list]');
const deleteList = document.querySelector('[data-delete-btn]');


export function highlight(e){
    if(e.target.tagName.toLowerCase()=== 'li'){
        selectedListId= e.target.dataset.listId;
        renderAndSave();
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

export function createList(name){
    return {id: Date.now().toString(), name: name, tasks: [] }
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
