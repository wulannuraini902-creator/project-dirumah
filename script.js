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
// Calendar View
function renderCalendar(){
  let cal = document.getElementById("calendarList");
  if(!cal) return;

  cal.innerHTML="";

  if(tasks.length === 0){
    cal.innerHTML="<p>Tidak ada deadline.</p>";
    return;
  }

  tasks.sort((a,b)=> new Date(a.deadline) - new Date(b.deadline));

  tasks.forEach(t=>{
    let div = document.createElement("div");
    div.className="card";
    div.innerHTML = `
      <strong>${t.name}</strong><br>
      Deadline: ${t.deadline}
    `;
    cal.appendChild(div);
  });
}

renderCalendar();


// Focus Timer
let time = 1500;
let interval;

function startTimer(){
  if(interval) return;

  interval = setInterval(()=>{
    time--;
    let minutes = Math.floor(time/60);
    let seconds = time%60;

    document.getElementById("timer").innerText =
      `${minutes}:${seconds<10?'0':''}${seconds}`;

    if(time<=0){
      clearInterval(interval);
      interval=null;
      alert("🎉 Fokus Selesai!");
    }
  },1000);
}

function resetTimer(){
  clearInterval(interval);
  interval=null;
  time=1500;
  document.getElementById("timer").innerText="25:00";
}
