let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){
  let name = document.getElementById("taskInput")?.value;
  let deadline = document.getElementById("deadlineInput")?.value;

  if(name && deadline){
    tasks.push({name, deadline, done:false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showToast("🚀 Misi ditambahkan!");
    renderTasks();
  }
}

function toggleDone(index){
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks(){
  let list = document.getElementById("taskList");
  if(!list) return;

  list.innerHTML="";

  tasks.forEach((t,index)=>{
    let li = document.createElement("li");

    li.innerHTML = `
      <strong style="${t.done ? 'text-decoration:line-through;' : ''}">
        ${t.name}
      </strong><br>
      Deadline: ${t.deadline}<br>
      <button onclick="toggleDone(${index})">
        ${t.done ? 'Batal' : 'Done'}
      </button>
    `;

    let today = new Date();
    let dl = new Date(t.deadline);
    let diff = (dl - today)/(1000*60*60*24);

    if(diff <= 2 && !t.done){
      li.classList.add("deadline-soon");
    }

    list.appendChild(li);
  });
}

function showToast(msg){
  let toast = document.getElementById("toast");
  if(!toast) return;
  toast.textContent = msg;
  toast.style.opacity = 1;
  setTimeout(()=>toast.style.opacity=0,2000);
}

function renderProgress(){
  let fill = document.getElementById("progressFill");
  let text = document.getElementById("progressText");
  if(!fill) return;

  let total = tasks.length;
  let done = tasks.filter(t=>t.done).length;

  let percent = total === 0 ? 0 : Math.round((done/total)*100);

  fill.style.width = percent + "%";
  text.innerText = percent + "% Misi Selesai 🌠";
}

renderTasks();
renderProgress();
