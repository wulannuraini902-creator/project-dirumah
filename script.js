let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
  let name = document.getElementById("taskInput").value;
  let deadline = document.getElementById("deadlineInput").value;

  if(name && deadline){
    tasks.push({name, deadline});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast("🚀 Misi ditambahkan!");
    renderTasks();
  }
}

function renderTasks(){
  let list = document.getElementById("taskList");
  list.innerHTML="";

  tasks.forEach(t=>{
    let li = document.createElement("li");
    li.innerHTML = `<strong>${t.name}</strong><br>Deadline: ${t.deadline}`;

    let today = new Date();
    let dl = new Date(t.deadline);
    let diff = (dl - today)/(1000*60*60*24);

    if(diff <= 2){
      li.classList.add("deadline-soon");
    }

    list.appendChild(li);
  });
}

function showToast(msg){
  let toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.opacity = 1;
  setTimeout(()=>toast.style.opacity=0,2000);
}

renderTasks();
