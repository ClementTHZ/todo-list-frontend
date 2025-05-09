const addButton = document.getElementById("add-button")
addButton.addEventListener("click", (event) =>{
  // event.preventDefault(); 
  const inputTitle = document.getElementById("input-title"); 
  const title = inputTitle.value;  
  createTask(title); 
})

async function getData() {
  const url = "http://localhost:5000/tasks"; 
  try 
  {
    const response = await fetch(url); 
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = await response.json();
    console.log(data)

    const taskList = document.getElementById("task-list"); 

    data.forEach(task => {
        const taskId = task.id; 

        const li = document.createElement("li"); 
        li.classList.add("list-unstyled")
        li.textContent = `${task.title} - `;

        
        const deleteTrash = document.createElement("i"); 
        deleteTrash.classList.add("fa-solid");
        deleteTrash.classList.add("fa-trash");
        deleteTrash.classList.add("text-red-500");
        deleteTrash.classList.add("hover:text-red-800");
        deleteTrash.addEventListener("click", () => {
            handleDelete("tasks", taskId)
        }); 
        const a = document.createElement("a"); 
        a.href = ""; 
        a.appendChild(deleteTrash)

        li.appendChild(a); 
        taskList.appendChild(li); 
    })
  } 
  catch (error) 
  {
    console.log(error.message); 
}
}

async function handleDelete(table, id) {
  const url = `http://localhost:5000/${table}/${id}` 
  try {
    const response = await fetch(url, {
      method: "DELETE"
    }); 
    console.log(response.status); 
    location.reload(); 
  } catch (error) {
    console.log(error.message); 
  }
}

async function createTask(title){
const newTask = {
  title: title
}
try {
  const response = await fetch("http://localhost:5000/tasks/new", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  })
  console.log("Task has been created !")
  console.log(response.status) 
} catch (error) {
  console.log(error.message)
}
}

getData(); 



