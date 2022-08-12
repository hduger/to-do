export default function addProject(){
    const addProjItem = document.querySelector('.add-project');


    
    addProjItem.addEventListener('click', ()=>{
    const form = document.createElement('input');
    form.innerText='hello world'
    document.body.appendChild(form);
})
}