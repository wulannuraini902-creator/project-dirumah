let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   TAMBAH TUGAS
========================= */
function addTask(){
  let name = document.getElementById("taskInput")?.value;
  let deadline = document.getElementById("deadlineInput")?.value;

  if(name && deadline){
    tasks.push({name, deadline, done:false});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("taskInput").value="";
    document.getElementById("deadlineInput").value="";

    showToast("🚀 Misi ditambahkan!");
    renderTasks();
    renderProgress();
    renderCalendar();
  }
}

/* =========================
   SELESAIKAN TUGAS
========================= */
function toggleDone(index){
  tasks[index].done = true;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showToast("✨ Misi selesai!");
  renderTasks();
  renderProgress();
  renderCalendar();
}

/* =========================
   TAMPILKAN TUGAS
========================= */
function renderTasks(){
  let list = document.getElementById("taskList");
  if(!list) return;

  list.innerHTML="";

  tasks.forEach((t,index)=>{

    // HANYA tampilkan yang BELUM selesai
    if(!t.done){

      let li = document.createElement("li");
      li.className="task-item";

      li.innerHTML = `
        <div>
          <strong>${t.name}</strong><br>
          <small>Deadline: ${t.deadline}</small>
        </div>
        <button onclick="toggleDone(${index})">
          ✅ Done
        </button>
      `;

      let today = new Date();
      let dl = new Date(t.deadline);
      let diff = (dl - today)/(1000*60*60*24);

      if(diff <= 2){
        li.classList.add("deadline-soon");
      }

      list.appendChild(li);
    }

  });
}

/* =========================
   TOAST NOTIFIKASI
========================= */
function showToast(msg){
  let toast = document.getElementById("toast");
  if(!toast) return;

  toast.textContent = msg;
  toast.style.opacity = 1;

  setTimeout(()=>{
    toast.style.opacity=0;
  },2000);
}

/* =========================
   PROGRESS PAGE
========================= */
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

/* =========================
   CALENDAR PAGE
========================= */
function renderCalendar(){
  let cal = document.getElementById("calendarList");
  if(!cal) return;

  cal.innerHTML="";

  if(tasks.length === 0){
    cal.innerHTML="<p>Tidak ada deadline.</p>";
    return;
  }

  let sorted = [...tasks].sort((a,b)=>
    new Date(a.deadline) - new Date(b.deadline)
  );

  sorted.forEach(t=>{
    let div = document.createElement("div");
    div.className="card";

    div.innerHTML = `
      <strong>${t.name}</strong><br>
      Deadline: ${t.deadline}<br>
      Status: ${t.done ? "Selesai ✅" : "Belum"}
    `;

    cal.appendChild(div);
  });
}

/* =========================
   FOCUS TIMER
========================= */
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

/* =========================
   LOAD AWAL
========================= */
renderTasks();
renderProgress();
renderCalendar();
