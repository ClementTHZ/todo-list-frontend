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
        li.textContent = `${task.title}`; 
        const deleteButton = document.createElement("button"); 
        deleteButton.textContent = "delete"; 
        deleteButton.addEventListener("click", () => {
            handleDelete(taskId)
        }); 
        li.appendChild(deleteButton); 
        taskList.appendChild(li); 
    })
  } 
  catch (error) 
  {
    console.log(error.message); 
}
}

function handleDelete(taskIndex) {
    console.log(`index: ${taskIndex}`)
}

getData(); 



