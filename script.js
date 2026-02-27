let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   TAMBAH TUGAS BARU
========================= */
function addTask(){
  let subject = document.getElementById("subjectInput").value;
  if(!subject){
    alert("Isi nama pelajaran dulu!");
    return;
  }

  tasks.push({
    subject,
    indicators: []
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("subjectInput").value="";
  renderTasks();
}

/* =========================
   TAMBAH INDIKATOR
========================= */
function addIndicator(taskIndex){
  let text = document.getElementById(`indicatorText-${taskIndex}`).value;
  let deadline = document.getElementById(`indicatorDeadline-${taskIndex}`).value;

  if(!text || !deadline){
    alert("Isi indikator dan deadline!");
    return;
  }

  tasks[taskIndex].indicators.push({
    text,
    deadline,
    done:false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* =========================
   TOGGLE SELESAI
========================= */
function toggleIndicator(taskIndex, indicatorIndex){
  tasks[taskIndex].indicators[indicatorIndex].done =
    !tasks[taskIndex].indicators[indicatorIndex].done;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

/* =========================
   CEK TUGAS SELESAI
========================= */
function isTaskDone(task){
  if(task.indicators.length === 0) return false;
  return task.indicators.every(ind => ind.done);
}

/* =========================
   RENDER SEMUA
========================= */
function renderTasks(){
  let list = document.getElementById("taskList");
  if(!list) return;

  list.innerHTML="";

  tasks.forEach((task, tIndex)=>{

    let card = document.createElement("div");
    card.className="card";

    let indicatorsHTML="";

    task.indicators.forEach((ind, iIndex)=>{

      checkDeadline(ind);

      indicatorsHTML += `
        <div class="indicator-item">
          <input type="checkbox"
            ${ind.done ? "checked" : ""}
            onclick="toggleIndicator(${tIndex},${iIndex})">

          <span style="${ind.done ? 'text-decoration:line-through;' : ''}">
            ${ind.text}
          </span>

          <small>📅 ${ind.deadline}</small>
        </div>
      `;
    });

    let status = isTaskDone(task)
      ? "✅ TUGAS SELESAI"
      : "⏳ BELUM SELESAI";

    card.innerHTML = `
      <h3>${task.subject}</h3>

      ${indicatorsHTML}

      <div class="add-indicator">
        <input type="text" id="indicatorText-${tIndex}"
          placeholder="Tambah indikator">

        <input type="date" id="indicatorDeadline-${tIndex}">

        <button onclick="addIndicator(${tIndex})">Tambah</button>
      </div>

      <p class="status">${status}</p>
    `;

    list.appendChild(card);
  });
}

/* =========================
   NOTIF DEADLINE H-1
========================= */
function checkDeadline(indicator){
  let today = new Date();
  let dl = new Date(indicator.deadline);

  let diff = Math.ceil((dl - today)/(1000*60*60*24));

  if(diff === 1 && !indicator.done){
    playNotification();
  }
}

/* =========================
   BUNYI
========================= */
function playNotification(){
  let audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play();
}

/* ========================= */
renderTasks();
