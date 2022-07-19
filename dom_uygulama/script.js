//1)todo eleman ekleme

//eleman seçimi

const form=document.querySelector("form");
const input=document.querySelector("#txtTaskName");
const btnAddNewTask=document.querySelector("#btnAddNewTask");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");
let todos;


//Diziden todo elemanlarını aktarma
//const items=["Todo 1","Todo 2","Todo 3","Todo 4"];

//load items
loadItems();





eventListeners();

function eventListeners(){
    //submit
    form.addEventListener("submit",addNewItem);

    //delete
    taskList.addEventListener("click",deleteItem);

    //all delete
    btnDeleteAll.addEventListener("click",deleteAllItems);



}

//load Items fonk.
function loadItems(){
    todos=getItemsFromLs();
    todos.forEach(function(item){
        createItem(item);
    })
}

//get items from local storage
function getItemsFromLs(){
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    return todos;

}

// set item to local Storage
function setItemToLS(newTodo){
todos=getItemsFromLs();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));
}


function createItem(newTodo){
//eger dolu bir şey gonderilirse
    // li olusturma
    const li=document.createElement("li");
    li.className="list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a olusturma
    const a=document.createElement("a");
    a.classList="delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML='<i class="fas fa-times"></i>';
    li.appendChild(a);

    taskList.appendChild(li);
}


function addNewItem(e){
    //eger boş bir şey gonderırılırse
    if(input.value===''){
        alert("add new item");
        //console.log("submit");
    }
    //create ıtem
    createItem(input.value);

    setItemToLS(input.value);

    

    
    input.value="";

    e.preventDefault();
} 


//Eleman Silme
function deleteItem(e){
  
       if(e.target.className==="fas fa-times"){
        if(confirm("Silmek istediğinize emin misiniz?")){
           e.target.parentElement.parentElement.remove();
           deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
       }
   }   
   e.preventDefault();
}

function deleteTodoFromStorage(deletetodo){
let todos=getItemsFromLs();
todos.forEach(function(todo,index){
if(todo===deletetodo){
    todos.splice(index,1);
}
});
localStorage.setItem("todos",JSON.stringify(todos));

}


// Tüm Elemanları Silme
function deleteAllItems(e){
    if(confirm("Silmek istediğinize emin misiniz?")){
     while(taskList.firstChild){
         taskList.removeChild(taskList.firstChild);
     }
     localStorage.clear();
    }
}

